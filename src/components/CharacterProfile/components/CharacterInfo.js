import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    root: {
        height: "100%"
    },
    paper: {
        margin: 0,
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        height: "100%"
    },
    info: {
        margin: "0 1rem"
    },
    stat: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        maxWidth: "20%",
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

export default function CharacterInfo(props) {
    const classes = useStyles();
    const { name, image, race, subrace, alignment, background, charClass } = props;

    useEffect(() => {

    }, [])

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Avatar alt={name} src={image} />
                <Box className={classes.info}>
                    <Box>
                        <Typography variant="h6">
                            {name}
                        </Typography>
                    </Box>
                    <Box>
                        {subrace + ' ' + race + ','}
                        {" " + background + " " + alignment + ", "}
                        {charClass.map(charClass => <span>{" " + charClass["class-name"] + " " + charClass["class-level"]}</span>)}
                    </Box>
                    <Box>
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}