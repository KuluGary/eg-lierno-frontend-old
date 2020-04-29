import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Api from "../../helpers/api";

import CharacterInfo from "./components/CharacterInfo";
import Information from './tabs/Information';
import Background from './tabs/Background';
import Features from './tabs/Features';
import Items from "./tabs/Items";

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles({
    container: {
        maxWidth: "45vw"
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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

export default function CharacterProfile(props) {
    const classes = useStyles();
    const [character, setCharacter] = useState();
    const [categories, setCategories] = useState(["Información", "Trasfondo", "Rasgos", "Raza", "Objetos", "Hechizos"]);
    const [selectedCategory, setSelectedCategory] = useState(0);

    useEffect(() => {
        const url = Api.getKey('base_url') + '/characters/' + props.match.params.id;

        Api.fetchInternal('/characters')
            .then(res => setCharacter(res['character'][0]))
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
            case 1: return <Background character={character.characteristics[0]} img={character.image_url} />
            case 2: return <Features features={character.traits} />
            case 4: return <Items items={character.equipment} />
        }
    }

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <div className={classes.root}>
                {character &&
                    <>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <CharacterInfo
                                    name={character["character_name"]}
                                    image={character["image_url"]}
                                    race={character["race"]}
                                    subrace={character["subrace"]}
                                    alignment={character["alignment"]}
                                    background={character["background"]}
                                    charClass={character["classes"]} />
                            </Grid>
                            <Tabs
                                variant="scrollable"
                                value={selectedCategory}
                                onChange={handleChange}
                                aria-label="simple tabs example">
                                {categories.map((category, index) => (
                                    <Tab key={index} label={category} {...a11yProps(category)} />
                                ))}
                            </Tabs>
                            {tabData()}
                        </Grid>
                    </>
                }
            </div>
        </Slide>
    );
}