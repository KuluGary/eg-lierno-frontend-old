import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Api from "../../helpers/api";

import CharacterInfo from "./components/CharacterInfo";
import Information from './tabs/Information';
import Background from './tabs/Background';
import Features from './tabs/Features';
import Items from "./tabs/Items";
import Race from "./tabs/Race";
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

const mapStateToProps = state => {
    return { characters: state.characters }
}

function CharacterProfile(props) {
    const classes = useStyles();
    const [character, setCharacter] = useState();
    const [categories, setCategories] = useState([]);
    console.log(character && character.stats.spells.length, categories)
    const [selectedCategory, setSelectedCategory] = useState(0);

    useEffect(() => {
        if (!props.characters) {
            Api.fetchInternal('/characters/' + props.match.params.id)
                .then(res => {
                    setCharacter(res)
                    setCategories(["Información", "Trasfondo", "Rasgos", "Raza", "Objetos", (res && res.stats.spells.length > 0) && "Hechizos"].filter(el => el))
                })
        } else {
            const selectedCharacter = props.characters.filter(character => character._id === props.match.params.id)[0];
            selectedCharacter && setCharacter(selectedCharacter)
            setCategories(["Información", "Trasfondo", "Rasgos", "Raza", "Objetos", (selectedCharacter && selectedCharacter.stats.spells.length > 0) && "Hechizos"].filter(el => el))
        }
    }, [])

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setSelectedCategory(newValue);
    }

    function tabData() {
        switch (selectedCategory) {
            case 0: return <Information character={character} />
            case 1: return <Background character={character.flavor} />
            case 2: return <Features features={character.stats} />
            case 3: return <Race raceId={character.stats.race} subraceIndex={character.stats.subrace} />
            case 4: return <Items items={character.stats.equipment} />
            case 5: return (character && character.stats.spells.length > 0) ? <Spells spellIds={character.stats.spells} /> : null
        }
    }

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <div className={classes.root}>
                {character &&
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <CharacterInfo
                                name={character["name"]}
                                image={character.flavor.imageUrl}
                                race={character.stats.race}
                                subrace={character.stats.subrace}
                                alignment={character.stats.alignment}
                                background={character.flavor.background}
                                charClass={character.stats.classes} />
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
    );
}

export default connect(mapStateToProps)(CharacterProfile);