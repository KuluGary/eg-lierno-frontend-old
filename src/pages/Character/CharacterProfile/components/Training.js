import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    root: {
        // height: "100%"
        // margin: ".1rem 0 .1rem .1rem",
    },
    paper: {
        padding: ".4rem 0",
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        // alignSelf: "stretch"    ,
    },
    stat: {
        // margin: "0 1.5rem",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: 'start',
        width: "100%"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    }
});

export default function Training(props) {
    const classes = useStyles();

    useEffect(() => {

    }, [])

    const radios = [];

    for (let index = 0; index <= 5; index++) {
        radios.push(
            <Radio
                size="small"
                style={{ padding: 0 }}
                color="default"
                disabled={!props.editable}
            />)

    }

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Typography variant="subtitle2" style={{ fontSize: "11px", marginRight: ".5rem" }} >{'ENTRENAMIENTO'}</Typography>
                    <Box style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        {radios}
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}