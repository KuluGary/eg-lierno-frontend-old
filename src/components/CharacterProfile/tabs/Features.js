import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        width: "100%"
    },
    paper: {
        margin: 0,
        padding: "1rem",
        height: "100%"
    },
    action: {
        margin: "1rem 0",
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    }
});

export default function Features(props) {
    const classes = useStyles();
    const { character } = props;

    useEffect(() => {

    }, [])

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="div" className={classes.stat}>
                    {props.features && props.features.bonus_actions && props.features.bonus_actions.map(action => {
                        return <Box className={classes.action}>{action.replace(/\n/g, <br />)}</Box>
                    })}
                </Box>
                <Box component="div" className={classes.stat}>
                    {props.features && props.features.other_traits && props.features.other_traits.map(action => {
                        return <Box className={classes.action}>{action.replace(/\n/g, <br />)}</Box>
                    })}
                </Box>
            </Paper>
        </div >
    );
}