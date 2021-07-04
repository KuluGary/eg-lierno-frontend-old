import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import {
    addProfile,
    addCampaigns
} from "../../shared/actions/index";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import RoomIcon from '@material-ui/icons/Room';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import notificationIcon from "../../assets/images/notifications.svg";
import { apolloClient } from "helpers/api";
import { METADATA_QUERY, ME_QUERY } from "helpers/graphql/queries/user";

const useStyles = makeStyles((theme) => ({
    profileBox: {
        margin: "0 auto",
        padding: "2rem"
    },
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        fontSize: "200%",
        backgroundColor: theme.palette.secondary.main
    },
    submitButton: {
        position: "absolute",
        bottom: 0,
        right: 0
    },
    smallCell: {
        width: "2rem"
    },
    link: {
        color: "inherit"
    },
    notificationBox: {
        height: "100%",
        backgroundImage:
            `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MzcuMyA3MDMuNyI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6I2VmZWVmZn08L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMCAwczE0Ny44IDEwMC44IDY3LjUgMzAwLjNTNjIwIDM3Ny41IDYyMCAzNzcuNWwtMjQuMiAxODAuNCA0MC42IDEzMS41IDIwMS02Mi44VjB6IiBjbGFzcz0iYSIvPjxwYXRoIGQ9Ik00MzkuNCAzMTAuOWMtNDUuMS0xLjYtODgtMTYuMS0xMjktMzJzLTgxLjUtMzMuNi0xMjUuNS00MmMtMjguMy01LjQtNjAuNy02LjItODMuNCA5LTIyIDE0LjYtMjkgMzkuNy0zMi45IDYzLjEtMi44IDE3LjYtNC41IDM2LjEgMy4zIDUyLjYgNS41IDExLjQgMTUuMiAyMSAyMS45IDMyIDIzLjMgMzggNi44IDg1LTE4LjUgMTIyLjItMTEuOCAxNy41LTI1LjUgMzQuMS0zNC43IDUyLjdzLTEzLjMgMzkuOC01LjMgNTguOEM0My4yIDY0NiA2MiA2NjAuMiA4Mi41IDY3MGM0MS42IDIwLjEgOTAuNSAyNiAxMzguMyAyOS4yIDEwNS43IDcuMiAyMTIgNCAzMTggMWE5MzQgOTM0IDAgMCAwIDExNy4xLTguNGMyMS40LTMuNCA0My41LTguOCA1OS4xLTIxLjZhNDkuNSA0OS41IDAgMCAwIDExLjQtNjQuN2MtMjIuMi0zNC40LTgzLjUtNDMtOTktODAtOC42LTIwLjMuMi00MyAxMi42LTYxLjkgMjYuNi00MC41IDcxLjItNzYgNzMuNi0xMjIuMyAxLjYtMzEuOC0xOS45LTYzLjYtNTMtNzguNkM2MjUuOCAyNDcgNTc3LjYgMjQ5IDU1MiAyNzVjLTI2LjUgMjYuOC03Mi45IDM3LjItMTEyLjYgMzUuOHoiIGNsYXNzPSJhIi8+PC9zdmc+")`,
        backgroundSize: "contain",
        backgroundPosition: "right top",
        backgroundRepeat: "no-repeat",
        backgroundColor: theme.palette.background.paper,
        opacity: .8
    }
}));

const mapStateToProps = state => {
    return {
        profile: state.profile,
        campaigns: state.campaigns
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProfile: profile => dispatch(addProfile(profile)),
        addCampaigns: campaigns => dispatch(addCampaigns(campaigns))
    };
}

