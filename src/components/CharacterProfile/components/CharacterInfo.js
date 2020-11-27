import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Api from '../../../helpers/api';
import SaveIcon from '@material-ui/icons/Save';
import ShareIcon from '@material-ui/icons/Share';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import { StringUtil } from "../../../helpers/string-util";

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
        justifyContent: "space-between",
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
    const { name, image, race, subrace, alignment, background, charClass, openDialog } = props;
    const [raceData, setRace] = useState();

    useEffect(() => {
        Api.fetchInternal('/race/' + race)
            .then(res => setRace(res))
    }, [props.race])

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box style={{ display: "flex", alignItems: "center" }}>
                    <Avatar alt={name} src={image} />
                    <Box className={classes.info}>
                        <Box>
                            <Typography variant="h6">
                                {name}
                            </Typography>
                        </Box>
                        <Box>
                            {raceData && (StringUtil.generizaClase(raceData.name, props.pronoun) + ',')}
                            {" " + (background.name ? background.name : "") + " " + (alignment ? alignment : "") + ", "}
                            {charClass.map((charClass, index) => <span key={index}>{" " + StringUtil.generizaClase(charClass["className"], props.pronoun) + " " + charClass["classLevel"] + (charClass["subclassName"] ? (" " + charClass["subclassName"]) : " ")}</span>)}
                        </Box>
                        <Box>
                        </Box>
                    </Box>
                </Box>
                <Box style={{ display: "flex" }}>
                    <IconButton onClick={openDialog}>
                        <ShareIcon />
                    </IconButton>
                    {props.edited &&
                        <Grow in={true} mountOnEnter unmountOnExit>
                            <Alert variant="filled" severity="warning" action={
                                <IconButton size="small" onClick={props.save}>
                                    <SaveIcon />
                                </IconButton>
                            }>
                                Tienes cambios sin guardar. Por favor, guarda antes de salir de la página.
                            </Alert>
                        </Grow>}
                </Box>
            </Paper>
        </div>
    );
}