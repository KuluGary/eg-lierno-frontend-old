import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
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
        // fontWeight: 600
    },
    image: {
        height: "35vh",
        float: "left",
        display: "block",
        margin: "0 auto",
        padding: "0 1rem 0 0"
    }
}));

const mapStateToProps = state => {
    return { npcs: state.npcs }
}

function NpcProfile(props) {
    const classes = useStyles();
    const [npc, setNpc] = useState();

    useEffect(() => {
        if (!props.npcs) {
            Api.fetchInternal('/npc/' + props.match.params.id)
                .then(res => {
                    setNpc(res)
                });
        } else {
            const selectedNpc = props.npcs.filter(npc => npc._id === props.match.params.id)[0];
            selectedNpc && setNpc(selectedNpc)
        }
    }, [])

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <div className={classes.root}>
                {npc &&
                    <Grid container spacing={1} style={{ alignItems: "stretch" }}>
                        <Grid item xs={12} sm={12} md={6} className={classes.gridItem}>
                            <Paper variant="outlined" className={classes.profileBox}>
                                <Box>
                                    <Typography variant={'h5'} className={classes.title}>
                                        <NavLink to={'/npcs'} className={classes.link}>
                                            <ArrowBackIosIcon />
                                        </NavLink>
                                        <Box component="span" style={{ height: "100%" }}>
                                            {npc.name}
                                        </Box>
                                    </Typography>
                                    <Typography variant={'subtitle1'}>
                                        {npc.flavor.gender + ' ' + npc.stats.race + ', ' + npc.stats.alignment + ' ' + npc.flavor.class}
                                    </Typography>
                                </Box>
                                <Divider className={classes.divider} />
                                <Box>
                                    <Box>
                                        <Typography variant={'subtitle2'} display="inline">
                                            {'Armadura: '}
                                        </Typography>

                                        {npc.stats.armorClass + (npc.stats.armorType && ' (' + npc.stats.armorType + ')')}

                                    </Box>
                                    <Box>
                                        <Typography variant={'subtitle2'} display="inline">
                                            {'Puntos de vida: '}
                                        </Typography>

                                        {npc.stats.hitPointsStr}

                                    </Box>
                                    <Box>
                                        <Box>
                                            <Typography variant={'subtitle2'} display="inline">
                                                {'Velocidad: '}
                                            </Typography>

                                            {npc.stats.speed}

                                        </Box>
                                    </Box>

                                    <Divider className={classes.divider} />

                                    <Stats stats={npc.stats.abilityScores} />

                                    <Divider className={classes.divider} />

                                    <Box>
                                        <Box>
                                            <Typography variant={'subtitle2'} display="inline">
                                                {'Sentidos: '}
                                            </Typography>

                                            {npc.stats.senses.length > 0 ? npc.stats.senses.map(sense => <Box component="span">{sense}</Box>) : '—'}

                                        </Box>
                                        {npc.stats.damageVulnerabilities.length > 0 && <Box>
                                            <Typography variant={'subtitle2'} display="inline">
                                                {'Vulnerabilidades al daño: '}
                                            </Typography>

                                            {npc.stats.damageVulnerabilities.map(vulnerability => <Box component="span">{vulnerability}</Box>)}

                                        </Box>}
                                        {npc.stats.damageResistances.length > 0 && <Box>
                                            <Typography variant={'subtitle2'} display="inline">
                                                {'Resistencias al daño: '}
                                            </Typography>

                                            {npc.stats.damageResistances.map(resistance => <Box component="span">{resistance}</Box>)}

                                        </Box>}
                                        {npc.stats.damageImmunities.length > 0 && <Box>
                                            <Typography variant={'subtitle2'} display="inline">
                                                {'Inmunidades al daño: '}
                                            </Typography>

                                            {npc.stats.damageImmunities.map(immunity => <Box component="span">{immunity}</Box>)}

                                        </Box>}
                                        {npc.stats.conditionImmunities.length > 0 && <Box>
                                            <Typography variant={'subtitle2'} display="inline">
                                                {'Inmunidades a las condiciones: '}
                                            </Typography>

                                            {npc.stats.conditionImmunities.map(immunity => <Box component="span">{immunity}</Box>)}

                                        </Box>}
                                        <Box>
                                            <Typography variant={'subtitle2'} display="inline">
                                                {'Idiomas: '}
                                            </Typography>

                                            {npc.stats.languages.length > 0
                                                ? npc.stats.languages.map(sense => <Box component="span">{sense}</Box>)
                                                : '–'}

                                        </Box>
                                        <Box>
                                            <Typography variant={'subtitle2'} display="inline">
                                                {'Valor de desafío: '}
                                            </Typography>

                                            {npc.stats.challengeRatingStr + (npc.stats.experiencePoints && ' (' + npc.stats.experiencePoints + ' XP)')}

                                        </Box>
                                    </Box>

                                    <Divider className={classes.divider} />
                                    {npc.stats.additionalAbilities.length > 0 &&
                                        <Box>
                                            <Box>
                                                {npc.stats.additionalAbilities.map(ability => (
                                                    <Box component="p">
                                                        <Typography display="inline" variant="subtitle2">{ability.name + '. '}</Typography>
                                                        <span dangerouslySetInnerHTML={{ __html: ability.description }} />
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                    }

                                    {npc.stats.actions.length > 0 &&
                                        <Box component="p">
                                            <Typography variant={'h6'}>Acciones</Typography>
                                            <Divider className={classes.fullWidthDivier} />
                                            <Box>
                                                {npc.stats.actions.map(action => (
                                                    <Box>
                                                        <Typography display="inline" variant="subtitle2">{action.name + '. '}</Typography>
                                                        <span dangerouslySetInnerHTML={{ __html: action.description }} />
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                    }

                                    {npc.stats.reactions.length > 0 &&
                                        <Box>
                                            <Typography variant={'h6'}>Reacciones</Typography>
                                            <Box>
                                                {npc.stats.reactions.map(reaction => (
                                                    <Box>
                                                        <Typography display="inline" variant="subtitle2">{reaction.name + '. '}</Typography>
                                                        <span dangerouslySetInnerHTML={{ __html: reaction.description }} />
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                    }
                                    {npc.stats.legendaryActions.length > 0 &&
                                        <Box>
                                            <Typography variant={'h6'}>Acciones legendarias</Typography>
                                            <Divider />
                                            <Box>
                                                {npc.stats.legendaryActionsDescription}
                                            </Box>
                                            <Box>
                                                {npc.stats.legendaryActions.map(action => (
                                                    <Box>
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
                                <Typography variant='h6'>
                                    {'Descripción. '}
                                </Typography>
                                <Box component="p">
                                    {npc.flavor.description}
                                </Box>
                                <ModalImage
                                    hideDownload
                                    align="left"
                                    style={{
                                        float: "left",
                                        margin: "0 20px 40px 0",
                                        padding: "0 1em 0 0"
                                    }}
                                    className={classes.image}
                                    small={npc.flavor.imageUrl}
                                    large={npc.flavor.imageUrl}
                                />

                                <Box component="p" style={{
                                    textAlign: "justify",
                                    padding: "0 1em 0 0"
                                }}>
                                    <Box component="p">
                                        <Typography display="inline" variant="subtitle2">{'Rasgos de personalidad. '}</Typography>
                                        {npc.flavor.personality.personalityTrait1 + ' ' + npc.flavor.personality.personalityTrait2}
                                    </Box>
                                    <Box component="p">
                                        <Typography display="inline" variant="subtitle2">{'Ideales. '}</Typography>
                                        {npc.flavor.personality.ideals}
                                    </Box>
                                    <Box component="p">
                                        <Typography display="inline" variant="subtitle2">{'Vínculos. '}</Typography>
                                        {npc.flavor.personality.bonds}
                                    </Box>
                                    <Box component="p">
                                        <Typography display="inline" variant="subtitle2">{'Defectos. '}</Typography>
                                        {npc.flavor.personality.flaws}
                                    </Box>
                                    <Box component="p">
                                        <Typography display="inline" variant="subtitle2">{'Historia. '}</Typography>
                                        <span dangerouslySetInnerHTML={{ __html: npc.flavor.personality.backstory }} />
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                }
            </div>
        </Slide>
    )
}


export default connect(mapStateToProps)(NpcProfile);