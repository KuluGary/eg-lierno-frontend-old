import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { addAlignments, addCharacters } from "../../shared/actions/index";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';

import Row from "./components/Row";
import Api from "../../helpers/api";

const useStyles = makeStyles({
    root: {
        maxWidth: "80%",
    },
    paper: {
        padding: "2rem"
    },
    table: {
        width: "80%",
        height: "80%",
        margin: "0 auto",
        borderCollapse: "collapse"
    }
});

const mapStateToProps = state => {
    return { alignments: state.alignments, characters: state.characters }
}

const mapDispatchToProps = dispatch => {
    return { addAlignments: alignments => dispatch(addAlignments(alignments)), addCharacters: characters => dispatch(addCharacters(characters)) };
}

function AlignmentScreen(props) {
    const classes = useStyles();
    const [charactersState, setCharacters] = useState();
    const [characterSelected, setSelectedCharacter] = useState();
    const [alignments, setAlignments] = useState();

    useEffect(() => {
        if (!props.alignments) {
            Api.fetchInternal('/alignments').then(res => {
                setAlignments(res.simple)
                props.addAlignments(res.simple)
            })
        } else {
            setAlignments(props.alignments)
        }

        if (!props.characters) {
            Api.fetchInternal('/characters')
                .then(res => {
                    props.addCharacters(res)
                    let charas = []

                    res.forEach(chara => {
                        charas.push({ name: chara.character[0].character_name, alignment: chara.character[0].alignment_stat })
                    })
                    
                    setCharacters(charas);
                })
        } else {
            let charas = []

            props.characters.forEach(chara => {
                charas.push({ name: chara.character[0].character_name, alignment: chara.character[0].alignment_stat })
            })

            setCharacters(charas);
        }
    }, [])

    const changeAlignment = (c = null, a) => {
        let character = c ? c : characterSelected;
        character['alignment'] = a.stat;

        let indexOf = charactersState.findIndex(char => char.name === character.name);

        let characters = charactersState;
        characters[indexOf] = character;

        setCharacters([...characters])
    }

    const handleSelectedCharacter = (event) => {
        const indexOf = charactersState.findIndex(char => char.name === event.target.value)
        setSelectedCharacter(charactersState[indexOf])
    }

    return (
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <table className={classes.table} cellspacing="0">
                        <tbody>
                            {charactersState && alignments && alignments.map((row, index) => (
                                <Row
                                    key={index}
                                    characters={charactersState}
                                    row={index}
                                    alignments={row}
                                    changeAlignment={changeAlignment.bind(this)}
                                />
                            ))}
                        </tbody>
                    </table>
                    <div>
                        <RadioGroup aria-label="Characters" name="Characters" value={characterSelected} onChange={handleSelectedCharacter}>
                            {charactersState && charactersState.map(character => (
                                <FormControlLabel
                                    value={character.name}
                                    control={<Radio />}
                                    label={character.name} />
                            ))}
                        </RadioGroup>
                    </div>
                </Paper>
            </div>
        </Slide>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AlignmentScreen);