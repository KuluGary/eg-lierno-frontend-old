import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { Select, MenuItem, Table, TableBody, TableRow, TableCell, IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles({
    root: {
        height: "100%",
        // margin: "0 .1rem .2rem .1rem",
        margin: ".1rem",
        width: "100%",
        paddingTop: ".1rem"
    },
    paper: {
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        height: "100%",
        width: "100%"
    },
    stat: {
        margin: "0 1.5rem",
        textAlign: "center",
        width: "100%"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    resize: {
        fontSize: 11
    },
});

export default function Afflictions(props) {
    const classes = useStyles();
    const [afflictions, setAfflictions] = useState([]);
    const [interacted, setInteracted] = useState(false)

    const options = [
        {
            name: "Ansioso",
            description: "Desventaja en tiradas contra el estrés"
        },
        {
            name: "Valiente",
            description: "Ventaja en tiradas de carisma"
        },
        {
            name: "Temeroso",
            description: "Desventaja en tiradas de sabiduría"
        },
        {
            name: "Concentrado",
            description: "+2 a las tiradas de ataque"
        },
        {
            name: "Desesperanzado",
            description: "Desventaja en tiradas de fuerza"
        },
        {
            name: "Hipocondríaco",
            description: "Los puntos de vida máximos son reducidos a la mitad"
        },
        {
            name: "Irracional",
            description: "Desventaja en tiradas de inteligencia"
        },
        {
            name: "Letárgico",
            description: "+1 punto de exhausto"
        },
        {
            name: "Manía",
            description: "Desventaja en tiradas de ataque"
        },
        {
            name: "Masoquista",
            description: "Desventaja en tiradas de constitución"
        },
        {
            name: "Narcisista",
            description: "Desventaja en tiradas de habilidad"
        },
        {
            name: "Pánico",
            description: "Desventaja en tiradas de destreza"
        },
        {
            name: "Paranoide",
            description: "La velocidad es reducida a la mitad"
        },
        {
            name: "Perceptivo",
            description: "Ventaja en tiradas de sabiduría"
        },
        {
            name: "Poderoso",
            description: "+2 a las tiradas de daño"
        },
        {
            name: "Egoísta",
            description: "Desventaja en tiradas de carisma"
        },
        {
            name: "Leal",
            description: "Ventaja en tiradas de consitución"
        }
    ]

    useEffect(() => {
        if (!Object.is(props.afflictions, afflictions) && interacted) {
            props.changeStats("afflictions", afflictions)
        }

    }, [afflictions])

    const addAffliction = () => {
        setAfflictions([...afflictions, options[0]["name"]])
        setInteracted(true);
    }

    const changeAffliction = (event, index) => {
        let newItems = [...afflictions];

        newItems[index] = event.target.value;

        setAfflictions(newItems);
        setInteracted(true);
    }

    const removeAffliction = (index) => {
        let newItems = [...afflictions];

        newItems.splice(index, 1);

        setAfflictions(newItems)
        setInteracted(true);
    }

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Typography variant="subtitle2" style={{ fontSize: "8px" }} >{'AFLICCIONES'}</Typography>
                    <Divider style={{ margin: ".3rem 0" }} />
                    <Table size="small">
                        <TableBody>
                            {afflictions.map((affliction, index) => (
                                <TableRow>
                                    <TableCell>
                                        <Select
                                            onChange={(event) => changeAffliction(event, index)}
                                            disabled={!props.editable}
                                            inputProps={{
                                                classes: {
                                                    select: classes.resize,
                                                },
                                            }}
                                            value={affliction}>
                                            {options.map((item, index) => (
                                                <MenuItem value={item.name} style={{ fontSize: 11 }}>{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: 11 }}>
                                            {options[options.findIndex(option => option.name === affliction)].description}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {props.editable &&
                                            <IconButton onClick={() => removeAffliction(index)}>
                                                <CancelIcon fontSize="small" />
                                            </IconButton>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Box style={{ float: "left" }}>
                        {props.editable &&
                            <Button variant="outlined" onClick={addAffliction}>
                                <Typography variant="subtitle2" style={{ fontSize: "8px", textAlign: "left" }} >
                                    {'+ Añadir'}
                                </Typography>
                            </Button>
                        }
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}