import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles({
    root: {
        // height: "97%",
        // margin: "0 .1rem .2rem .1rem",
        margin: ".1rem",
        padding: ".1rem 0",
        height: "100%",
        width: "100%"
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
        margin: "0 1.5rem",
        textAlign: "center",
        width: "100%"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    label: {
        fontSize: 11
    }
});

export default function ExhaustionEffects(props) {
    const classes = useStyles();
    const [options, setOptions] = useState([
        'Ninguno',
        'Desventaja en tiradas de Habilidad',
        'Velocidad reducida a la mitad',
        'Máximo de puntos de vida reducidos a la mitad',
        'Velocidad reducida a 0',
        'Muerte'
    ]);
    const [selectedOption, setSelectedOption] = useState(0);


    useEffect(() => {

    }, [])

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    {/* <Typography variant="subtitle2">{'BONO DE'}</Typography> */}
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'EFECTOS DE EXHAUSTO'}</Typography>
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
                                <FormControlLabel
                                    classes={{
                                        label: classes.label
                                    }}
                                    // onClick={() => setSelectedOption(index)}
                                    control={
                                        <Radio
                                            size="small"
                                            color="default"
                                            checked={exhaustionLevel === index}
                                        />}
                                    label={option} />
                            )
                        })}
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}