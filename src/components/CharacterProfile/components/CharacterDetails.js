import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Table, TableBody, TableCell, TableRow, TextField } from '@material-ui/core';
import { StringUtil } from "../../../helpers/string-util";

const useStyles = makeStyles({
    root: {
        height: "100%",
        // margin: "0 .1rem .2rem .1rem",
        // width: "100%"
    },
    paper: {
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        // alignItems: 'center',
        // alignSelf: "stretch"    ,
        height: "100%",
        width: "100%"
    },
    stat: {
        // margin: "0 1.5rem",
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
    cell: {
        padding: "0 .5rem",
        maxWidth: "4rem",
        marginRight: ".5rem"
    }
});

export default function CharacterDetails(props) {
    const classes = useStyles();
    const rows = [
        {
            label: "Nombre",
            key: "name"
        },
        {
            label: "Edad",
            key: "age"
        },
        {
            label: "Género",
            key: "gender"
        },
        {
            label: "Pronombre",
            key: "pronoun"
        },
        {
            label: "Altura",
            key: "height"
        },
        {
            label: "Peso",
            key: "weight"
        },
        {
            label: "Ojos",
            key: "eyes"
        },
        {
            label: "Pelo",
            key: "hair"
        },
        {
            label: "Piel",
            key: "skin"
        },
        {
            label: "Alineamiento",
            key: "alignment"
        },
    ]
    const pronounOptions = [
        "El",
        "La",
        "Le"
    ];

    const alignmentOptions = [
        StringUtil.generiza("Legal malo", "Legal mala", "Legal male", props.pronoun),
        StringUtil.generiza("Neutral malo", "Neutral mala", "Legal mala", props.pronoun),
        StringUtil.generiza("Caótico malo", "Caótica mala", "Caótica male", props.pronoun),
        "Legal neutral",
        "Neutral",
        StringUtil.generiza("Caótico neutral", "Caótica neutral", "Caótique neutral", props.pronoun),
        StringUtil.generiza("Legal bueno", "Legal buena", "Legal buene", props.pronoun),
        StringUtil.generiza("Neutral bueno", "Neutral buena", "Neutral buene", props.pronoun),
        StringUtil.generiza("Caótico bueno", "Caótica buena", "Caótique buene", props.pronoun)
    ]

    useEffect(() => {

    }, [])

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'DETALLES DEL PERSONAJE'}</Typography>
                    <Divider style={{ margin: "0" }} />
                    <Table size="small">
                        <TableBody>
                            {rows.map(row => (
                                <TableRow>
                                    <TableCell className={classes.cell}>
                                        <Typography style={{ fontSize: "11px", marginRight: ".5rem" }}>
                                            {row.label}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {row.key === "pronoun" ?
                                            <Select
                                                fullWidth
                                                value={props.traits.pronoun}
                                                disabled={!props.editable}
                                                style={{ fontSize: 11 }}
                                                onChange={(event) => props.changeFlavor("traits", { ...props.traits, [row.key]: event.target.value })}>
                                                {pronounOptions.map((pronoun) => (
                                                    <MenuItem value={pronoun}>{pronoun}</MenuItem>
                                                ))}
                                            </Select>
                                            : row.key === "alignment" ?
                                                <Select
                                                    fullWidth
                                                    value={props.features.alignment}
                                                    disabled={!props.editable}
                                                    style={{ fontSize: 11 }}
                                                    onChange={(event) => props.changeStats("alignment", event.target.value)}>
                                                     {alignmentOptions.map(item => <MenuItem value={item}>{item}</MenuItem>)}
                                                </Select>
                                                :
                                                <TextField
                                                    style={{ marginTop: ".4rem", width: "95%" }}
                                                    disabled={!props.editable}
                                                    value={props.traits[row.key]}
                                                    onChange={(event) => props.changeFlavor("traits", { ...props.traits, [row.key]: event.target.value })}
                                                    InputProps={{
                                                        classes: {
                                                            input: classes.resize,
                                                        },
                                                    }}>
                                                </TextField>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Paper>
        </div>
    );
}