import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Checkbox, TextField } from '@material-ui/core';
import useStyles from './ExhaustionEffects.styles';

export function ExhaustionEffects(props) {
    const classes = useStyles();
    const exhaustion = props.exhaustion || {};
    const [options] = useState([
        'Desventaja en tiradas de Habilidad',
        'Velocidad reducida a la mitad',
        'Máximo de puntos de vida reducidos a la mitad',
        'Velocidad reducida a 0',
        'Muerte'
    ]);

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'EFECTOS DE EXHAUSTO'}</Typography>
                        <TextField
                            type="number"
                            disabled={!props.editable}
                            className={classes.textField}
                            value={exhaustion.base || 0}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                                inputProps: { min: 0, max: 5 }
                            }}
                            onChange={(event) => props.changeStats("exhaustion", { ...props.exhaustion, base: event.target.value })} />
                    </Box>
                    <Divider style={{ margin: ".3rem 0" }} />
                    <Box style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                        {options.map((option, index) => {
                            let exhaustionLevel = 0;
                            if (props.exhaustion) {
                                if (props.exhaustion.base) {
                                    exhaustionLevel = parseInt(props.exhaustion.base);
                                }

                                if (props.exhaustion.wounds) {
                                    exhaustionLevel += parseInt(props.exhaustion.wounds);
                                }

                                if (props.exhaustion.condition) {
                                    exhaustionLevel += parseInt(props.exhaustion.condition)
                                }
                            }

                            return (
                                <>
                                    <FormControlLabel
                                        classes={{ label: classes.label }}
                                        control={
                                            <Checkbox
                                                size="small"
                                                color="default"
                                                checked={exhaustionLevel >= index + 1}
                                            />}
                                        label={option} />
                                    <Divider />
                                </>
                            )
                        })}
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}