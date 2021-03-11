import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Api from 'helpers/api'
import Box from '@material-ui/core/Box';
import { Table, TableBody, Typography, TableRow, TableCell, TableHead } from '@material-ui/core';
import DamageDealt from './graphs/DamageDealt';
import CritRolls from './graphs/CritRolls';
import CritFails from './graphs/CritFails';
import DamagePerDay from './graphs/DamagePerDay';

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
    }
}

function CampaignStats(props) {
    const classes = useStyles();
    const [dm, setDm] = useState();
    const [players, setPlayers] = useState();
    const [characters, setCharacters] = useState();
    const [logs, setLogs] = useState([]);
    const theme = useTheme();
    const [damageDone, setDamageDone] = useState([]);

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
                log.data && Object.keys(log.data.damageDealt).forEach(key => {
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

            setDamageDone(data)
        }
    }, [characters, players, logs])

    return (
        <>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{ display: "flex" }}>
                        <DamageDealt
                            players={players}
                            characters={characters}
                            logs={logs}
                            theme={theme}
                            damageDealt={damageDone}
                        />
                        <CritRolls
                            players={players}
                            characters={characters}
                            logs={logs}
                            theme={theme}
                            dm={dm}
                        />
                        <CritFails
                            players={players}
                            characters={characters}
                            logs={logs}
                            theme={theme}
                            dm={dm}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.profileBox} z variant="outlined">
                            <Typography variant="h6" style={{ marginBottom: ".5rem" }}>
                                Personajes
                        </Typography>
                            <Table style={{}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Daño total hecho</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {characters && characters.map(character => {
                                        let percentage = 0;
                                        let currentCharacterDamage = 0;
                                        if (damageDone.length > 0) {
                                            let maxDamage = 0;
                                            const currentCharacter = damageDone.filter(item => item.id === character.flavor.traits.name)[0];

                                            if (currentCharacter) {

                                                currentCharacterDamage = currentCharacter.data[currentCharacter.data.length - 1].y;

                                                damageDone.forEach(char => {
                                                    if (char.data[char.data.length - 1].y > maxDamage) {
                                                        maxDamage = char.data[char.data.length - 1].y
                                                    }
                                                })

                                                percentage = (currentCharacterDamage / maxDamage) * 100;
                                            }
                                        }

                                        return (
                                            <TableRow>
                                                <TableCell size="small" style={{ width: "180px" }}>
                                                    <Box component="div" className={classes.name}>
                                                        <Typography variant="subtitle1">
                                                            {character.flavor.traits.name}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell style={{ width: "100px" }}>
                                                    {currentCharacterDamage}
                                                </TableCell>
                                                <TableCell style={{ width: "180px" }}>
                                                    <Box
                                                        style={{ height: "15px", backgroundColor: "rgb(232, 193, 160)", width: percentage + "%" }} />
                                                </TableCell>
                                                <TableCell>
                                                    <DamagePerDay
                                                        players={players}
                                                        characters={characters}
                                                        dm={dm}
                                                        logs={logs}
                                                        theme={theme}
                                                        character={character.flavor.traits.name} />
                                                </TableCell>
                                            </TableRow>)
                                    })}
                                </TableBody>
                            </Table>
                            <Box variant="div" className={classes.dataBox}>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Slide >
        </>
    )

}

export default connect(mapStateToProps)(CampaignStats);