import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { addCharacters, addProfile } from "shared/actions/index";
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Api from "helpers/api";
import CharacterTable from "./components/CharacterTable";
import BackupIcon from '@material-ui/icons/Backup';
import character_template from "../../../assets/json/character_template.json";
import { DropzoneDialog } from 'material-ui-dropzone';
import { Divider } from '@material-ui/core';

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

function CharacterList(props) {
    const [characters, setCharacters] = useState([]);
    const [profile, setProfile] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleChars = async () => {
            let chars;
            if (!props.characters) {
                chars = await Api.fetchInternal('/characters');
                props.addCharacters(chars);

            } else {
                chars = props.characters;
            }

            const userIds = [];
            chars.forEach(char => !userIds.includes(char.player) && userIds.push(char.player));

            if (userIds.length > 0) {
                const users = await Api.fetchInternal('/auth/players', {
                    method: "POST",
                    body: JSON.stringify({ userIds })
                })

                chars = chars.map(char => {
                    const player = users?.players?.filter(user => user.id === char.player)[0]?.name;

                    return {
                        ...char,
                        player_name: player
                    }
                })
            }

            setCharacters(chars);

            if (!props.profile) {
                Api.fetchInternal('/auth/me')
                    .then(res => {
                        props.addProfile(res);
                        setProfile(res)
                    })
            } else {
                setProfile(props.profile)
            }
        }

        handleChars()
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

    const addCharacter = (character = null) => {
        let newCharacter;

        if (!character) {
            newCharacter = character_template;
        } else {
            newCharacter = { ...character };
            delete newCharacter._id;
            newCharacter.player = profile._id;
        }

        Api.fetchInternal('/characters', {
            method: "POST",
            body: JSON.stringify(newCharacter)
        })
            .then(id => {
                Api.fetchInternal('/characters')
                    .then(res => {
                        props.addCharacters(res);
                        setCharacters(res);

                        if (!character) {
                            props.history.push("/characters/" + id)
                        }
                    })
            });
    }

    const handleSave = (files) => {
        files.forEach(file => {
            const reader = new FileReader();
            reader.readAsText(file);

            reader.onload = (e) => {
                addCharacter(JSON.parse(e.target.result));
                handleToggle();
            }
        })
    }

    const deleteCharacter = (characterData) => {
        Api.fetchInternal('/characters/' + characterData, {
            method: "DELETE"
        })
            .then(() => {
                Api.fetchInternal('/characters')
                    .then(res => {
                        props.addCharacters(res);
                        setCharacters(res)
                    })
            })

    }

    const handleToggle = () => {
        setOpen(!open);
    }

    return (
        <>
            {characters &&
                <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                    <Paper variant="outlined">
                        <DropzoneDialog
                            open={open}
                            dropzoneText={'Arrastra un fichero de personaje'}
                            dialogTitle={'Sube un fichero de personaje'}
                            cancelButtonText={'Cancelar'}
                            submitButtonText={'Guardar'}
                            onSave={handleSave}
                            acceptedFiles={['application/JSON']}
                            maxFileSize={5000000}
                            onClose={handleToggle}
                        />
                        <Box style={{ display: "flex", justifyContent: "space-between" }}>
                            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                <Tab label="Mis Personajes" {...a11yProps(0)} />
                                <Tab label="Personajes de mis Campañas" {...a11yProps(1)} />
                            </Tabs>
                            <Box>
                                <IconButton
                                    onClick={handleToggle}>
                                    <BackupIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => addCharacter()}>
                                    <AddIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        <Divider />
                        <TabPanel value={value} index={0}>
                            {(characters && profile) && characters.length > 0 &&
                                <CharacterTable
                                    characters={characters.filter(character => character.player === profile._id)}
                                    profile={profile}
                                    page={page}
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                                    history={props.history}
                                    deleteCharacter={deleteCharacter}
                                    rowsPerPage={rowsPerPage}
                                    index={0} />
                            }
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            {(characters && profile) && characters.length > 0 &&
                                <CharacterTable
                                    characters={characters.filter(character => character.player !== profile._id)}
                                    profile={profile}
                                    page={page}
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                                    rowsPerPage={rowsPerPage}
                                    history={props.history}
                                    index={1} />
                            }
                        </TabPanel>

                    </Paper>
                </Slide>}
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterList);