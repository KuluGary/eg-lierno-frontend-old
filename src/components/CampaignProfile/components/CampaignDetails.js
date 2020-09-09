import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Api from '../../../helpers/api'
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    profileBox: {
        margin: "0 auto",
        padding: "1rem",
        height:"100%"
    },
    dataBox: {
        display: "flex",
        alignItems: "center",
    },
    name: {
        margin: "1rem"
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

    useEffect(() => {
        Api.fetchInternal('/auth/players', {
            method: "POST",
            body: JSON.stringify({
                dmId: props.dm,
                userIds: props.players
            })
        })
            .then(res => {
                console.log(res)
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

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.profileBox} variant="outlined">
                        <Typography variant="h6">
                            {props.name}
                        </Typography>
                        <Typography variant="subtitle2">
                            {'Creada por: ' + (dm && dm.name)}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.profileBox} variant="outlined">
                        <Typography variant="h6">
                            Jugadores
                        </Typography>
                        {players && players.map(player => (
                            <Box variant="div" className={classes.dataBox}>
                                {player.avatar ?
                                    <Avatar
                                        src={(player && player.avatar)}
                                        className={classes.avatar}
                                        alt={player && player.name}
                                    /> :
                                    <Avatar
                                        className={classes.avatar}
                                        alt={player && player.name}>
                                        {player && player.name[0]}
                                    </Avatar>}
                                <Box component="span" className={classes.name}>
                                    {player.name}
                                </Box>
                            </Box>
                        ))}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.profileBox} variant="outlined">
                        <Typography variant="h6">
                            Personajes
                        </Typography>
                        {characters && characters.map(character => (
                            <Box variant="div" className={classes.dataBox}>
                                {character.flavor.imageUrl ?
                                    <Avatar
                                        src={(character && character.flavor.imageUrl)}
                                        className={classes.avatar}
                                        alt={character && character.name}
                                    /> :
                                    <Avatar
                                        className={classes.avatar}
                                        alt={character && character.name}>
                                        {character && character.name}
                                    </Avatar>}
                                <Box component="span" className={classes.name}>
                                    {character.name}
                                </Box>
                            </Box>
                        ))}
                    </Paper>
                </Grid>
            </Grid>
        </Slide>
    )

}

export default connect(mapStateToProps)(CampaignProfile);