import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Api from '../../../helpers/api'
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { Table, TableBody, Typography, TableRow, TableCell, TableHead } from '@material-ui/core';
import { useWidth } from '../../../helpers/media-query';

const useStyles = makeStyles((theme) => ({
    profileBox: {
        margin: "0 auto",
        padding: "1rem",
        height: "100%"
    },
    dataBox: {
        display: "flex",
        alignItems: "center",
    },
    name: {
        // margin: "1rem"
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7)
    }
}));

const mapStateToProps = state => {
    return {
        profile: state.profile,
        campaigns: state.campaigns,
        roles: state.roles
    }
}

function CampaignProfile(props) {
    const classes = useStyles();
    const [dm, setDm] = useState();
    const [players, setPlayers] = useState();
    const [characters, setCharacters] = useState();
    const [logs, setLogs] = useState([]);
    const width = useWidth();

    useEffect(() => {
        Api.fetchInternal('/auth/players', {
            method: "POST",
            body: JSON.stringify({
                dmId: props.dm,
                userIds: props.players
            })
        })
            .then(res => {
                setDm(res.dm);
                setPlayers(res.players)
            })

        Api.fetchInternal('/characterinfo', {
            method: "POST",
            body: JSON.stringify({
                characterIds: props.characters
            })
        })
            .then(res => {
                setCharacters(res.characters)
            })
    }, [])

    useEffect(() => {
        if (characters && players) {
            Api.fetchInternal('/logs/' + props.campaignId)
                .then(res => {
                    setLogs(res)
                })
        }
    }, [characters, players])

    useEffect(() => {
        if (characters && players && logs.length > 0) {
            const data = [];
            const userData = {};

            logs.forEach((log, index) => {
                Object.keys(log.data.damageDealt).forEach(key => {
                    if (key !== dm.metadata.discordId) {
                        userData[key] = userData[key] ? [...userData[key], ...log.data.damageDealt[key]] : [...log.data.damageDealt[key]]
                    }
                })
            })

            Object.keys(userData).forEach(key => {
                userData[key] = userData[key].sort((a, b) => new Date(a.date) - new Date(b.date));
            })

            Object.keys(userData).forEach(key => {
                const entry = userData[key];
                const user = players.filter(player => player.metadata.discordId === key)[0];
                const userId = user.id;
                const char = characters.filter(character => character.player === userId)[0];

                const collection = {
                    "id": char.flavor.traits.name,
                    "color": "hsl(63, 70%, 50%)",
                    "data": []
                }

                entry.forEach(step => {
                    if (collection.data.findIndex(item => item.x === step.date.split(" ")[0]) >= 0) {
                        const index = collection.data.findIndex(item => item.x === step.date.split(" ")[0]);

                        collection.data[index].y += step.damage;
                    } else {
                        collection.data.push({
                            x: step.date.split(" ")[0],
                            y: step.damage + (collection.data.length > 0 ? collection.data[collection.data.length - 1].y : 0)
                        })
                    }
                })

                data.push(collection)
            })
        }
    }, [characters, players, logs])


    const getPlayerByUsername = (userId) => {
        if (dm.id === userId) {
            return dm.name;
        }

        const selectedPlayer = players.filter(player => player.id === userId)[0];

        if (selectedPlayer) {
            return selectedPlayer.name;
        }

        return undefined;
    }

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <Grid container spacing={2}>
                <Grid item lg={7} xs={12}>
                    <Paper className={classes.profileBox} variant="outlined">
                        <Typography variant="h6" style={{ marginBottom: ".5rem" }}>
                            Personajes
                        </Typography>
                        <Table style={{}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Nombre</TableCell>
                                    {width !== "xs" && <TableCell></TableCell>}
                                    {width !== "xs" && <TableCell></TableCell>}
                                    {width !== "xs" && <TableCell></TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dm &&
                                    <TableRow>
                                        <TableCell>
                                            <Avatar
                                                className={classes.avatar}
                                                alt={dm && dm.name}>
                                                {dm && dm.name.match(/\b(\w)/g).join('')}
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>
                                            <Box component="div" className={classes.name}>
                                                <Typography variant="subtitle1">
                                                    {'Dungeon Master'}
                                                </Typography>
                                            </Box>
                                            <Box component="div" className={classes.name}>
                                                <Typography variant="caption">
                                                    {dm.name}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        {width !== "xs" && <TableCell></TableCell>}
                                        {width !== "xs" && <TableCell></TableCell>}
                                        {width !== "xs" && <TableCell></TableCell>}
                                    </TableRow>}
                                {characters && characters.map(character => {
                                    return (
                                        <TableRow>
                                            <TableCell style={{ width: "60px" }}>
                                                <Avatar
                                                    src={(character && character.flavor.portrait)}
                                                    className={classes.avatar}
                                                    alt={character && character.name}>
                                                    {character && !character.flavor.portrait && character.name}
                                                </Avatar>
                                            </TableCell>
                                            <TableCell style={{ width: "180px" }}>
                                                <Box component="div" className={classes.name}>
                                                    <Typography variant="subtitle1">
                                                        {character.flavor.traits.name}
                                                    </Typography>
                                                </Box>
                                                <Box component="div" className={classes.name}>
                                                    <Typography variant="caption">
                                                        {players && getPlayerByUsername(character.player)}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            {width !== "xs" && <TableCell></TableCell>}
                                            {width !== "xs" && <TableCell></TableCell>}
                                            {width !== "xs" && <TableCell></TableCell>}
                                        </TableRow>)
                                })}
                            </TableBody>
                        </Table>
                        <Box variant="div" className={classes.dataBox}>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item lg={5} xs={12}>
                    <Paper className={classes.profileBox} variant="outlined">
                        <Typography variant="h6" style={{ marginBottom: "1rem" }}>
                            Sinopsis
                        </Typography>
                        {props.description}
                    </Paper>
                </Grid>
            </Grid>
        </Slide >
    )

}

export default connect(mapStateToProps)(CampaignProfile);