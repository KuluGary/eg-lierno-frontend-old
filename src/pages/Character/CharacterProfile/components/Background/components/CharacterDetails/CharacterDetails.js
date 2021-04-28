import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Table, TableBody, TableCell, TableRow, TextField } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { StringUtil } from "helpers/string-util";
import useStyles from "./CharacterDetails.styles";

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

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Box className={classes.header}>
                        <Box className={classes.subtitleContainer}>
                            <Typography
                                variant="subtitle2"
                                className={classes.subtitle}>
                                {'DETALLES DEL PERSONAJE'}
                            </Typography>
                        </Box>
                        <Divider className={classes.divider} />
                    </Box>
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