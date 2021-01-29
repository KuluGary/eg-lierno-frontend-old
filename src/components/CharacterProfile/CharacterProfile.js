import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Api from "../../helpers/api";

import CharacterInfo from "./components/CharacterInfo";
import Information from './tabs/Information';
import Background from './tabs/Background';
import Features from './tabs/Features';
import Items from "./tabs/Items";
import Options from "./tabs/Options";
import Spells from "./tabs/Spells";

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';

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

const useStyles = makeStyles({
    container: {
        maxWidth: "45vw"
    },
    root: {
        marginLeft: "4px"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none'
    },
    flexGrid: {
        display: "flex",
        width: "100%"
    }
});

const mapStateToProps = state => {
    return {
        characters: state.characters,
        profile: state.profile
    }
}

function CharacterProfile(props) {
    const classes = useStyles();
    const [character, setCharacter] = useState();
    const [editedCharacter, setEditedCharacter] = useState();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [editable, setEditable] = useState(false)
    const [edited, setEdited] = useState(false);
    const [proficiencyBonus, setProficiencyBonus] = useState(0);
    const [shortUrl, setShortUrl] = useState(window.location.href);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        Api.fetchInternal('/characters/' + props.match.params.id)
            .then(res => {
                setCharacter(res)
                setEditedCharacter(res)
                setCategories(["Información", "Trasfondo", "Rasgos", "Objetos", "Hechizos", "Opciones"].filter(el => el))
            })

        const headers = {
            'Authorization': `Bearer ${process.env.REACT_APP_BITLY_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        };
        const body = {
            "long_url": window.location.href,
            "group_guid": process.env.REACT_APP_BITLY_ACCESS_GROUP
        }

        if (!Api.isDev()) {
            fetch("https://api-ssl.bitly.com/v4/shorten", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(res => setShortUrl(res.link))
        }
    }, [])

    useEffect(() => {
        if (editedCharacter) {
            let proficiencyBonus = 0;
            let totalLevel = 0;
            editedCharacter.stats.classes.forEach(charClass => {
                totalLevel += charClass.classLevel;
            })

            proficiencyBonus = Math.ceil(1 + totalLevel / 4)

            setProficiencyBonus(proficiencyBonus)
        }
    }, [editedCharacter])

    useEffect(() => {
        if (!Object.is(editedCharacter, character)) {
            if (!edited) {
                setEdited(true)
            }
        }
    }, [editedCharacter])

    useEffect(() => {
        if (props.profile && character) {
            if (props.profile._id === character.player) {
                setEditable(true)
            }
        }
    }, [character])

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setSelectedCategory(newValue);
    }

    const changeStats = (key, value) => {
        const char = { ...editedCharacter };

        char['stats'][key] = value

        setEditedCharacter(char)
    }

    const changeFlavor = (key, value) => {
        const char = { ...editedCharacter };

        char['flavor'][key] = value

        setEditedCharacter(char)
    }

    const changeOptions = (options) => {
        const char = { ...editedCharacter };

        char['config'] = options;

        setEditedCharacter(char)
    }

    function tabData() {
        switch (selectedCategory) {
            case 0: return <Information
                character={editedCharacter}
                proficiencyBonus={proficiencyBonus}
                changeStats={changeStats}
                settings={editedCharacter.config}
                editable={editable} />
            case 1: return <Background
                character={editedCharacter.flavor}
                features={editedCharacter.stats}
                settings={editedCharacter.config}
                changeFlavor={changeFlavor}
                changeStats={changeStats}
                pronoun={editedCharacter.flavor.traits.pronoun}
                editable={editable} />
            case 2: return <Features
                features={editedCharacter.stats}
                changeStats={changeStats}
                race={editedCharacter.stats.race}
                // raceId={editedCharacter.stats.race}
                // subraceIndex={editedCharacter.stats.subrace}
                pronoun={editedCharacter.flavor.traits.pronoun}
                editable={editable} />
            case 3: return <Items
                items={editedCharacter.stats.equipment}
                waterskin={editedCharacter.stats.waterskin}
                rations={editedCharacter.stats.rations}
                money={editedCharacter.stats.money}
                inventory={editedCharacter.stats.inventory}
                abilityScores={editedCharacter.stats.abilityScores}
                race={editedCharacter.stats.race}
                settings={editedCharacter.config}
                changeStats={changeStats}
                editable={editable} />
            case 4: return <Spells
                spellIds={editedCharacter.stats.spells}
                features={editedCharacter.stats}
                proficiencyBonus={proficiencyBonus}
                changeStats={changeStats}
                editable={editable} />
            default: return <Options
                settings={editedCharacter.config}
                editable={editable}
                changeOptions={changeOptions}
            />
        }
    }

    const save = () => {
        Api.fetchInternal("/characters/" + character._id, {
            method: "PUT",
            body: JSON.stringify(editedCharacter)
        })
            .then((res) => setEdited(false))
    }

    const openDialog = () => {
        setDialogOpen(!dialogOpen);
    }

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <div className={classes.root}>
                {editedCharacter &&
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <CharacterInfo
                                name={editedCharacter.flavor.traits["name"]}
                                image={editedCharacter.flavor.portrait}
                                race={editedCharacter.stats.race}
                                subrace={editedCharacter.stats.subrace}
                                alignment={editedCharacter.stats.alignment}
                                background={editedCharacter.stats.background}
                                charClass={editedCharacter.stats.classes}
                                pronoun={editedCharacter.flavor.traits.pronoun}
                                playerId={editedCharacter.player}
                                character={character}
                                edited={edited}
                                editable={editable}
                                save={save}
                                openDialog={openDialog} />
                        </Grid>
                        <Tabs
                            variant="scrollable"
                            scrollButtons="on"
                            value={selectedCategory}
                            onChange={handleChange}
                            aria-label="simple tabs example">
                            {categories.map((category, index) => {
                                return <Tab key={index} label={category} {...a11yProps(category)} />
                            })}
                        </Tabs>
                        {tabData()}
                    </Grid>
                }
                <Dialog open={dialogOpen} style={{ padding: 10 }}>
                    <DialogTitle>Comparte tu ficha de personaje</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            value={shortUrl}
                            label={'Enlace'}
                            InputProps={{
                                endAdornment:
                                    <IconButton
                                        onClick={() => navigator.clipboard.writeText(shortUrl)}>
                                        <FileCopyIcon />
                                    </IconButton>
                            }}
                        />
                        <Box variant="div" style={{ margin: "1rem 0" }}>
                            <EmailShareButton
                                subject={'¡Mira mi ficha de personaje!'}
                                url={shortUrl}
                                body={"¡Mira el personaje que he creado en Lierno App!"}
                            >
                                <FontAwesomeIcon icon={faEnvelope} size="lg" style={{ marginRight: ".8rem", marginLeft: ".2rem" }} />
                            Compartir por email
                        </EmailShareButton>
                        </Box>
                        <Box variant="div" style={{ margin: "1rem 0" }}>
                            <TwitterShareButton
                                url={shortUrl}
                                title={'¡Mira mi ficha de personaje!'}
                                hashtags={["dnd", "charactersheet"]}>
                                <FontAwesomeIcon icon={faTwitter} size="lg" style={{ marginRight: ".8rem", marginLeft: ".2rem" }} />
                            Compartir en Twitter
                        </TwitterShareButton>
                        </Box>
                        <Box variant="div" style={{ margin: "1rem 0" }}>
                            <TelegramShareButton
                                url={shortUrl}
                                title={'¡Mira mi ficha de personaje!'}>
                                <FontAwesomeIcon icon={faTelegram} size="lg" style={{ marginRight: ".8rem", marginLeft: ".2rem" }} />
                            Compartir por Telegram
                        </TelegramShareButton>
                        </Box>
                        <Box variant="div" style={{ margin: "1rem 0" }}>
                            <WhatsappShareButton
                                url={shortUrl}
                                title={'¡Mira mi ficha de personaje!'}>
                                <FontAwesomeIcon icon={faWhatsapp} size="lg" style={{ marginRight: ".8rem", marginLeft: ".2rem" }} />
                            Compartir por Whatsapp
                        </WhatsappShareButton>
                        </Box>
                        <Box variant="div" style={{ margin: "1rem 0" }}>
                            <TumblrShareButton
                                url={shortUrl}
                                title={'¡Mira mi ficha de personaje!'}
                                tags={["d&d", "character sheet"]}>
                                <FontAwesomeIcon icon={faTumblr} size="lg" style={{ marginRight: ".8rem", marginLeft: ".2rem" }} />
                            Compartir en Tumblr
                        </TumblrShareButton>
                        </Box>
                        <Box variant="div" style={{ margin: "1rem 0" }}>
                            <FacebookShareButton
                                url={shortUrl}
                                quote={'¡Mira mi ficha de personaje!'}
                                hashtag={"#dnd"}>
                                <FontAwesomeIcon icon={faFacebook} size="lg" style={{ marginRight: ".8rem", marginLeft: ".2rem" }} />
                            Compartir en Facebook
                        </FacebookShareButton>
                        </Box>
                        <Box variant="div" style={{ margin: "1rem 0" }}>
                            <RedditShareButton
                                url={"shortUrl"}
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
            </div>
        </Slide >
    );
}

export default connect(mapStateToProps)(CharacterProfile);