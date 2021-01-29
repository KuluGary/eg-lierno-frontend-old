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
import { useWidth } from '../../../helpers/media-query';
import GetAppIcon from '@material-ui/icons/GetApp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
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
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

export default function CharacterInfo(props) {
    const classes = useStyles();
    const width = useWidth();
    const { name, image, race, alignment, background, charClass, openDialog, playerId, character } = props;
    const jsonToDownload = { ...character };
    delete jsonToDownload._id;
    delete jsonToDownload.player;
    const [player, setPlayer] = useState();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        // Api.fetchInternal('/race/' + race)
        //     .then(res => setRace(res))

        Api.fetchInternal('/auth/users/' + playerId)
            .then(res => setPlayer(res))
    }, [props.race])

    return (
        <div className={classes.root}>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <a className={classes.link} href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(jsonToDownload))}`} download={`${character._id}.json`}>
                        JSON
                    </a>
                </MenuItem>
            </Menu>
            <Paper variant="outlined" className={classes.paper}>
                <Box style={{ display: "flex", alignItems: "center" }}>
                    <Avatar className={classes.avatar} alt={name} src={image} />
                    <Box className={classes.info}>
                        <Box>
                            <Typography variant="h6">
                                {name}
                            </Typography>
                        </Box>
                        <Box>
                            {player ?
                                <Box component="span">
                                    {width === "xs" ? player.username : ("Personaje de " + player.username)}
                                    {/* {player ? ("Personaje de " +  player.username) : ""} */}
                                </Box>
                                : ""}
                            <br />
                            {width === "xs" ?
                                <Box>
                                    {charClass.map((charClass, index) => <span key={index}>{" " + StringUtil.generizaClase(charClass["className"], props.pronoun) + " " + charClass["classLevel"] + (charClass["subclassName"] ? (" " + charClass["subclassName"]) : " ")}</span>)}
                                </Box>
                                :
                                <Box component="span">
                                    {race && (StringUtil.generizaClase(race.name, props.pronoun) + ',')}
                                    {" " + (background.name ? background.name : "") + " " + (alignment ? alignment : "") + ", "}
                                    {charClass.map((charClass, index) => <span key={index}>{" " + StringUtil.generizaClase(charClass["className"], props.pronoun) + " " + charClass["classLevel"] + (charClass["subclassName"] ? (" " + charClass["subclassName"]) : " ")}</span>)}
                                </Box>
                            }
                        </Box>
                        <Box>
                        </Box>
                    </Box>
                </Box>
                <Box style={{ display: "flex" }}>
                    <Box>
                        <IconButton onClick={handleClick} disabled={!props.editable}>
                            <GetAppIcon />
                        </IconButton>
                        <IconButton onClick={openDialog}>
                            <ShareIcon />
                        </IconButton>
                    </Box>
                    {props.edited &&
                        <Grow in={true} mountOnEnter unmountOnExit>
                            {width !== "xs" ? <Alert variant="filled" severity="warning" action={
                                <IconButton size="small" onClick={props.save}>
                                    <SaveIcon />
                                </IconButton>
                            }>
                                {width !== "xs" && "Tienes cambios sin guardar. Por favor, guarda antes de salir de la página."}
                            </Alert> : <IconButton size="small" onClick={props.save}>
                                    <SaveIcon />
                                </IconButton>}
                        </Grow>}
                </Box>
            </Paper>
        </div>
    );
}