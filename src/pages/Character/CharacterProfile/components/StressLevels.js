import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { Table, TableBody, TableCell, TextField, TableRow, Select, MenuItem } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { useWidth } from 'helpers/media-query';

const useStyles = makeStyles({
    root: {
        // height: "100%",
        // margin: "0 .1rem .1rem .1rem",
        // margin: ".1rem",
        width: "100%",
        // marginBottom: ".5rem",
        height: "100%"
    },
    paper: {
        padding: "1rem",
        //display: "flex",
        // flexDirection: "row",
        // justifyContent: 'center',
        // alignItems: 'center',
        // // alignSelf: "stretch"    ,
        height: "100%"
    },
    stat: {
        margin: "0 1.5rem",
        textAlign: "center"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    resize: {
        fontSize: 11,
        textAlign: "center"
        // marginLeft: "1rem"
    },
    textField: {
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },
        maxWidth: "3rem",
        textAlign: "center",
        "& input[type=number]": {
            "-moz-appearance": "textfield"
        }
    }
});

const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const width = useWidth();

    return (
        <React.Fragment>
            <TableRow className={classes.root} style={{ width: width === "xs" ? "100%" : "95%" }}>
                <TableCell style={{ width: "5%" }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {/* {row.name} */}
                    <Select
                        onChange={(event) => props.changeAffliction(props.options[props.options.findIndex(obj => obj.name === event.target.value)], props.index)}
                        disabled={!props.editable}
                        inputProps={{
                            classes: {
                                select: classes.resize,
                            },
                        }}
                        value={row.name}>
                        {props.options.map((item, index) => (
                            <MenuItem value={item.name} style={{ fontSize: 11 }}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="body" gutterBottom component="div" style={{ fontSize: 11 }}>
                                {row.description}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function StressLevels(props) {
    const classes = useStyles();
    const stressBreakpoints = [10, 20, 30, 40];
    const afflictionOptions = [
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
        let newRows = [];

        stressBreakpoints.forEach((breakpoint, index) => {
            if (props.stress >= breakpoint) {
                if (!props.afflictions || !props.afflictions[index]) {
                    newRows[index] = afflictionOptions[0];
                } else {
                    newRows[index] = props.afflictions[index];
                }
            } else {
                delete newRows[index];
            }
        })
        props.changeStats("afflictions", newRows)
        // setRows(newRows);
    }, [props.stress])

    const changeAffliction = (affliction, index) => {
        const newRows = [...props.afflictions]
        newRows[index] = affliction;
        props.changeStats("afflictions", newRows);
    }

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box>
                    {/* <Typography variant="subtitle2" style={{ fontSize: "11px", textAlign: "center" }} >{'NIVELES DE ESTRÉS'}</Typography> */}
                    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'ESTRÉS'}</Typography>
                        <TextField
                            type="number"
                            disabled={!props.editable}
                            value={props.stress}
                            defaultValue={0}
                            className={classes.textField}
                            onChange={(event) => props.changeStats("stress", parseInt(event.target.value))}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                                inputProps: { min: 0, max: 40 }
                            }} />
                    </Box>
                </Box>
                <Divider style={{ margin: ".5rem 0" }} />
                <Table size="small">
                    {/* <TableHead>

                    </TableHead> */}
                    <TableBody>
                        {props.afflictions.map((row, index) => (
                            <Row 
                                key={row.name} 
                                row={row} 
                                options={afflictionOptions} 
                                editable={props.editable} 
                                index={index} 
                                changeAffliction={changeAffliction} />
                        ))}
                    </TableBody>
                </Table>
                {/* <Box style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'20: Aflicción'}</Typography>
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'30: Aflicción'}</Typography>
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'35: Aflicción'}</Typography>
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'40: Ruptura'}</Typography>
                </Box> */}
                {/* <Box component="span" className={classes.stat}>
                    <Typography variant="h6">{'13'}</Typography>
                    {/* <Box style={{ display: "flex" }}>
                        <Radio /><Radio /><Radio />
                    </Box> */}
                {/* <Typography variant="subtitle2" style={{ fontSize: "8px" }} >{'ESTRÉS'}</Typography>
                </Box> */}
            </Paper>
        </div>
    );
}