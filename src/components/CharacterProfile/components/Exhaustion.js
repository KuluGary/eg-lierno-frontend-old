import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    root: {
        height: "100%",
        // margin: "0 .1rem .2rem .1rem",
        margin: ".1rem"
    },
    paper: {
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 21,
        textAlign: 'center',
    },
    textField: {
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        }
    }
});



export default function Exhaustion(props) {
    const classes = useStyles();
    const exhaustion = props.exhaustion || {};
    let totalExhaustion = 0;

    Object.values(exhaustion).forEach(value => totalExhaustion += parseInt(value));

    useEffect(() => {

    }, [])

    return (
        <div className={classes.root}>
            <Paper variant="outlined" style={{
                width: "100%", padding: "1rem",
                margin: "0 .1rem .2rem 0", height: "100%"
            }}>
                <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle2" style={{ fontSize: '11px' }}>{'EXHAUSTO'}</Typography>
                </Box>
                <Box style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>
                    <Box component="span" className={classes.stat} >
                        {/* <Typography variant="h6">{'1'}</Typography> */}
                        <TextField
                            type="number"
                            disabled={!props.editable}
                            className={classes.textField}
                            value={exhaustion.base || 0}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                                inputProps: { min: 0 }
                            }}
                            onChange={(event) => props.changeStats("exhaustion", { ...props.exhaustion, base: event.target.value })} />
                        <Typography variant="subtitle2" style={{ fontSize: '8px', opacity: .5 }}>{'BASE'}</Typography>
                    </Box>
                    <Box component="span" className={classes.stat} >
                        {/* <Typography variant="h6">{'+1'}</Typography> */}
                        <TextField
                            type="number"
                            disabled={!props.editable}
                            className={classes.textField}
                            value={exhaustion.wounds || 0}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                                inputProps: { min: 0 },
                                startAdornment: exhaustion.wounds > 0 ? "+" : ''
                            }}
                            onChange={(event) => props.changeStats("exhaustion", { ...props.exhaustion, wounds: event.target.value })} />
                        <Typography variant="subtitle2" style={{ fontSize: '8px', opacity: .5 }}>{'HERIDAS'}</Typography>
                    </Box>
                    <Box component="span" className={classes.stat} >
                        {/* <Typography variant="h6">{'+2'}</Typography> */}
                        <TextField
                            type="number"
                            disabled={!props.editable}
                            className={classes.textField}
                            value={exhaustion.condition || 0}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                                inputProps: { min: 0 },
                                startAdornment: exhaustion.condition > 0 ? "+" : ''
                            }}
                            onChange={(event) => props.changeStats("exhaustion", { ...props.exhaustion, condition: event.target.value })} />
                        <Typography variant="subtitle2" style={{ fontSize: '8px', opacity: .5 }}>{'CONDICIÓN'}</Typography>
                    </Box>
                    <Box component="span" className={classes.stat}>
                        <Typography variant="h6">{totalExhaustion}</Typography>
                        <Typography variant="subtitle2" style={{ fontSize: '8px', opacity: .5 }}>{'TOTAL'}</Typography>
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}