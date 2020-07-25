import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useWidth } from "../../../helpers/media-query";

const useStyles = makeStyles({
    root: {
        height: "100%"
    },
    paper: {
        margin: 0,
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        height: "100%"
    },
    stat: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        // maxWidth: "30%",
        alignItems: "center"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    buttonFont: {
        fontSize: ".7rem"
    },
    button: {
        padding: ".3rem"
    },
    input: {
        padding: "0px 14px",
        width: "100%",        
        margin: ".5rem",
    }
});

export default function Proficiency(props) {
    const classes = useStyles();
    const width = useWidth();

    useEffect(() => {

    }, [])

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                {/* {(width !== "xs") &&
                <Box component="span" className={classes.stat}>
                    <Button variant="contained" color="secondary" className={classes.button}>
                        <Typography className={classes.buttonFont}>
                            CURAR
                        </Typography>
                    </Button>
                    <input className={classes.input} />
                    <Button variant="contained" color="secondary" className={classes.button}>
                        <Typography className={classes.buttonFont}>
                            DAÑAR
                        </Typography>
                    </Button>
                </Box>
                } */}
                <Box component="span" className={classes.stat}>
                    <Typography variant="subtitle2">{'PUNTOS DE'}</Typography>
                    <Typography variant="h6">{props.hp.hp_current ? props.hp.hp_current : props.hp.hp_max}</Typography>
                    <Typography variant="subtitle2">{'VIDA'}</Typography>
                </Box>
                {/* <Box component="span" className={classes.stat}>
                    <Typography variant="subtitle2">{'MÁX'}</Typography>
                    <Typography variant="h6">{props.hp.hp_max}</Typography>
                </Box> */}
                {/* <Box component="span" className={classes.stat}>
                    <Typography variant="subtitle2">{'TEMP'}</Typography>
                    <Typography variant="h6">{props.hp.hp_temp ? props.hp.hp_temp : '-'}</Typography>
                </Box> */}
            </Paper>
        </div>
    );
}