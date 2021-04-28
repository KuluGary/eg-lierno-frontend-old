import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import { InputAdornment, Divider } from '@material-ui/core';
import useStyles from "./DeathSaves.styles";

export function DeathSaves(props) {
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
                size="small"
                color="default"
                disabled={!props.editable}
                checked={checked.includes(index)}
                onClick={() => interact(index)} />
        )

    }

    return (
        // <div className={classes.root}>
        //     <Paper variant="outlined" className={classes.paper}>
        //         <Box component="span" className={classes.stat}>
        //             <Box style={{ display: "flex" }}>
        //                 {radios}
        //             </Box>
        //             <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'FALLOS DE MUERTE'}</Typography>
        //         </Box>
        //     </Paper>
        // </div>
        <div className={classes.root}>
        <Paper variant="outlined" className={classes.paper}>
            <Box className={classes.header}>
                <Box className={classes.subtitleContainer}>
                    <Typography
                        variant="subtitle2"
                        className={classes.subtitle}>
                        {'FALLOS DE MUERTE'}
                    </Typography>
                </Box>
                <Divider className={classes.divider} />
            </Box>
            <Box component="span" className={classes.stat}>
            {radios}
            </Box>
        </Paper>
    </div>
    );
}