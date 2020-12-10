import React, { useState, useEffect } from 'react';
import { StringUtil } from '../../helpers/string-util';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Api from '../../helpers/api'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
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
        display: "flex",
        padding: ".2rem"
    },
    divider: {
        maxWidth: "50%",
        margin: "1rem auto"
    },
    fullWidthDivier: {
        margin: ".5rem 0"
    },
    bold: {
        // fontWeight: 600
    },
    image: {
        height: "65vh",
        maxWidth: "100%",
        display: "block",
        margin: "0 auto",
        backgroundColor: "white"
    },
    imageBox: {
        backgroundColor: "white",
        borderRadius: ".2rem",
        marginBottom: "1rem"
    }
}));

const mapStateToProps = state => {
    return { monsters: state.monsters }
}

function MonsterProfile(props) {
    const { monsters, match } = props;
    const classes = useStyles();
    const [monster, setMonster] = useState();

    useEffect(() => {
        if (!monsters) {
            Api.fetchInternal('/bestiary/' + match.params.id)
                .then(res => setMonster(res));
        } else {
            const selectedMonster = monsters.filter(monster => monster._id === match.params.id)[0];
            selectedMonster && setMonster(selectedMonster)
        }
    }, [monsters, match])

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <div className={classes.root}>
                {monster &&
                    <Grid container spacing={1} style={{ alignItems: "stretch" }}>
                        <Grid item xs={12} sm={12} md={6} className={classes.gridItem}>
                            <Paper variant="outlined" className={classes.profileBox}>
                                <Box>
                                    <Typography variant={'h5'} className={classes.title}>
                                    <   IconButton onClick={props.history.goBack} className={classes.link}>
                                            <ArrowBackIosIcon />
                                        </IconButton>
                                        <Box component="span" style={{ height: "100%" }}>
                                            {monster.name}
                                        </Box>
                                    </Typography>
                                    <Typography variant={'subtitle1'}>
                                        {monster.stats.race + ' ' + monster.stats.size + ', ' + monster.stats.alignment}
                                    </Typography>
                                </Box>
                                <Divider className={classes.divider} />
                                <Box>
                                    <Box>
                                        <Typography className={classes.bold} variant={'subtitle2'} display="inline">
                                            {'Armadura: '}
                                        </Typography>
                                        {monster.stats.armorClass + (monster.stats.armorType && ' (' + monster.stats.armorType + ')')}
                                    </Box>
                                    <Box>
                                        <Typography className={classes.bold} variant={'subtitle2'} display="inline">
                                            {'Puntos de vida: '}
                                        </Typography>
                                        {monster.stats.hitPointsStr}
                                    </Box>
                                    <Box>
                                        <Box>
                                            <Typography className={classes.bold} variant={'subtitle2'} display="inline">
                                                {'Velocidad: '}
                                            </Typography>
                                            {monster.stats.speed}
                                        </Box>
                                    </Box>

                                    <Divider className={classes.divider} />

                                    <Stats mode="npc" stats={monster.stats.abilityScores} modifiers={monster.stats.abilityScoreModifiers} />

                                    <Divider className={classes.divider} />

                                    <Box>
                                        <Box>
                                            <Typography variant={'subtitle2'} display="inline">
                                                {'Tiradas de salvación: '}
                                            </Typography>

                                            {monster.stats.savingThrows.length > 0
                                                ? StringUtil.returnStringFromObjectArray(monster.stats.savingThrows, "modifierStr") : '—'}
                                        </Box>
                                        <Box>
                                            <Typography variant={'subtitle2'} display="inline">
                                                {'Habilidades: '}
                                            </Typography>

                                            {monster.stats.skills.length > 0
                                                ? StringUtil.returnModifierStr(monster.stats.skills, monster) : '—'}
                                        </Box>
                                        <Box>
                                            <Typography className={classes.bold} variant={'subtitle2'} display="inline">
                                                {'Sentidos: '}
                                            </Typography>
                                            {monster.stats.senses.length > 0 ? monster.stats.senses.join(", ") : '—'}
                                        </Box>
                                        {monster.stats.damageVulnerabilities.length > 0 && <Box>
                                            <Typography className={classes.bold} variant={'subtitle2'} display="inline">
                                                {'Vulnerabilidades al daño: '}
                                            </Typography>
                                            {monster.stats.damageVulnerabilities.join(", ")}
                                        </Box>}
                                        {monster.stats.damageResistances.length > 0 && <Box>
                                            <Typography className={classes.bold} variant={'subtitle2'} display="inline">
                                                {'Resistencias al daño: '}
                                            </Typography>
                                            {monster.stats.damageResistances.join(", ")}
                                        </Box>}
                                        {monster.stats.damageImmunities.length > 0 && <Box>
                                            <Typography className={classes.bold} variant={'subtitle2'} display="inline">
                                                {'Inmunidades al daño: '}
                                            </Typography>
                                            {monster.stats.damageImmunities.join(", ")}
                                        </Box>}
                                        {monster.stats.conditionImmunities.length > 0 && <Box>
                                            <Typography className={classes.bold} variant={'subtitle2'} display="inline">
                                                {'Inmunidades a las condiciones: '}
                                            </Typography>
                                            {monster.stats.conditionImmunities.join(", ")}
                                        </Box>}
                                        <Box>
                                            <Typography className={classes.bold} variant={'subtitle2'} display="inline">
                                                {'Idiomas: '}
                                            </Typography>
                                            {monster.stats.languages.length > 0
                                                ? monster.stats.languages.join(", ")
                                                : '–'}
                                        </Box>
                                        <Box>
                                            <Typography className={classes.bold} variant={'subtitle2'} display="inline">
                                                {'Valor de desafío: '}
                                            </Typography>
                                            {monster.stats.challengeRatingStr + (monster.stats.experiencePoints && ' (' + monster.stats.experiencePoints + ' XP)')}
                                        </Box>
                                    </Box>

                                    <Divider className={classes.divider} />
                                    {monster.stats.additionalAbilities.length > 0 &&
                                        <Box>
                                            <Box>
                                                {monster.stats.additionalAbilities.map(ability => (
                                                    <Box component="p">
                                                        <Typography display="inline" variant="subtitle2">{ability.name + '. '}</Typography>
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
                                                    <Typography display="inline" variant="subtitle2">{action.name + '. '}</Typography>
                                                    <span dangerouslySetInnerHTML={{ __html: action.description }} />
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                    {monster.stats.reactions.length > 0 &&
                                        <Box>
                                            <Typography variant={'h6'}>Reacciones</Typography>
                                            <Divider className={classes.fullWidthDivier} />
                                            <Box>
                                                {monster.stats.reactions.map(reaction => (
                                                    <Box component="p">
                                                        <Typography display="inline" variant="subtitle2">{reaction.name + '. '}</Typography>
                                                        <span dangerouslySetInnerHTML={{ __html: reaction.description }} />
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                    }
                                    {monster.stats.legendaryActions.length > 0 &&
                                        <Box>
                                            <Typography variant={'h6'}>Acciones legendarias</Typography>
                                            <Divider className={classes.fullWidthDivier} />
                                            <Box>
                                                {monster.stats.legendaryActionsDescription}
                                            </Box>
                                            <Box>
                                                {monster.stats.legendaryActions.map(action => (
                                                    <Box component="p">
                                                        <Typography display="inline" variant="subtitle2">{action.name + '. '}</Typography>
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
                                <Box className={classes.imageBox}>
                                    <ModalImage
                                        hideDownload
                                        className={classes.image}
                                        small={monster.flavor.imageUrl}
                                        large={monster.flavor.imageUrl}
                                    />
                                </Box>
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