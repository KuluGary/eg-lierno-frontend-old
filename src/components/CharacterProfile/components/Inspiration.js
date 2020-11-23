import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    root: {
        // height: "100%"
        margin: ".1rem"
    },
    paper: {
        // padding: "1rem",
        display: "flex",
        flexDirection: "row",
        // justifyContent: '',
        alignItems: 'center',
        // alignSelf: "stretch"    ,
        height: "100%"
    },
    stat: {
        margin: "0 1.5rem",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    }
});

export default function Inspiration(props) {
    const classes = useStyles();
    const [checked, setChecked] = useState([]);
    const [interacted, setInteracted] = useState(false)

    useEffect(() => {
        if (props.inspiration !== checked.length && interacted) {
            props.changeStats("inspiration", checked.length)
        }
    }, [checked])

    useEffect(() => {
        if (props.inspiration > 0) {

            const checkedFaux = [];
            for (let index = 0; index < (props.inspiration ? props.inspiration : 0); index++) {
                checkedFaux.push(index);
            }

            setChecked(checkedFaux)
        }
    }, [props.inspiration])

    const radios = [];

    const interact = (index) => {
        checked.includes(index) ? setChecked(checked.filter(item => item !== index)) : setChecked([...checked, index])
        setInteracted(true)
    }

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
                    <Typography variant="subtitle2" style={{ fontSize: "14px" }} >{'INSPIRACIÓN'}</Typography>
                    <Box>
                        {radios}
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}