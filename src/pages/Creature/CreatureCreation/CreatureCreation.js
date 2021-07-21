import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { compose } from "redux";
import { addNpcs, addMonsters } from "shared/actions/index";
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import creature_template from 'assets/json/creature_template.json';

import {
    NpcFlavor,
    MonsterFlavor,
    Race,
    Core,
    Defense,
    Abilities,
    Challenge
} from './components'

import MuiAlert from '@material-ui/lab/Alert';
import { toast } from 'react-toastify';
import Api from 'helpers/api';

const useStyles = (theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: "60%",
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: "6rem",
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
});

const steps = ['Detalles', 'Raza', 'Estadísticas', 'Defensa', 'Habilidades', 'Desafío'];

function getStepContent(step, changeName, setPronoun, addToCreatureFlavor, addToCreatureStats, defaultCreature, pronoun, type) {
    const Flavor = type === "npc" ? NpcFlavor : MonsterFlavor;

    switch (step) {
        case 0:
            return <Flavor
                changeName={changeName}
                addToCreatureFlavor={addToCreatureFlavor}
                addToCreatureStats={addToCreatureStats}
                creature={defaultCreature}
                setPronoun={setPronoun}
                pronoun={pronoun} />;
        case 1:
            return <Race
                addToCreatureStats={addToCreatureStats}
                creature={defaultCreature}
                pronoun={pronoun}
                type={type} />;
        case 2:
            return <Core
                addToCreatureStats={addToCreatureStats}
                creature={defaultCreature} />;
        case 3:
            return <Defense
                addToCreatureStats={addToCreatureStats}
                creature={defaultCreature} />;
        case 4:
            return <Abilities
                addToCreatureStats={addToCreatureStats}
                creature={defaultCreature}
                pronoun={pronoun} />;
        case 5:
            return <Challenge
                addToCreatureStats={addToCreatureStats}
                creature={defaultCreature}
                pronoun={pronoun} />
        default:
            throw new Error('Unknown step');
    }
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const mapDispatchToProps = dispatch => {
    return {
        addNpcs: npcs => dispatch(addNpcs(npcs)),
        addMonsters: monsters => dispatch(addMonsters(monsters))
    };
}

const mapStateToProps = state => {
    return {
        npcs: state.npcs,
        monsters: state.monsters,
        profile: state.profile
    }
}

class CreatureCreation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeStep: 0,
            disabled: true,
            open: false,
            snack: 'success',
            defaultCreature: {
                ...creature_template,                
                createdBy: this.props.profile?._id 
            }
        }
        console.log("CREATURE CREATION");
    }

    componentDidMount() {
        const type = this.props.match.url.includes("npc") ? "npc" : "bestiary"
        if (this.props.match.params && this.props.match.params.id) {            
            this.setState({ type })

            Api.fetchInternal(`/${type}/${this.props.match.params.id}`)
                .then(res => {
                    this.setState({
                        defaultCreature: res,
                        loaded: true
                    })
                }, () => console.log(this.state.type));
        } else {
            this.setState({ loaded: true, type }, () => console.log(this.state.type));
        }
    }

    handleNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1
        })
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1
        })
    };

    handleClick = (type) => {
        this.setState({
            open: true,
            snack: type
        })
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            open: false
        })
    };

    addToCreatureStats = (value, key) => {
        let newCreature = Object.assign({}, this.state.defaultCreature)
        newCreature.stats[key] = value;
        this.setState({
            defaultCreature: newCreature
        })
    }

    addToCreatureFlavor = (value, key) => {
        let newCreature = Object.assign({}, this.state.defaultCreature);
        newCreature.flavor[key] = value;
        this.setState({
            defaultCreature: newCreature
        })
    }

    changeName = (value) => {
        let newCreature = this.state.defaultCreature;
        newCreature["name"] = value;
        this.setState({
            defaultCreature: newCreature
        })
    }

    setPronoun = value => {
        this.setState({
            pronoun: value
        })
    }

    saveMonster() {
        Api.fetchInternal(`/${this.state.type}`, {
            method: this.props.match.params.id ? "PUT" : "POST",
            body: JSON.stringify(this.state.defaultCreature)
        })
            .then(() => {
                this.notify("success", "El npc ha sido añadido a la lista.")
                Api.fetchInternal(`/${this.state.type}`)
                    .then(res => {
                        const creatures = res.sort((a, b) => (a.stats.challengeRating > b.stats.challengeRating) ? 1 : -1);

                        if (this.state.type === "npc") {
                            this.props.addNpcs(creatures);
                        } else if (this.state.type === "bestiary") {
                            this.props.addMonsters(creatures);
                        }

                        this.props.history.goBack();
                    });
            })
            .catch(() => {
                this.notify("error", "El npc no ha podido ser añadido.");
                this.props.history.goBack();
            })
    }

    disabled() {
        let disabled = false;
        const creature = this.state.defaultCreature;
        switch (this.state.activeStep) {
            case 0:
                if ((!creature.name || !creature.name.length > 0) ||
                    (!creature.flavor.description || !creature.flavor.description.length > 0) ||
                    (!creature.flavor.pronoun) ||
                    (!creature.flavor.campaign || !creature.flavor.campaign.length > 0)) {
                    disabled = true;
                }
                break;
            case 1:
                if ((!creature.stats.race || !creature.stats.race > 0) ||
                    (!creature.stats.size || !creature.stats.size > 0) ||
                    (!creature.stats.speed || !creature.stats.speed > 0)) {
                    disabled = true;
                }
                break;
            case 2:
                if ((!creature.stats.abilityScores.strength || !creature.stats.abilityScores.strength > 0) ||
                    (!creature.stats.abilityScores.dexterity || !creature.stats.abilityScores.dexterity > 0) ||
                    (!creature.stats.abilityScores.constitution || !creature.stats.abilityScores.constitution > 0) ||
                    (!creature.stats.abilityScores.intelligence || !creature.stats.abilityScores.intelligence > 0) ||
                    (!creature.stats.abilityScores.wisdom || !creature.stats.abilityScores.wisdom > 0) ||
                    (!creature.stats.abilityScores.charisma || !creature.stats.abilityScores.charisma > 0)) {
                    disabled = true;
                }
                break;
            case 3:
                if ((!creature.stats.numHitDie || creature.stats.numHitDie === '') ||
                    (!creature.stats.hitDieSize || creature.stats.hitDieSize === '') ||
                    (!creature.stats.armorClass || creature.stats.armorClass === '')) {
                    disabled = true
                }
                break;
            case 5:
                if ((!creature.stats.challengeRating || creature.stats.challengeRating === '') ||
                    (!creature.stats.experiencePoints || creature.stats.experiencePoints === '')) {
                    disabled = true
                }
                break;
            default:
                if ((!creature.stats.challengeRating || creature.stats.challengeRating === '') ||
                    (!creature.stats.experiencePoints || creature.stats.experiencePoints === '')) {
                    disabled = true
                }
                break;
        }

        return disabled;
    }

    notify = (type, msg) => {
        switch (type) {
            case "success":
                toast.success(msg);
                break;
            default:
                toast.error(msg);
                break;
        }
    }

    render() {
        const { classes } = this.props;
        console.log(classes);
        return (
            <main className={classes.layout}>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.open}
                    onClose={this.handleClose}
                    autoHideDuration={6000}
                >
                    <Alert onClose={this.handleClose} severity={this.state.snack}>
                        {this.state.snack === 'success' ? 'Se ha añadido tu criatura al listado' : 'No se ha podido añadir tu criatura al listado'}
                    </Alert>
                </Snackbar>
                <Paper variant="outlined" className={classes.paper}>
                    <Stepper activeStep={this.state.activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <>
                        {this.state.activeStep === steps.length ? (
                            <>
                                <Typography variant="h5" gutterBottom>
                                    Criatura finalizada.
                                </Typography>
                                <Typography variant="subtitle1">
                                    La criatura '{this.state.defaultCreature.name}' ha sido generada correctamente. Por favor, guarda los datos.
                                </Typography>
                            </>
                        ) : (
                                <>
                                    {this.state.loaded && getStepContent(
                                        this.state.activeStep,
                                        this.changeName.bind(this),
                                        this.setPronoun.bind(this),
                                        this.addToCreatureFlavor.bind(this),
                                        this.addToCreatureStats.bind(this),
                                        this.state.defaultCreature,
                                        this.state.defaultCreature.flavor.pronoun,
                                        this.state.type)}
                                    <div className={classes.buttons}>
                                        {this.state.activeStep !== 0 && (
                                            <Button onClick={this.handleBack} className={classes.button}>
                                                Atrás
                                            </Button>
                                        )}
                                        <Button
                                            variant="outlined"
                                            color="default"
                                            disabled={this.disabled()}
                                            onClick={this.state.activeStep === steps.length - 1 ? this.saveMonster.bind(this) : this.handleNext}
                                            className={classes.button}
                                        >
                                            {this.state.activeStep === steps.length - 1 ? 'Guarda' : 'Siguiente'}
                                        </Button>
                                    </div>
                                </>
                            )}
                    </>
                </Paper>
            </main>
        )
    }
}

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps, mapDispatchToProps)
)(CreatureCreation)