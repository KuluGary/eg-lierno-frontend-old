import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { connect } from "react-redux";
import {
    addProfile,
    addCampaigns,
    addRoles
} from "../../shared/actions/index";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import StarIcon from '@material-ui/icons/Star';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Api from '../../helpers/api'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import RoomIcon from '@material-ui/icons/Room';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { toast } from 'react-toastify';
import { StringUtil } from '../../helpers/string-util'
import equal from 'fast-deep-equal/react';

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
    }
}));

const mapStateToProps = state => {
    return {
        profile: state.profile,
        campaigns: state.campaigns,
        roles: state.roles
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProfile: profile => dispatch(addProfile(profile)),
        addCampaigns: campaigns => dispatch(addCampaigns(campaigns)),
        addRoles: roles => dispatch(addRoles(roles))
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function ProfileScreen(props) {
    const classes = useStyles();
    // const theme = useTheme();
    const [user, setUser] = useState();
    const [campaigns, setCampaigns] = useState();
    const [avatar, setAvatar] = useState();
    const [roles, setRoles] = useState();
    const [newPassword, setNewPassword] = useState();
    const [value, setValue] = useState(0);
    const [metadata, setMetadata] = useState();
    const [darkMode] = React.useState(false);

    useEffect(() => {
        if (!props.profile) {
            Api.fetchInternal('/auth/me')
                .then(res => {
                    props.addProfile(res)
                    setUser(res)
                    setMetadata(res.metadata);
                });
        } else {
            setUser(props.profile)
            setMetadata(props.profile.metadata)
        }

        if (!props.campaigns) {
            Api.fetchInternal('/campaigns')
                .then(res => {
                    props.addCampaigns(res)
                    setCampaigns(res)
                });
        } else {
            setCampaigns(props.campaigns)
        }

        if (!props.roles) {
            Api.fetchInternal('/auth/roles')
                .then(res => {
                    props.addRoles(res)
                    setRoles(res)
                });
        } else {
            setRoles(props.roles)
        }

    }, [])

    const updateMetadata = (key, value) => {
        const newMeta = { ...metadata };

        newMeta[key] = value;

        setMetadata(newMeta)
    }

    const updateProfile = () => {
        if (newPassword && newPassword.length > 0) {
            Api.fetchInternal('/auth/reset', {
                method: "POST",
                body: JSON.stringify({
                    email: user['metadata']['email'],
                    password: newPassword
                })
            })
                .then(() => toast.success("Contraseña actualizada"))
        }

        if (!equal(user.metadata, metadata)) {
            let body = {
                profile: metadata
            }

            Api.fetchInternal('/auth/me/' + user._id, {
                method: "POST",
                body: JSON.stringify(body)
            })
            .then(() => toast.success("Perfil actualizado"))
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: darkMode ? 'dark' : 'light',
                },
            }),
        [darkMode],
    );

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
                                            value={metadata.email}
                                            onChange={(e) => updateMetadata("email", e.target.value)} />
                                    </Box>
                                </Box>
                                <Box style={{ display: "flex", alignItems: "center", marginBottom: ".4rem" }}>
                                    <CalendarTodayIcon style={{ marginRight: ".5rem" }} />
                                    <Box component="span">
                                        {user && ('Se unió el ' + StringUtil.getDateFromISODate(user.createdAt))}
                                    </Box>
                                </Box>
                                <Box style={{ display: "flex", alignItems: "center", marginBottom: ".4rem" }}>
                                    <RoomIcon style={{ marginRight: ".5rem" }} />
                                    <Box component="span">
                                        <TextField
                                            value={metadata.location}
                                            onChange={(e) => updateMetadata("location", e.target.value)} />
                                    </Box>
                                </Box>
                                <Box style={{ display: "flex", alignItems: "center", marginBottom: ".4rem" }}>
                                    <FontAwesomeIcon icon={faDiscord} size="lg" style={{ marginRight: ".8rem", marginLeft: ".2rem" }} />
                                    <Box component="span">
                                        <TextField
                                            value={metadata.discordName}
                                            onChange={(e) => updateMetadata("discordName", e.target.value)} />
                                    </Box>
                                </Box>
                                <Box style={{ display: "flex", alignItems: "center", marginBottom: ".4rem" }}>
                                    <VpnKeyIcon style={{ marginRight: ".5rem" }} />
                                    <Box component="span">
                                        <TextField
                                            type={'password'}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
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
                                <Box style={{ display: "flex", justifyContent: "flex-end", width: "100%", marginTop: "1rem" }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={updateProfile}
                                        disabled={(equal(metadata, user.metadata) && !newPassword && !avatar)}
                                        >
                                        Guardar perfil
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>

                        <Grid item md={9} style={{ position: "relative" }}>
                            <Paper variant="outlined" style={{ height: "100%" }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell>
                                                Nombre
                                    </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {roles && roles.map(role => (
                                            <TableRow>
                                                <TableCell className={classes.smallCell}>
                                                    {roles && user && user.roles.includes(role) &&
                                                        <Tooltip title="Ya tienes este rol">
                                                            <StarIcon color="default" />
                                                        </Tooltip>}
                                                </TableCell>
                                                <TableCell>
                                                    {StringUtil.parseRole(role)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </Grid>}
            </Box>
        </Slide>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);