import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import Api from '../../helpers/api'
import { StringUtil } from '../../helpers/string-util'

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
    const theme = useTheme();
    const [user, setUser] = useState();
    const [campaigns, setCampaigns] = useState();
    const [avatar, setAvatar] = useState();
    const [roles, setRoles] = useState();
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!props.profile) {
            Api.fetchInternal('/auth/me')
                .then(res => {
                    props.addProfile(res)
                    setUser(res)
                });
        } else {
            setUser(props.profile)
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

    const updateProfile = () => {
        let body = {
            profile: user["metadata"]
        }

        body["profile"]["avatar"] = avatar;

        Api.fetchInternal('/auth/me/' + user._id, {
            method: "POST",
            body: JSON.stringify(body)
        })
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Box component="span">
                <Paper className={classes.profileBox} variant="outlined">
                    <Grid container spacing={1}>
                        <Grid item md={3} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Box component="div">
                                <Typography variant="h6">
                                    {user && user.username}
                                </Typography>
                            </Box>
                            <Box component="div">
                                {avatar || (user && user.metadata.avatar) ?
                                    <Avatar
                                        src={avatar || (user && user.metadata.avatar)}
                                        className={classes.avatar}
                                        alt={user && user.metadata.first_name + ' ' + user.metadata.last_name}
                                    /> :
                                    <Avatar
                                        className={classes.avatar}
                                        alt={user && user.metadata.first_name + ' ' + user.metadata.last_name}>
                                        {user && (user.metadata.first_name + ' ' + user.metadata.last_name).match(/\b(\w)/g).join('')}
                                    </Avatar>
                                }
                            </Box>
                            <Box component="div" style={{ marginTop: "1rem" }}>
                                <TextField
                                    id="outlined-helperText"
                                    label="Avatar"
                                    defaultValue={user && user.metadata.avatar}
                                    helperText="Input a valid direct URL"
                                    variant="outlined"
                                    onChange={(e) => setAvatar(e.target.value)}
                                />
                            </Box>
                        </Grid>
                        <Grid item md={9} style={{ position: "relative" }}>
                            <Typography variant="h6">
                                User profile
                        </Typography>
                            <Box component="div" style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}>
                                <Box component="div">
                                    <Box component="span" style={{ fontWeight: 600 }}>
                                        {'Full name: '}
                                    </Box>
                                    <Box component="span">
                                        {user && user.metadata.first_name + ' ' + user.metadata.last_name}
                                    </Box>
                                </Box>
                                <Box component="div">
                                    <Box component="span" style={{ fontWeight: 600 }}>
                                        {'Email: '}
                                    </Box>
                                    <Box component="span">
                                        {user && user.metadata.email}
                                    </Box>
                                </Box>
                                <Box component="div">
                                    <Box component="span" style={{ fontWeight: 600 }}>
                                        {'Date of creation: '}
                                    </Box>
                                    <Box component="span">
                                        {user && StringUtil.getDateFromISODate(user.createdAt)}
                                    </Box>
                                </Box>
                                <Box component="div">
                                    <Box component="span" style={{ fontWeight: 600 }}>
                                        {'Last updated: '}
                                    </Box>
                                    <Box component="span">
                                        {user && StringUtil.getDateFromISODate(user.updatedAt)}
                                    </Box>
                                </Box>
                            </Box>
                            <Divider style={{ margin: "1rem 0" }} light />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={updateProfile}
                                disabled={!avatar}
                                className={classes.submitButton}> Save profile </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    // variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Campaigns" {...a11yProps(0)} />
                    <Tab label="Roles" {...a11yProps(1)} />
                    {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                </Tabs>
                <Paper variant="outlined">
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        Name
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {campaigns && campaigns.map(campaign => (
                                    <TableRow>
                                        <TableCell className={classes.smallCell}>
                                            {campaign.dm === user._id &&
                                                <Tooltip title="Dungeon Master">
                                                    <StarIcon color="primary" />
                                                </Tooltip>}
                                        </TableCell>
                                        <TableCell>
                                            {campaign.name}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        Name
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {roles && roles.map(role => (
                                    <TableRow>
                                        <TableCell className={classes.smallCell}>
                                            {roles && user && user.roles.includes(role) &&
                                                <Tooltip title="You have this role">
                                                    <StarIcon color="primary" />
                                                </Tooltip>}
                                        </TableCell>
                                        <TableCell>
                                            {StringUtil.parseRole(role)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabPanel>

                </Paper>
            </Box>
        </Slide>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);