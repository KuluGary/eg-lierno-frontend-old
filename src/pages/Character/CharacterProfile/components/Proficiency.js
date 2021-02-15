import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    root: {
        height: "100%",
        width: "100%"
    },
    paper: {
        // margin: "0 .2rem .2rem .2rem",
        height: "100%",
        // margin: ".2rem .1rem",
        padding: ".2rem",
        display: "flex",
        flexDirection: "row",
        // justifyContent: 'center',
        alignItems: 'center',
    },
    stat: {
        display: "flex",
        alignItems: "center",
        width: "100%"
        // justifyContent: "space-between"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    resize: {
        fontSize: 14,
        textAlign: 'center'
    },
    textField: {
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },
        width: "25%",

        "& input[type=number]": {
            "-moz-appearance": "textfield"
        }
    }
});

export default function Proficiency(props) {
    const classes = useStyles();

    useEffect(() => {

    }, [])

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