import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { addCharacters, addProfile } from "../../shared/actions/index";
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Api from "../../helpers/api";
import CharacterTable from "./components/CharacterTable";

const mapStateToProps = state => {
    return {
        characters: state.characters,
        profile: state.profile,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCharacters: characters => dispatch(addCharacters(characters)),
        addProfile: profile => dispatch(addProfile(profile))
    };
}

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
            {value === index && <Box>{children}</Box>}
        </Typography>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CharacterScreen(props) {
    const [characters, setCharacters] = useState([]);
    const [profile, setProfile] = useState([]);
    const [setPage] = useState(0);
    const [setRowsPerPage] = useState(5);
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        if (!props.characters) {
            Api.fetchInternal('/characters')
                .then(res => {
                    props.addCharacters(res);
                    setCharacters(res)
                })
        } else {
            setCharacters(props.characters);
        }

        if (!props.profile) {
            Api.fetchInternal('/auth/me')
                .then(res => {
                    props.addProfile(res);
                    setProfile(res)
                })
        } else {
            setProfile(props.profile)
        }
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            {characters &&
                <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                    <Paper variant="outlined">
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Mis Personajes" {...a11yProps(0)} />
                            <Tab label="Personajes de mis Campañas" {...a11yProps(1)} />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            {(characters && profile) && characters.length > 0 &&
                                <CharacterTable
                                    characters={characters.filter(character => character.player === profile._id)}
                                    profile={profile}
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                                    history={props.history} />
                            }
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            {(characters && profile) && characters.length > 0 &&
                                <CharacterTable
                                    characters={characters.filter(character => character.player !== profile._id)}
                                    profile={profile}
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                                    history={props.history} />
                            }
                        </TabPanel>

                    </Paper>
                </Slide>}
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterScreen);