import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Api from '../../helpers/api'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ModalImage from "react-modal-image";
import Stats from '../CharacterProfile/components/Stats';
import Slide from '@material-ui/core/Slide';
import { StringUtil } from '../../helpers/string-util';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ShareIcon from '@material-ui/icons/Share';
import {
    EmailShareButton,
    FacebookShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    WhatsappShareButton
} from "react-share";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faTelegram } from '@fortawesome/free-brands-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faTumblr } from '@fortawesome/free-brands-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faReddit } from '@fortawesome/free-brands-svg-icons'

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
    const { npcs, match } = props;
    const classes = useStyles();
    const [npc, setNpc] = useState();
    const [dialogOpen, setDialogOpen] = useState(false);

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

    const openDialog = () => {
        setDialogOpen(!dialogOpen);
    }

    const shareDialog = () => (
        <Dialog open={dialogOpen} style={{ padding: 10 }}>
            <DialogTitle>Comparte tu ficha de personaje</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    value={window.location.href}
                    label={'Enlace'}
                    InputProps={{
                        endAdornment:
                            <IconButton
                                onClick={() => navigator.clipboard.writeText(window.location.href)}>
                                <FileCopyIcon />
                            </IconButton>
                    }}
                />
                <Box variant="div" style={{ margin: "1rem 0" }}>
                    <EmailShareButton
                        subject={'¡Mira mi ficha de personaje!'}
                        url={window.location.href}
                        body={"¡Mira el personaje que he creado en Lierno App!"}
                    >
                        <FontAwesomeIcon icon={faEnvelope} size="lg" style={{ marginRight: ".8rem", marginLeft: ".2rem" }} />
                            Compartir por email
                        </EmailShareButton>
                </Box>
                <Box variant="div" style={{ margin: "1rem 0" }}>
                    <TwitterShareButton
                        url={window.location.href}
                        title={'¡Mira mi ficha de personaje!'}
                        hashtags={["dnd", "charactersheet"]}>
                        <FontAwesomeIcon icon={faTwitter} size="lg" style={{ marginRight: ".8rem", marginLeft: ".2rem" }} />
                            Compartir en Twitter
                        </TwitterShareButton>
                </Box>
                <Box variant="div" style={{ margin: "1rem 0" }}>
                    <TelegramShareButton
                        url={window.location.href}
                        title={'¡Mira mi ficha de personaje!'}>
                        <FontAwesomeIcon icon={faTelegram} size="lg" style={{ marginRight: ".8rem", marginLeft: ".2rem" }} />
                            Compartir por Telegram
                        </TelegramShareButton>
                </Box>
                <Box variant="div" style={{ margin: "1rem 0" }}>
                    <WhatsappShareButton
                        url={window.location.href}
                        title={'¡Mira mi ficha de personaje!'}>
                        <FontAwesomeIcon icon={faWhatsapp} size="lg" style={{ marginRight: ".8rem", marginLeft: ".2rem" }} />
                            Compartir por Whatsapp
                        </WhatsappShareButton>
                </Box>
                <Box variant="div" style={{ margin: "1rem 0" }}>
                    <TumblrShareButton
                        url={window.location.href}
                        title={'¡Mira mi ficha de personaje!'}
                        tags={["d&d", "character sheet"]}>
                        <FontAwesomeIcon icon={faTumblr} size="lg" style={{ marginRight: ".8rem", marginLeft: ".2rem" }} />
                            Compartir en Tumblr
                        </TumblrShareButton>
                </Box>
                <Box variant="div" style={{ margin: "1rem 0" }}>
                    <FacebookShareButton
                        url={window.location.href}
                        quote={'¡Mira mi ficha de personaje!'}
                        hashtag={"#dnd"}>
                        <FontAwesomeIcon icon={faFacebook} size="lg" style={{ marginRight: ".8rem", marginLeft: ".2rem" }} />
                            Compartir en Facebook
                        </FacebookShareButton>
                </Box>
                <Box variant="div" style={{ margin: "1rem 0" }}>
                    <RedditShareButton
                        url={"window.location.href"}
                        title={'¡Mira mi ficha de personaje!'}>
                        <FontAwesomeIcon icon={faReddit} size="lg" style={{ marginRight: ".8rem", marginLeft: ".2rem" }} />
                            Compartir en Reddit
                        </RedditShareButton>
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={openDialog} color="default">
                    Cerrar
                        </Button>
            </DialogActions>
        </Dialog>
    )

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
                                                {/* <Typography variant={'h2'} > */}
                                                    {npc.name}
                                                {/* </Typography> */}
                                            </Box>
                                        </Typography>
                                        <IconButton onClick={openDialog}>
                                            <ShareIcon />
                                        </IconButton>
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

                                    <Stats stats={npc.stats.abilityScores} modifiers={npc.stats.abilityScoreModifiers} mode="npc" />

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
                {shareDialog()}
            </div>
        </Slide>
    )
}


export default connect(mapStateToProps)(NpcProfile);