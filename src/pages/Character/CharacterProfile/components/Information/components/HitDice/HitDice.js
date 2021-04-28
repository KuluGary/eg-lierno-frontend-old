import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { InputAdornment, Divider } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import useStyles from "./HitDice.styles";

export function HitDice(props) {
    const classes = useStyles();

    let maxDice = 0;

    props.classes.forEach(charClass => maxDice += charClass.classLevel);

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper} >
                <Box className={classes.header}>
                    <Box className={classes.subtitleContainer}>
                        <Typography
                            variant="subtitle2"
                            className={classes.subtitle}>
                            {"DADOS DE GOLPE"}
                        </Typography>
                    </Box>
                    <Divider className={classes.divider} />
                </Box>
                <Box className={classes.statContainer}>
                    <Box component="span" className={classes.stat} style={{ width: "50%" }} >
                        <TextField
                            type="number"
                            value={props.hitDice ? props.hitDice : maxDice}
                            disabled={!props.editable}
                            className={classes.textField}
                            onChange={(event) => props.changeStats("hit_dice", event.target.value)}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                                inputProps: { min: 0, max: maxDice },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FontAwesomeIcon icon={faDice} size="lg" />
                                    </InputAdornment>
                                )
                            }} />
                        <Typography variant="subtitle2" className={classes.subtitle}>{"DISPONIBLES"}</Typography>
                    </Box>
                    <Box component="span" className={classes.stat} style={{ width: "50%" }}>
                        <TextField
                            type="number"
                            disabled
                            value={maxDice}
                            className={classes.textField}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                                inputProps: { min: 0, max: maxDice }
                            }} />
                        <Typography variant="subtitle2" className={classes.subtitle}>{"MÁXIMOS"}</Typography>
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}