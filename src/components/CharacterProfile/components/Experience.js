import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    root: {
        // height: "100%"
        margin: ".1rem 0 .1rem .1rem",
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
        justifyContent: 'start',
        width: "100%"      
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    }
});

export default function Experience(props) {
    const classes = useStyles();

    useEffect(() => {

    }, [])

    

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Typography variant="subtitle2" style={{ fontSize: "11px", marginRight: ".5rem" }} >{'EXPERIENCIA'}</Typography>
                    <Box>
                        <TextField
                            disabled={!props.editable} />
                    </Box>
                </Box>                
            </Paper>
        </div>
    );
}