import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import useStyles from './Proficiency.styles';

export function Proficiency(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <TextField
                        type="number"
                        className={classes.textField}
                        disabled={true}
                        value={props.proficiency}
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            }
                        }}
                        onChange={(event) => props.changeStats("proficiencyBonus", parseInt(event.target.value))}
                    />
                    <Typography style={{ marginLeft: "1rem", fontSize: "11px" }}>{'BONO DE PROFICIENCIA'}</Typography>
                </Box>
            </Paper>
        </div>
    );
}