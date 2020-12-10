import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    root: {
        height: "100%",
        display: "flex",
        marginTop: ".2rem"
    },
    paper: {
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        width: "100%",
        marginBottom:  ".1rem"
    },
    stat: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 .5rem"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    buttonFont: {
        fontSize: ".7rem"
    },
    button: {
        padding: ".3rem"
    },
    input: {
        padding: "0px 14px",
        width: "100%",
        margin: ".5rem",
    },
    resize: {
        fontSize: 21,
        textAlign: 'center',
    },
    textField: {
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },

        "& input[type=number]": {
            "-moz-appearance": "textfield"
        }
    }
});

export default function HitDice(props) {
    const classes = useStyles();

    let maxDice = 0;

    props.classes.forEach(charClass => maxDice += charClass.classLevel);

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper} style={{
                width: "100%", padding: ".5rem",
                margin: "0 .1rem .2rem .1rem",
                flexDirection: "column", justifyContent: "center",
                marginBottom: ".3rem"
            }}>
                <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle2" style={{ fontSize: '11px' }}>{'DADOS DE GOLPE'}</Typography>
                </Box>
                <Box style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>
                    <Box component="span" className={classes.stat} >
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
                                inputProps: { min: 0 }
                            }}></TextField>
                        <Typography variant="subtitle2" style={{ fontSize: '8px', opacity: .5 }}>{'DISPONIBLES'}</Typography>
                    </Box>
                    <Box component="span" className={classes.stat} style={{ width: "50%" }}>
                        <Typography variant="subtitle2" style={{ fontSize: 21 }}>{maxDice}</Typography>
                        <Typography variant="subtitle2" style={{ fontSize: '8px', opacity: .5 }}>{'MÁXIMOS'}</Typography>
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}