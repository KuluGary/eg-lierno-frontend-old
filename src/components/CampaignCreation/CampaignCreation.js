import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import { addCampaigns } from "../../shared/actions/index";
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import Api from '../../helpers/api';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    profileBox: {
        margin: "0 auto",
        padding: "2rem"
    },
    paper: {
        width: "60%",
        margin: "0 auto",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    formControl: {
        // margin: theme.spacing(1),
        minWidth: "100%",
    },
}));

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        fontSize: theme.typography.pxToRem(14)
    }
}))(Tooltip)

const mapStateToProps = state => {
    return {
        profile: state.profile,
        campaigns: state.campaigns
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCampaigns: campaigns => dispatch(addCampaigns(campaigns))
    };
}

function CampaignCreation(props) {
    const classes = useStyles();
    const [campaignData, setCampaignData] = useState({
        name: null,
        game: "D&D 5e",
        mode: "classic",
        discordData: {
            main: null
        },
        rules: [],
        players: [],
        characters: [],
        dm: props.profile && props.profile._id,
        completed: false,
        diary: []
    });
    const [players, setPlayers] = useState([])
    const [characters, setCharacters] = useState([])
    const [rules, setRules] = useState([])
    const [submitDisabled, setSubmitDisabled] = useState(true)

    useEffect(() => {
        Api.fetchInternal("/auth/users")
            .then(res => setPlayers(res))

        Api.fetchInternal("/optionalrules")
            .then(res => setRules(res))
    }, [])

    useEffect(() => {
        if (players.length > 0) {
            const userIds = campaignData.players.map((player) => player._id)
            Api.fetchInternal("/usercharacter", {
                method: "POST",
                body: JSON.stringify({
                    userIds: userIds
                })
            })
                .then(res => {
                    setCharacters(res)
                    // setCharacters(res.map(item => item.name))
                })
        }
    }, [campaignData.players, players.length])


    useEffect(() => {
        if (props.profile) {
            setData("dm", props.profile._id)
        }
    }, [props.profile])

    useEffect(() => {
        if (!checkDisable()) {
            setSubmitDisabled(false)
        }
    }, [campaignData])

    const notify = (type, msg) => {
        switch (type) {
            case "success":
                toast.success(msg);
                break;
            default:
                toast.error(msg);
                break;
        }
    }

    const setData = (key, value) => {
        let data = { ...campaignData };

        data[key] = value;

        setCampaignData(data);
    }

    const handleRuleChange = (rule) => {
        let data = [...campaignData.rules];

        if (data.includes(rule)) {
            data = data.filter(item => item !== rule);
        } else {
            data.push(rule)
        }

        setData("rules", data);
    }

    const getTreeOption = (rule, index) => {
        const hasChildren = "children" in rule;
        let indeterminate = false
        let checked;

        if (hasChildren) {
            let children = rule.children.map(item => item.name)

            checked = children.every(child => campaignData.rules.includes(child))

            if (!checked) {
                indeterminate = children.some(child => campaignData.rules.includes(child))
            }
        }

        return (
            <TreeItem
                nodeId={index.toString()}
                label={
                    <HtmlTooltip disableFocusListener title={rule.description}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Checkbox
                                checked={checked || campaignData.rules.includes(rule.name)}
                                onChange={() => handleRuleChange(rule.name)}
                                indeterminate={indeterminate} />
                            <Typography variant="body2" style={{ display: "flex", alignItems: "center" }}>
                                <Box>
                                    {rule.name + " —"}
                                </Box>
                                <Box fontStyle="italic" fontSize="12px">
                                    {rule.quote}
                                </Box>
                            </Typography>
                        </div>
                    </HtmlTooltip>
                }>
                {rule.children && rule.children.map((item, index2) => getTreeOption(item, index + index2 + 1))}
            </TreeItem>
        )
    }

    const checkDisable = () => {
        return !campaignData.name ||
            !campaignData.game ||
            !campaignData.mode ||
            !campaignData.dm ||
            campaignData.characters.length <= 0 ||
            campaignData.players.length <= 0
    }

    const handleSubmit = () => {
        let campaign = { ...campaignData };

        campaign.players = [...campaign.players.map(item => item._id)]
        campaign.characters = [...campaign.characters.map(item => item._id)];
        
        delete campaign['mode']
        Api.fetchInternal('/campaigns', {
            method: "POST",
            body: JSON.stringify(campaign)
        })
            .then(() => {
                notify("success", "La campaña ha sido añadida.")

                Api.fetchInternal("/campaigns")
                    .then(res => {
                        props.addCampaigns(res)
                        props.history.goBack()
                        props.history.goBack()
                    })
            })
            .catch(() => {
                notify("error", "La campaña no ha podido ser añadida.")
            })
    }

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <Paper variant="outlined" className={classes.paper}>
                <Typography variant="h6" gutterBottom>
                    Tu campaña
                    </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    Por favor detalla los datos básicos de tu campaña.
                    </Typography>
                <Grid container spacing={2}>
                    <Grid item sm={5}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Nombre"
                            onChange={(e) => setData("name", e.target.value)}
                            value={campaignData.name}
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={3}>
                        {props.profile &&
                            <TextField
                                required
                                id="dm"
                                name="dm"
                                label="DM"
                                // onChange={(e) => setData("name", e.target.value)}
                                value={props.profile.username}
                                fullWidth
                                disabled
                            />
                        }
                    </Grid>
                    <Grid item sm={4}>
                        <FormControl className={classes.formControl} required>
                            <InputLabel id="demo-simple-select-label">Juego</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={campaignData.game}
                                disabled
                            // onChange={(e) => setPronoun(e.target.value)}
                            >
                                <MenuItem value={'D&D 5e'}>{'D&D 5e'}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl className={classes.formControl} required>
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                value={campaignData.players}
                                onChange={(event, newValue) => {
                                    setData("players", newValue)
                                }}
                                options={players}
                                getOptionLabel={(option) => option.username}
                                filterSelectedOptions
                                renderTags={(tagValue, getTagProps) =>
                                    tagValue.map((option, index) => (
                                        <Chip
                                            label={option.username}
                                            {...getTagProps({ index })}
                                        />
                                    ))}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Jugadores"
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sm={6}>
                        <FormControl className={classes.formControl} required>
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                value={campaignData.characters}
                                onChange={(event, newValue) => setData("characters", newValue)}
                                options={characters}
                                getOptionLabel={(option) => option.name}
                                filterSelectedOptions
                                renderTags={(tagValue, getTagProps) =>
                                    tagValue.map((option, index) =>  (
                                        <Chip
                                            label={option.name}
                                            {...getTagProps({ index })}
                                        />
                                    ))}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Personajes"
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item lg={12}>
                        Integración con Discord
                    </Grid>
                    <Grid item sm={3}>
                        <TextField
                            id="dm"
                            name="dm"
                            label="Canal principal"
                            onChange={(e) => setData("discordData", {
                                main: e.target.value
                            })}
                            // onChange={(e) => setData("name", e.target.value)}
                            value={campaignData.discordData.main}
                            fullWidth
                        />
                    </Grid>
                    <Grid item lg={12}>
                        Reglas personalizadas
                    </Grid>
                    <Grid item sm={4}>
                        <FormControl className={classes.formControl} required>
                            <InputLabel id="demo-simple-select-label">Modo de Juego</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={campaignData.mode}
                                onChange={(e) => setData("mode", e.target.value)}
                            >
                                <MenuItem value={'classic'}>{'Clásico'}</MenuItem>
                                <MenuItem value={'darker-dungeons'}>{'Darker Dungeons'}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sm={8}>
                        {campaignData.mode === "classic" ?
                            "La experiencia clásica de D&D 5e con las normas básicas establecidas en el Player Handbook y Dungeon Master's Manual."
                            : "Una experiencia de juego más difícil, con elementos para ambientar tu partida en un mundo más oscuro y desolado establecida en la expansión Darker Dungeon."
                        }
                    </Grid>
                    <Grid item sm={12}>
                        <TreeView
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                            multiSelect
                        >
                            {rules[campaignData.mode] && rules[campaignData.mode].map((rule, index) => getTreeOption(rule, index))}
                        </TreeView>
                    </Grid>
                    <Grid item sm={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ float: "right" }}
                            disabled={submitDisabled}
                            onClick={handleSubmit}>
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Slide >
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignCreation);