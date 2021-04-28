import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import useStyles from './Personality.styles';

export default function Personality(props) {
    const classes = useStyles();

    return (
        <>
            <Grid item lg={12} xs={12}>
                <Paper variant="outlined" className={classes.paper}>
                    <Box component="span" className={classes.stat}>
                        <TextField
                            fullWidth
                            multiline
                            variant="outlined"
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                            }}
                            label="Rasgos de personalidad"
                            disabled={!props.editable}
                            value={props.traits.personalityTraits}
                            onChange={(event) => props.changeFlavor("personality", { ...props.traits, personalityTraits: event.target.value })}
                        />
                    </Box>
                </Paper>
            </Grid>
            <Grid item lg={12} xs={12}>
                <Paper variant="outlined" className={classes.paper}>
                    <Box component="span" className={classes.stat}>
                        <TextField
                            fullWidth
                            multiline
                            variant="outlined"
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                            }}
                            label="Ideales"
                            disabled={!props.editable}
                            value={props.traits.ideals}
                            onChange={(event) => props.changeFlavor("personality", { ...props.traits, ideals: event.target.value })}
                        />
                    </Box>
                </Paper>
            </Grid>
            <Grid item lg={12} xs={12}>
                <Paper variant="outlined" className={classes.paper}>
                    <Box component="span" className={classes.stat}>
                        <TextField
                            fullWidth
                            multiline
                            variant="outlined"
                            label="Vínculos"
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                            }}
                            disabled={!props.editable}
                            value={props.traits.bonds}
                            onChange={(event) => props.changeFlavor("personality", { ...props.traits, bonds: event.target.value })}
                        />
                    </Box>
                </Paper>
            </Grid>
            <Grid item lg={12} xs={12}>
                <Paper variant="outlined" className={classes.paper} style={{ marginBottom: 0 }}>
                    <Box component="span" className={classes.stat}>
                        <TextField
                            fullWidth
                            multiline
                            variant="outlined"
                            label="Defectos"
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                            }}
                            disabled={!props.editable}
                            value={props.traits.flaws}
                            onChange={(event) => props.changeFlavor("personality", { ...props.traits, flaws: event.target.value })}
                        />
                    </Box>
                </Paper>
            </Grid>
        </>
    );
}