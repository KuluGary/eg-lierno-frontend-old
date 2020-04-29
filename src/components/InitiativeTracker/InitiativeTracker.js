import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import AddIcon from '@material-ui/icons/Add';
import Slide from '@material-ui/core/Slide';
import Api from "../../helpers/api";
import { useWidth } from "../../helpers/media-query";
import { StringUtil } from "../../helpers/string-util";

const useStyles = makeStyles({
    root: {
        // maxWidth: "80%",
        height: "100%",
        // width: "95%"

    },
    paper: {
        margin: "1rem 0",
        padding: "1rem",
        height: "100%"
    },
    input: {
        margin: "0 1rem",
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    smallCell: {
        width: "10%"
    },
    table: {
        width: "100%"
    }
});

export default function InitiativeTracker(props) {
    const classes = useStyles();
    const [combatants, setCombatant] = useState([]);
    const [name, setName] = useState('');
    const [initiative, setInitiative] = useState('');
    const [hp, setHp] = useState('');
    const [ac, setAc] = useState('');
    const [characters, setCharacters] = useState([])
    const width = useWidth();

    useEffect(() => {
        const url = Api.getKey('base_url') + '/characters';

        Api.fetchInternal('/characters')
            .then(res => setCharacters(res))
    }, [])

    function passTurn() {
        let newCombatants = [...combatants]

        newCombatants.push(newCombatants.shift());

        setCombatant([...newCombatants])
    }

    function removeItem(i) {
        let newCombatants = [...combatants]
        newCombatants.splice(i, 1);
        setCombatant([...newCombatants])
    }

    function addCombatant(combatant = null) {
        if (combatant) {
            const newCombatant = {
                name: combatant.character_name,
                ac: combatant.ac,
                initiative: initiative ? initiative : StringUtil.getRandomInt() + combatant.initiative_bonus,
                hp: hp ? hp
                    : combatant.hp.hp_current
                        ? combatant.hp.hp_current
                        : combatant.hp.hp_max
            }

            if (combatants.length === 0) {
                setCombatant([newCombatant])
            }
        } else {
            const newCombatant = { name, ac, initiative, hp }

            if (combatants.length === 0) {
                setCombatant([newCombatant])
            } else {
                let newCombatants = [...combatants];

                newCombatants.push(newCombatant)
                newCombatants.sort((a, b) => (parseInt(a.initiative) > parseInt(b.initiative)) ? -1 : 1)

                setCombatant(newCombatants);

            }
        }
    }

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <div className={classes.root}>
                <Paper variant="outlined" className={classes.paper}>
                    <Box className={classes.box}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>AC</TableCell>
                                    <TableCell align="center">Initiative</TableCell>
                                    <TableCell align="center">HP</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {characters && characters.map((char, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {char.character[0].character_name}
                                        </TableCell>
                                        <TableCell>
                                            {char.character[0].ac}
                                        </TableCell>
                                        <TableCell className={classes.smallCell}>
                                            <TextField
                                                onChange={(e) => setInitiative(e.target.value)}
                                                className={classes.input}
                                                placeholder={(width !== "xs" && width !== "sm") && char.character[0].initiative_bonus.toString()}
                                                id="initiative"
                                                name="initiative"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </TableCell>
                                        <TableCell className={classes.smallCell}>
                                            <TextField
                                                onChange={(e) => setHp(e.target.value)}
                                                className={classes.input}
                                                defaultValue={
                                                    char.character[0].hp.hp_current ?
                                                        char.character[0].hp.hp_current :
                                                        char.character[0].hp.hp_max}
                                                id="initiative"
                                                name="initiative"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => addCombatant(char.character[0])}>
                                                {(width !== "xs" && width !== "sm") ? 'ADD COMBATANT' : <AddIcon />}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            onChange={(e) => setName(e.target.value)}
                                            label={(width !== "xs" && width !== "sm") && "Name"}
                                            id="name"
                                            name="name"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell className={classes.smallCell}>
                                        <TextField
                                            onChange={(e) => setAc(e.target.value)}
                                            label={(width !== "xs" && width !== "sm") && "AC"}
                                            id="ac"
                                            name="ac"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell className={classes.smallCell}>
                                        <TextField
                                            onChange={(e) => setInitiative(e.target.value)}
                                            label={(width !== "xs" && width !== "sm") && "Init"}
                                            id="init"
                                            name="init"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell className={classes.smallCell}>
                                        <TextField
                                            onChange={(e) => setHp(e.target.value)}
                                            label={(width !== "xs" && width !== "sm") && "HP"}
                                            id="hp"
                                            name="hp"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => addCombatant(null)}>
                                            {(width !== "xs" && width !== "sm") ? 'ADD CUSTOM COMBATANT' : <AddIcon />}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
                </Paper>

                {combatants.length > 0 &&
                    <Paper variant="outlined" className={classes.paper}>
                        <Button
                            onClick={passTurn}>
                            Next turn
                            <SkipNextIcon />
                        </Button>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>AC</TableCell>
                                    <TableCell>Initiative</TableCell>
                                    <TableCell>HP</TableCell>
                                    <TableCell>Notes</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {combatants.map((combatant, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {combatant.name}
                                        </TableCell>
                                        <TableCell className={classes.smallCell}>
                                            {combatant.ac}
                                        </TableCell>
                                        <TableCell className={classes.smallCell}>
                                            {combatant.initiative}
                                        </TableCell>
                                        <TableCell className={classes.smallCell}>
                                            <TextField
                                                defaultValue={combatant.hp}
                                                variant="outlined"
                                                fullWidth />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id="outlined-multiline-static"
                                                label="Notes"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </TableCell>
                                        <TableCell className={classes.smallCell}>
                                            <Button onClick={() => removeItem(index)}>
                                                <RemoveCircleIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>}
            </div>
        </Slide>
    );
}