import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Api from 'helpers/api'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Stats from 'pages/Character/CharacterProfile/components/Stats';
import Slide from '@material-ui/core/Slide';
import { StringUtil } from 'helpers/string-util';
import ShareIcon from '@material-ui/icons/Share';
import Image from 'components/Image/Image';
import EditIcon from '@material-ui/icons/Edit';
import ShareComponent from 'components/ShareComponent/ShareComponent';

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
    image: {
        height: "35vh",
        float: "left",
        display: "block",
        margin: "0 1rem",
        // padding: "0 1rem 0 0"
    }
}));

const mapStateToProps = state => {
    return { npcs: state.npcs, profile: state.profile }
}

function NpcProfile(props) {
    const { npcs, match } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [npc, setNpc] = useState();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editable, setEditable] = useState(false)

    useEffect(() => {
        if (!npcs) {
            Api.fetchInternal('/npc/' + match.params.id)
                .then(res => {
                    setNpc(res)
                });
        } else {
            const selectedNpc = npcs.filter(npc => npc._id === match.params.id)[0];
            selectedNpc && setNpc(selectedNpc)
        }
    }, [npcs, match])

    useEffect(() => {
        if (npc) {
            if (npc.createdBy === props.profile._id) {
                setEditable(true);
            }
        }
    }, [npc])

    const openDialog = () => {
        setDialogOpen(!dialogOpen);
    }

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <div className={classes.root}>
                {npc &&
                    <Grid container spacing={1} style={{ alignItems: "stretch" }}>
                        <Grid item xs={12} sm={12} md={6} className={classes.gridItem}>
                            <Paper variant="outlined" className={classes.profileBox}>
                                <Box>
                                    <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Typography variant={'h2'} className={classes.title}>
                                            <IconButton onClick={props.history.goBack} className={classes.link}>
                                                <ArrowBackIosIcon />
                                            </IconButton>
                                            <Box component="span" style={{ height: "100%" }}>
                                                {npc.name}
                                            </Box>
                                        </Typography>
                                        <Box>
                                            <IconButton 
                                                disabled={!editable}
                                                onClick={() => props.history.push("/npc/add/" + npc._id)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={openDialog}>
                                                <ShareIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    <Typography variant={'subtitle1'}>
                                        {npc.flavor.gender + ' ' + npc.stats.race + ', ' + npc.flavor.class + ' ' + npc.stats.alignment}
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

                                    <Grid container spacing={1}>
                                        <Stats stats={npc.stats.abilityScores} modifiers={npc.stats.abilityScoreModifiers} mode="npc" />
                                    </Grid>

                                    <Divider className={classes.divider} />

                                    <Box>
                                        <Box>
                                            <Typography variant={'subtitle2'} display="inline">
                                                {'Tiradas de salvación: '}
                                            </Typography>

                                            {npc.stats.savingThrows.length > 0
                                                ? StringUtil.returnStringFromObjectArray(npc.stats.savingThrows, "modifierStr") : '—'}
                                        </Box>
                                        <Box>
                                            <Typography variant={'subtitle2'} display="inline">
                                                {'Habilidades: '}
                                            </Typography>

                                            {npc.stats.skills.length > 0
                                                ? StringUtil.returnModifierStr(npc.stats.skills, npc) : '—'}
                                        </Box>
                                        <Box>
                                            <Typography variant={'subtitle2'} display="inline">
                                                {'Sentidos: '}
                                            </Typography>

                                            {npc.stats.senses.length > 0 ? npc.stats.senses.join(", ") : '—'}

                                        </Box>
                                        {npc.stats.damageVulnerabilities.length > 0 && <Box>
                                            <Typography variant={'subtitle2'} display="inline">
                                                {'Vulnerabilidades al daño: '}
                                            </Typography>

                                            {npc.stats.damageVulnerabilities.join(", ")}

                                        </Box>}
                                        {npc.stats.damageResistances.length > 0 && <Box>
                                            <Typography variant={'subtitle2'} display="inline">
                                                {'Resistencias al daño: '}
                                            </Typography>

                                            {npc.stats.damageResistances.join(", ")}

                                        </Box>}
                                        {npc.stats.damageImmunities.length > 0 && <Box>
                                            <Typography variant={'subtitle2'} display="inline">
                                                {'Inmunidades al daño: '}
                                            </Typography>

                                            {npc.stats.damageImmunities.join(", ")}

                                        </Box>}
                                        {npc.stats.conditionImmunities.length > 0 && <Box>
                                            <Typography variant={'subtitle2'} display="inline">
                                                {'Inmunidades a las condiciones: '}
                                            </Typography>

                                            {npc.stats.conditionImmunities.join(", ")}

                                        </Box>}
                                        <Box>
                                            <Typography variant={'subtitle2'} display="inline">
                                                {'Idiomas: '}
                                            </Typography>

                                            {npc.stats.languages.length > 0
                                                ? npc.stats.languages.join(", ")
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
                                                    <Box component="p">
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
                                            <Divider className={classes.fullWidthDivier} />
                                            <Box>
                                                {npc.stats.reactions.map(reaction => (
                                                    <Box component="p">
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
                                            <Divider className={classes.fullWidthDivier} />
                                            <Box>
                                                {npc.stats.legendaryActionsDescription}
                                            </Box>
                                            <Box>
                                                {npc.stats.legendaryActions.map(action => (
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
                                <Typography variant='h6'>
                                    {'Descripción. '}
                                </Typography>
                                <Box component="p">
                                    {npc.flavor.description}
                                </Box>
                                <Image
                                    className={classes.image}
                                    mode="modal"
                                    usage="avatar"
                                    style={{
                                        border: `1px solid ${theme.palette.divider}`,
                                        float: "left",
                                        margin: ".5rem 1rem",
                                        marginLeft: 0,
                                        minWidth: "11rem",
                                        minHeight: "15rem",
                                        borderRadius: 4
                                    }}
                                    src={npc.flavor.imageUrl}
                                />
                                <Box component="p" style={{
                                    textAlign: "justify",
                                    padding: "0 1em 0 0"
                                }}>
                                    <Box component="p">
                                        <Typography variant="subtitle1">{'Descripción psicológica'}</Typography>
                                        <Divider style={{ marginBottom: ".6rem" }} />
                                        <span dangerouslySetInnerHTML={{ __html: npc.flavor.personality.personality }} />
                                    </Box>
                                    <Box component="p">
                                        <Typography variant="subtitle1">{'Descripción física'}</Typography>
                                        <Divider style={{ marginBottom: ".6rem" }} />
                                        <span dangerouslySetInnerHTML={{ __html: npc.flavor.personality.physical }} />
                                    </Box>
                                    <Box component="p">
                                        <Typography variant="subtitle1">{'Historia'}</Typography>
                                        <Divider style={{ marginBottom: ".6rem" }} />
                                        <span dangerouslySetInnerHTML={{ __html: npc.flavor.personality.backstory }} />
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                }
                {/* {shareDialog()} */}
                <ShareComponent
                    dialogOpen={dialogOpen}
                    openDialogFunc={setDialogOpen} />
            </div>
        </Slide>
    )
}


export default connect(mapStateToProps)(NpcProfile);