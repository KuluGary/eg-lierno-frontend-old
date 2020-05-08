import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Api from '../../helpers/api'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ModalImage from "react-modal-image";
import Stats from '../CharacterProfile/components/Stats';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    profileBox: {
        padding: "1rem",
        height: "100%"
    },
    title: {
        display: 'flex',
        alignItems: 'center'
    },
    link: {
        color: 'inherit',
        display: "flex"
    },
    divider: {
        maxWidth: "50%",
        margin: "1rem auto"
    },
    fullWidthDivier: {
        margin: ".5rem 0"
    },
    bold: {
        fontWeight: 600
    },
    image: {
        height: "65vh",
        maxWidth: "100%",
        display: "block",
        margin: "0 auto"
    }
}));

const mapStateToProps = state => {
    return { monsters: state.monsters }
}

function MonsterProfile(props) {
    const classes = useStyles();
    const [monster, setMonster] = useState();

    useEffect(() => {
        if (!props.monsters) {
            Api.fetchInternal('/bestiary/' + props.match.params.id)
                .then(res => setMonster(res));
        } else {
            const selectedMonster = props.monsters.filter(monster => monster._id === props.match.params.id)[0];
            selectedMonster && setMonster(selectedMonster)
        }
    }, [])

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <div className={classes.root}>
                {monster &&
                    <Grid container spacing={1} style={{ alignItems: "stretch" }}>
                        <Grid item xs={12} sm={12} md={6} className={classes.gridItem}>
                            <Paper variant="outlined" className={classes.profileBox}>
                                <Box>
                                    <Typography variant={'h5'} className={classes.title}>
                                        <NavLink to={'/bestiary'} className={classes.link}>
                                            <ArrowBackIosIcon />
                                        </NavLink>
                                        <Box component="span" style={{ height: "100%" }}>
                                            {monster.name}
                                        </Box>
                                    </Typography>
                                    <Typography variant={'subheader2'}>
                                        {monster.stats.race + ' ' + monster.stats.size + ', ' + monster.stats.alignment}
                                    </Typography>
                                </Box>
                                <Divider className={classes.divider} />
                                <Box>
                                    <Box>
                                        <Typography className={classes.bold} variant={'subheader2'} inline>
                                            {'Armadura: '}
                                        </Typography>
                                        <Typography variant={'subheader4'} inline>
                                            {monster.stats.armorClass + (monster.stats.armorType && ' (' + monster.stats.armorType + ')')}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography className={classes.bold} variant={'subheader2'} inline>
                                            {'Puntos de vida: '}
                                        </Typography>
                                        <Typography variant={'subheader4'} inline>
                                            {monster.stats.hitPointsStr}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Box>
                                            <Typography className={classes.bold} variant={'subheader2'} inline>
                                                {'Velocidad: '}
                                            </Typography>
                                            <Typography variant={'subheader4'} inline>
                                                {monster.stats.speed}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Divider className={classes.divider} />

                                    <Stats stats={monster.stats.abilityScores} />

                                    <Divider className={classes.divider} />

                                    <Box>
                                        <Box>
                                            <Typography className={classes.bold} variant={'subheader2'} inline>
                                                {'Sentidos: '}
                                            </Typography>
                                            <Typography variant={'subheader4'} inline>
                                                {monster.stats.senses.map((sense, index) =>
                                                    <Box component="span">
                                                        {sense}
                                                        {monster.stats.senses.length !== index + 1 && ', '}
                                                    </Box>)}
                                            </Typography>
                                        </Box>
                                        {monster.stats.damageVulnerabilities.length > 0 && <Box>
                                            <Typography className={classes.bold} variant={'subheader2'} inline>
                                                {'Vulnerabilidades al daño: '}
                                            </Typography>
                                            <Typography variant={'subheader4'} inline>
                                                {monster.stats.damageVulnerabilities.map((vulnerability, index) =>
                                                    <Box component="span">
                                                        {vulnerability}
                                                        {monster.stats.damageVulnerabilities.length !== index + 1 && ', '}
                                                    </Box>)}
                                            </Typography>
                                        </Box>}
                                        {monster.stats.damageResistances.length > 0 && <Box>
                                            <Typography className={classes.bold} variant={'subheader2'} inline>
                                                {'Resistencias al daño: '}
                                            </Typography>
                                            <Typography variant={'subheader4'} inline>
                                                {monster.stats.damageResistances.map((resistance, index) =>
                                                    <Box component="span">
                                                        {resistance}
                                                        {monster.stats.damageResistances.length !== index + 1 && ', '}
                                                    </Box>)}
                                            </Typography>
                                        </Box>}
                                        {monster.stats.damageImmunities.length > 0 && <Box>
                                            <Typography className={classes.bold} variant={'subheader2'} inline>
                                                {'Inmunidades al daño: '}
                                            </Typography>
                                            <Typography variant={'subheader4'} inline>
                                                {monster.stats.damageImmunities.map(immunity => <Box component="span">{immunity}</Box>)}
                                            </Typography>
                                        </Box>}
                                        {monster.stats.conditionImmunities.length > 0 && <Box>
                                            <Typography className={classes.bold} variant={'subheader2'} inline>
                                                {'Inmunidades a las condiciones: '}
                                            </Typography>
                                            <Typography variant={'subheader4'} inline>
                                                {monster.stats.conditionImmunities.map((immunity, index) => (
                                                    <Box component="span">
                                                        {immunity}
                                                        {monster.stats.conditionImmunities.length !== index + 1 && ', '} </Box>
                                                ))}
                                            </Typography>
                                        </Box>}
                                        <Box>
                                            <Typography className={classes.bold} variant={'subheader2'} inline>
                                                {'Idiomas: '}
                                            </Typography>
                                            <Typography variant={'subheader4'} inline>
                                                {monster.stats.languages.length > 0
                                                    ? monster.stats.languages.map((sense, index) =>
                                                        <Box component="span">
                                                            {sense}
                                                            {monster.stats.languages.length !== index + 1 && ', '}
                                                        </Box>)
                                                    : '–'}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography className={classes.bold} variant={'subheader2'} inline>
                                                {'Valor de desafío: '}
                                            </Typography>
                                            <Typography variant={'subheader4'} inline>
                                                {monster.stats.challengeRatingStr + (monster.stats.experiencePoints && ' (' + monster.stats.experiencePoints + ' XP)')}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Divider className={classes.divider} />
                                    {monster.stats.additionalAbilities.length > 0 &&
                                        <Box>
                                            <Box>
                                                {monster.stats.additionalAbilities.map(ability => (
                                                    <Box component="p">
                                                        <span className={classes.bold}>{ability.name + '. '}</span>
                                                        <span dangerouslySetInnerHTML={{ __html: ability.description }} />
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                    }

                                    <Box>
                                        <Typography variant={'h6'}>Acciones</Typography>
                                        <Divider className={classes.fullWidthDivier} />
                                        <Box>
                                            {monster.stats.actions.map(action => (
                                                <Box component="p">
                                                    <span className={classes.bold}>{action.name + '. '}</span>
                                                    <span dangerouslySetInnerHTML={{ __html: action.description }} />
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                    {monster.stats.reactions.length > 0 &&
                                        <Box>
                                            <Typography variant={'h6'}>Reacciones</Typography>
                                            <Box>
                                                {monster.stats.reactions.map(reaction => (
                                                    <Box component="p">
                                                        <span className={classes.bold}>{reaction.name + '. '}</span>
                                                        <span dangerouslySetInnerHTML={{ __html: reaction.description }} />
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                    }
                                    {monster.stats.legendaryActions.length > 0 &&
                                        <Box>
                                            <Typography variant={'h6'}>Acciones legendarias</Typography>
                                            <Divider />
                                            <Box>
                                                {monster.stats.legendaryActionsDescription}
                                            </Box>
                                            <Box>
                                                {monster.stats.legendaryActions.map(action => (
                                                    <Box component="p">
                                                        <span className={classes.bold}>{action.name + '. '}</span>
                                                        <span dangerouslySetInnerHTML={{ __html: action.description }} />
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                    }
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} className={classes.gridItem}>
                            <Paper variant="outlined" className={classes.profileBox}>
                                <ModalImage
                                    hideDownload
                                    className={classes.image}
                                    small={monster.flavor.imageUrl}
                                    large={monster.flavor.imageUrl}
                                />
                                <span dangerouslySetInnerHTML={{ __html: monster.flavor.description }} />

                            </Paper>
                        </Grid>
                    </Grid>
                }
            </div>
        </ Slide>
    )
}

export default connect(mapStateToProps)(MonsterProfile);