function ProfileScreen(props) {
    const classes = useStyles();
    const [user, setUser] = useState();
    const [avatar] = useState();
    const [metadata, setMetadata] = useState();

    useEffect(() => {
        console.log(props.profile);
        if (!props.profile) {
            apolloClient.query({ query: ME_QUERY })
                .then(({ data }) => {
                    props.addProfile(data.me.user);
                    setUser(data.me.user);
                })

            apolloClient.query({ query: METADATA_QUERY })
                .then(({ data }) => {
                    console.log(data.me)
                    setMetadata(data.me.user.metadata);
                })
        } else {
            setUser(props.profile)
            setMetadata(props.profile.metadata)
        }
    }, [])

    const updateMetadata = (key, value) => {
        const newMeta = { ...metadata };

        newMeta[key] = value;

        setMetadata(newMeta)
    }    

    return (
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Box component="span">
                {user && metadata &&
                    <Grid container spacing={1}>
                        <Grid item md={3} style={{ display: "flex", flexDirection: "column" }}>
                            <Paper className={classes.profileBox} style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", width: "100%" }} variant="outlined">
                                <Box component="div">
                                    <Typography variant="h6">
                                        {user && user.username}
                                    </Typography>
                                </Box>
                                <Box component="div">
                                    <Avatar
                                        className={classes.avatar}
                                        src={avatar || (metadata && metadata.avatar)}
                                        alt={metadata.first_name + ' ' + metadata.last_name}>
                                        {!metadata.avatar && (metadata.first_name + ' ' + metadata.last_name).match(/\b(\w)/g).join('')}
                                    </Avatar>
                                </Box>
                                <Box component="div" style={{ marginTop: "1rem" }}>
                                    <TextField
                                        disabled
                                        id="outlined-helperText"
                                        label="Avatar"
                                        defaultValue={metadata.avatar}
                                        helperText="Introduce una URL válida"
                                        variant="outlined"
                                        value={avatar}
                                        onChange={(e) => updateMetadata("avatar", e.target.value)}
                                    />
                                </Box>
                            </Paper>
                            <Paper className={classes.profileBox} style={{ marginTop: ".5rem", height: "100%", width: "100%" }} variant="outlined">
                                <Box component="span"><Typography style={{ fontSize: 16, marginBottom: ".4rem" }}>Sobre mí</Typography></Box>
                                <Box style={{ display: "flex", alignItems: "center", marginBottom: ".4rem" }}>
                                    <MailOutlineIcon style={{ marginRight: ".5rem" }} />
                                    <Box component="span">
                                        <TextField
                                            disabled
                                            value={metadata.email}
                                            onChange={(e) => updateMetadata("email", e.target.value)} />
                                    </Box>
                                </Box>
                                <Box style={{ display: "flex", alignItems: "center", marginBottom: ".4rem" }}>
                                    <RoomIcon style={{ marginRight: ".5rem" }} />
                                    <Box component="span">
                                        <TextField
                                            disabled
                                            value={metadata.location}
                                            onChange={(e) => updateMetadata("location", e.target.value)} />
                                    </Box>
                                </Box>
                                <Box style={{ display: "flex", alignItems: "center", marginBottom: ".4rem" }}>
                                    <FontAwesomeIcon icon={faDiscord} size="lg" style={{ marginRight: ".8rem", marginLeft: ".2rem" }} />
                                    <Box component="span">
                                        <TextField
                                            disabled
                                            value={metadata.discordName}
                                            onChange={(e) => updateMetadata("discordName", e.target.value)} />
                                    </Box>
                                </Box>                            
                                <Box>
                                    <FormControlLabel
                                        labelPlacement="start"
                                        control={
                                            <Switch
                                                checked={props.darkMode}
                                                onChange={() => props.setDarkMode(!props.darkMode)} />}
                                        label={'Modo oscuro'} />
                                </Box>
                                {/* <Box style={{ display: "flex", justifyContent: "flex-end", width: "100%", marginTop: "1rem" }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={updateProfile}
                                        disabled={(equal(metadata, user.metadata) && !newPassword && !avatar)}
                                    >
                                        Guardar perfil
                                    </Button>
                                </Box> */}
                            </Paper>
                        </Grid>

                        <Grid item md={9} style={{ position: "relative" }}>
                            <Paper variant="outlined" style={{ height: "100%" }}>
                                <Box className={classes.notificationBox}
                                    style={{
                                        backgroundBlendMode: props.darkMode && "soft-light"
                                    }}>
                                    <img alt="notifications" src={notificationIcon} style={{ display: "block", padding: "1rem" }} />
                                </Box>
                                {/* {streamToken ?
                                    <StreamApp
                                        apiKey={process.env.REACT_APP_STREAM_KEY}
                                        appId={process.env.REACT_APP_STREAM_ID}
                                        token={streamToken}>
                                        <NotificationFeed
                                            notify
                                            Group={(props) => (
                                                <Notification
                                                    {...props}
                                                    onClickUser={user => console.log(user)}
                                                    onClickNotification={(notification) => console.log(notification)}
                                                />
                                            )}
                                            Placeholder={() => (
                                                <Box className={classes.notificationBox}
                                                    style={{
                                                        backgroundBlendMode: props.darkMode && "soft-light"
                                                    }}>
                                                    <img alt="notifications" src={notificationIcon} style={{ display: "block", padding: "1rem" }} />
                                                </Box>
                                            )} />
                                    </StreamApp>
                                    :
                                    <Box className={classes.notificationBox}
                                        style={{
                                            backgroundBlendMode: props.darkMode && "soft-light"
                                        }}>
                                        <img alt="notifications" src={notificationIcon} style={{ display: "block", padding: "1rem" }} />
                                    </Box>
                                } */}
                            </Paper>
                        </Grid>
                    </Grid>}
            </Box>
        </Slide>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);