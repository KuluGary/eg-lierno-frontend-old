import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
    root: {
        height: "100%",
        // margin: "0 .1rem .1rem .1rem",
        margin: ".1rem",
        width: "100%"
    },
    paper: {
        padding: "1rem",
        //display: "flex",
        // flexDirection: "row",
        // justifyContent: 'center',
        // alignItems: 'center',
        // // alignSelf: "stretch"    ,
        height: "100%"
    },
    stat: {
        margin: "0 1.5rem",
        textAlign: "center"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    }
});

export default function StressLevels(props) {
    const classes = useStyles();

    useEffect(() => {

    }, [])

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box>
                    <Typography variant="subtitle2" style={{ fontSize: "8px", textAlign: "center" }} >{'NIVELES DE ESTRÉS'}</Typography>
                </Box>
                <Divider style={{ margin: ".5rem 0" }} />
                <Box style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'20: Aflicción'}</Typography>
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'30: Aflicción'}</Typography>
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'35: Aflicción'}</Typography>
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'40: Ruptura'}</Typography>
                </Box>
                {/* <Box component="span" className={classes.stat}>
                    <Typography variant="h6">{'13'}</Typography>
                    {/* <Box style={{ display: "flex" }}>
                        <Radio /><Radio /><Radio />
                    </Box> */}
                {/* <Typography variant="subtitle2" style={{ fontSize: "8px" }} >{'ESTRÉS'}</Typography>
                </Box> */}
            </Paper>
        </div>
    );
}