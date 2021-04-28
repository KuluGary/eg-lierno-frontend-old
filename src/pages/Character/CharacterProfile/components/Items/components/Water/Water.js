import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import Box from '@material-ui/core/Box';
import useStyles from './Water.styles';

export function Water(props) {
    const classes = useStyles();
    const [checked, setChecked] = useState([]);
    const [interacted, setInteracted] = useState(false)

    useEffect(() => {
        if (props.waterskin !== checked.length && interacted) {
            props.changeStats("waterskin", checked.length)
        }
    }, [checked])

    useEffect(() => {
        if (props.waterskin) {
            const checkedFaux = [];
            for (let index = 0; index < (props.waterskin ? props.waterskin : 0); index++) {
                checkedFaux.push(index);
            }

            setChecked(checkedFaux)
        }

    }, [props.waterskin])

    const interact = (index) => {
        checked.includes(index) ? setChecked(checked.filter(item => item !== index)) : setChecked([...checked, index])
        setInteracted(true)
    }

    const radios = [];

    for (let index = 0; index < 10; index++) {
        radios.push(
            <Radio
                size="small"
                color="default"
                disabled={!props.editable}
                style={{ padding: "9px 0" }}
                checked={checked.includes(index)}
                onClick={() => interact(index)} />
        )
    }

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Typography variant="subtitle2" style={{ fontSize: "14px" }} >{'AGUA'}</Typography>
                    <Box>
                        {radios}
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}