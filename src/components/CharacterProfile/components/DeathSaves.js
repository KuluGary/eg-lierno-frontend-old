import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles({
    root: {
        height: "100%",
        // marginLeft: ".1rem",
        // marginBottom: ".2rem",
        display: "flex",
        // margin: ".1rem"
        // marginTop: ".2rem"
        // padding: ".1rem",
        // marginLeft: ".1rem",
        // paddingTop: ".2rem",
        // paddingRight: ".1rem",

    },
    paper: {
        padding: "1rem",
        // margin: "0 .1rem .2rem .1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        width: "100%",
        // marginBottom: ".1rem"
    },
    stat: {
        // margin: "0 1.5rem",
        textAlign: "center"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    }
});

export default function DeathSaves(props) {
    const classes = useStyles();
    const [checked, setChecked] = useState([]);
    const [interacted, setInteracted] = useState(false)

    useEffect(() => {
        if (props.deathSaves !== checked.length && interacted) {
            props.changeStats("death_saves", checked.length)
        }
    }, [checked])

    useEffect(() => {
        if (props.deathSaves > 0) {
            const checkedFaux = [];
            for (let index = 0; index < (props.deathSaves ? props.deathSaves : 0); index++) {
                checkedFaux.push(index);
            }
            
            setChecked(checkedFaux)
        }
    }, [props.deathSaves])

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
                    <Box style={{ display: "flex" }}>
                        {radios}
                    </Box>
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'FALLOS DE MUERTE'}</Typography>
                </Box>
            </Paper>
        </div>
    );
}