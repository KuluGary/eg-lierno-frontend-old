import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    root: {
        // height: "100%"
        // margin: "0 .1rem .2rem .1rem",
        margin: ".1rem",
        marginTop: 0,
    },
    paper: {
        // padding: "1rem",
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        // alignSelf: "stretch"    ,
    },
    stat: {
        margin: "0 1.5rem",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: 'space-between',
        width: "100%"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    }
});

export default function Fate(props) {
    const classes = useStyles();
    const [checked, setChecked] = useState([]);    
    const [interacted, setInteracted] = useState(false)

    useEffect(() => {
         if (props.fatePoints !== checked.length && interacted) {
             props.changeStats("fate_points", checked.length)
         }
    }, [checked])

    useEffect(() => {
        if (props.fatePoints > 0) {

            const checkedFaux = [];
            for (let index = 0; index < (props.fatePoints ? props.fatePoints : 0); index++) {
                checkedFaux.push(index);
            }
            
            setChecked(checkedFaux)
        }
    }, [props.fatePoints])

    const interact = (index) => {
        checked.includes(index) ? setChecked(checked.filter(item => item !== index)) : setChecked([...checked, index])
        setInteracted(true)
    }

    const radios = [];

    for (let index = 0; index < 3; index++) {
        radios.push(
            <Radio
                color="default"
                disabled={!props.editable}
                checked={checked.includes(index)}
                onClick={() => interact(index)} />
        )
    }

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Typography variant="subtitle2" style={{ fontSize: "14px" }} >{'DESTINO'}</Typography>
                    <Box>
                        {radios}
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}