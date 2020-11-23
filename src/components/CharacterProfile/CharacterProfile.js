import React, { useState, useEffect, m } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Api from "../../helpers/api";

import CharacterInfo from "./components/CharacterInfo";
import Information from './tabs/Information';
import Background from './tabs/Background';
import Features from './tabs/Features';
import Items from "./tabs/Items";
import Options from "./tabs/Options";
import Spells from "./tabs/Spells";

import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Slide from '@material-ui/core/Slide';

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

const theme = createMuiTheme({
    overrides: {
        MuiInputBase: {
            root: {
                "&$disabled": {
                    opacity: 1,
                    color: "inherit"
                }
            }
        },
        MuiInput: {
            underline: {
                "&$disabled": {
                    '&:before': {
                        borderBottomStyle: "dashed"
                    },
                }
            }
        },
        MuiRadio: {
            root: {
                "&$disabled": {
                    opacity: 1,
                    color: "inherit"
                }
            }
        }
    },
    palette: {
        type: localStorage.getItem("theme") ? 'dark' : 'light',
        primary: {
            main: "#fff"
        }
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
    const [proficiencyBonus, setProficiencyBonus] = useState(0)

    useEffect(() => {
        if (!props.characters) {
            Api.fetchInternal('/characters/' + props.match.params.id)
                .then(res => {
                    setCharacter(res)
                    setEditedCharacter(res)
                    setCategories(["Información", "Trasfondo", "Rasgos", "Objetos", (res && res.stats.spells.length > 0) && "Hechizos", "Opciones"].filter(el => el))
                })
        } else {
            const selectedCharacter = props.characters.filter(character => character._id === props.match.params.id)[0];
            selectedCharacter && setCharacter(selectedCharacter)
            // selectedCharacter && setCharacter(selectedCharacter)
            selectedCharacter && setEditedCharacter(selectedCharacter)
            setCategories(["Información", "Trasfondo", "Rasgos", "Objetos", (selectedCharacter && selectedCharacter.stats.spells.length > 0) && "Hechizos", "Opciones"].filter(el => el))
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
                settings={editedCharacter.config}
                changeFlavor={changeFlavor}
                editable={editable} />
            case 2: return <Features
                features={editedCharacter.stats}
                changeStats={changeStats}
                raceId={editedCharacter.stats.race}
                subraceIndex={editedCharacter.stats.subrace}
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
            case 4: return (editedCharacter && editedCharacter.stats.spells.length > 0) ?
                <Spells
                    spellIds={editedCharacter.stats.spells}
                    features={editedCharacter.stats}
                    proficiencyBonus={proficiencyBonus}
                    changeStats={changeStats}
                    editable={editable} /> :
                <Options
                    settings={editedCharacter.config}
                    editable={editable}
                    changeOptions={changeOptions}
                />
            case 5: return <Options
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

    return (
        <ThemeProvider theme={theme}>
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
                                    edited={edited}
                                    save={save} />
                            </Grid>
                            <Tabs
                                variant="scrollable"
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
                </div>
            </Slide>
        </ThemeProvider>
    );
}

export default connect(mapStateToProps)(CharacterProfile);