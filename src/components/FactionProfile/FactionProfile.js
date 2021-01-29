import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Paper, TextField } from '@material-ui/core';
import Api from '../../helpers/api';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Avatar from '@material-ui/core/Avatar';
import { Table, TableBody, TableRow, TableCell, TableHead } from '@material-ui/core';
import { connect } from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import ShareIcon from '@material-ui/icons/Share';
import Grow from '@material-ui/core/Grow';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Alert from '@material-ui/lab/Alert';
import Image from '../ItemsUi/Image';

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        verticalAlign: "center"
    },
    link: {
        color: "inherit",
        alignSelf: "flex-end"
    },
    game: {
        marginLeft: "2rem"
    },
    profileBox: {
        margin: "1rem .5rem",
        height: "100%",
        padding: "1rem"
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        borderRadius: "50%"
    },
}));

const mapStateToProps = state => {
    return {
        profile: state.profile,
        campaigns: state.campaigns,
    }
}

function FactionProfile(props) {
    const classes = useStyles();
    const [faction, setFaction] = useState();
    const [characters, setCharacters] = useState();
    const [npcs, setNpcs] = useState();
    const [monsters, setMonster] = useState();
    const [dm] = useState();
    const [players, setPlayers] = useState();
    const [edited, setEdited] = useState(false);

    useEffect(() => {
        Api.fetchInternal('/factions/' + props.match.params.id)
            .then(res => {
                const factions = res;
                setFaction(factions)

                Api.fetchInternal('/characterinfo', {
                    method: "POST",
                    body: JSON.stringify({
                        characterIds: factions.members.characters.map(member => member.id)
                    })
                })
                    .then(res => {
                        setCharacters(res.characters)

                        Api.fetchInternal('/auth/players', {
                            method: "POST",
                            body: JSON.stringify({
                                userIds: res.characters.map(character => character.player)
                            })
                        })
                            .then(res => {
                                setPlayers(res.players)
                            })
                    })

                Api.fetchInternal('/npcinfo', {
                    method: "POST",
                    body: JSON.stringify({
                        npcIds: factions.members.npcs.map(member => member.id)
                    })
                })
                    .then(res => {
                        setNpcs(res.npcs)
                    })

                Api.fetchInternal('/monsterinfo', {
                    method: "POST",
                    body: JSON.stringify({
                        monsterIds: factions.members.monsters?.map(member => member.id)
                    })
                })
                    .then(res => {
                        setMonster(res.monsters)
                    })
            });

    }, []);

    const getPlayerByUsername = (userId) => {
        if (dm?.id === userId) {
            return dm.name;
        }

        const selectedPlayer = players.filter(player => player.id === userId)[0];

        if (selectedPlayer) {
            return selectedPlayer.name;
        }

        return undefined;
    }

    const save = () => {
        Api.fetchInternal('/factions/' + faction._id, {
            method: "PUT",
            body: JSON.stringify(faction)
        })
            .then(() => setEdited(false))
    }

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <Grid container spacing={2} style={{ padding: 10 }}>
                {faction &&
                    <>
                        <Grid item xs={12} component={Paper} variant="outlined" style={{ padding: "1rem .5rem" }}>
                            <Box style={{ display: "flex", justifyContent: "space-between" }}>
                                <Box style={{ display: "flex", alignItems: "center" }}>
                                    <Box style={{ margin: "0 .5rem" }}>
                                        <IconButton onClick={props.history.goBack} className={classes.link}>
                                            <ArrowBackIosIcon />
                                        </IconButton>
                                    </Box>
                                    <Box style={{ margin: "0 1rem 0 0" }}>
                                        <Image
                                            mode="modal"
                                            src={faction.image}
                                            className={classes.avatar}
                                        />
                                    </Box>
                                    <Box>
                                        <Box>
                                            <Typography variant="h5" inline>
                                                {faction.name}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="caption">
                                                {"Número de miembros:" + (characters?.length + npcs?.length)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box style={{ display: "flex" }}>
                                    <IconButton onClick={() => { }}>
                                        <FavoriteIcon />
                                    </IconButton>
                                    <IconButton onClick={() => { }}>
                                        <ShareIcon />
                                    </IconButton>
                                    {edited && <Grow in={true} mountOnEnter unmountOnExit>
                                        <Alert variant="filled" severity="warning" action={
                                            <IconButton size="small" onClick={save}>
                                                <SaveIcon />
                                            </IconButton>
                                        }>
                                            Tienes cambios sin guardar. Por favor, guarda antes de salir de la página.
                                        </Alert>
                                    </Grow>}
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={7} style={{ padding: 0 }}>
                            <Paper variant="outlined" className={classes.profileBox} style={{ marginLeft: 0 }}>
                                <Typography variant="h6">Miembros</Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell>Nombre</TableCell>
                                            <TableCell>Rango</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {characters && characters?.map(character => {
                                            return (
                                                <TableRow hover>
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
                                                    <TableCell >
                                                        <TextField
                                                            disabled={props.profile?._id !== faction.founder}
                                                            value={faction.members["characters"].filter(member => member.id === character._id)[0]?.rank}
                                                            onChange={(event) => {
                                                                setEdited(true);
                                                                const newFaction = { ...faction };
                                                                const index = newFaction.members["characters"].findIndex(member => member.id === character._id);
                                                                newFaction.members["characters"][index].rank = event.target.value;
                                                                setFaction(newFaction)
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ cursor: "pointer" }} align="right" onClick={() => props.history.push("/characters/" + character._id)}>
                                                        <ArrowForwardIosIcon fontSize="small" />
                                                    </TableCell>
                                                </TableRow>)
                                        })}
                                        {npcs && npcs?.map(character => {
                                            return (
                                                <TableRow hover>
                                                    <TableCell style={{ width: "60px" }}>
                                                        <Avatar
                                                            size="large"
                                                            src={(character && character.flavor.imageUrl)}
                                                            className={classes.avatar}
                                                            alt={character && character.name}>
                                                            {character && !character.flavor.imageUrl && character.name}
                                                        </Avatar>
                                                    </TableCell>
                                                    <TableCell style={{ width: "180px" }}>
                                                        <Box component="div" className={classes.name}>
                                                            <Typography variant="subtitle1">
                                                                {character.name}
                                                            </Typography>
                                                        </Box>
                                                        <Box component="div" className={classes.name}>
                                                            <Typography variant="caption">
                                                                {"PNJ"}
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell >
                                                        <TextField
                                                            disabled={props.profile?._id !== faction.founder}
                                                            value={faction.members["characters"].filter(member => member.id === character._id)[0]?.rank}
                                                            onChange={(event) => {
                                                                setEdited(true);
                                                                const newFaction = { ...faction };
                                                                const index = newFaction.members["npcs"].findIndex(member => member.id === character._id);
                                                                newFaction.members["npcs"][index].rank = event.target.value;
                                                                setFaction(newFaction)
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ cursor: "pointer" }} align="right" onClick={() => props.history.push("/npc/" + character._id)}>
                                                        <ArrowForwardIosIcon fontSize="small" />
                                                    </TableCell>
                                                </TableRow>)
                                        })}
                                        {monsters && monsters?.map(character => {
                                            return (
                                                <TableRow hover>
                                                    <TableCell style={{ width: "60px" }}>
                                                        <Avatar
                                                            size="large"
                                                            src={(character && character.flavor.imageUrl)}
                                                            className={classes.avatar}
                                                            alt={character && character.name}>
                                                            {character && !character.flavor.imageUrl && character.name}
                                                        </Avatar>
                                                    </TableCell>
                                                    <TableCell style={{ width: "180px" }}>
                                                        <Box component="div" className={classes.name}>
                                                            <Typography variant="subtitle1">
                                                                {character.name}
                                                            </Typography>
                                                        </Box>
                                                        <Box component="div" className={classes.name}>
                                                            <Typography variant="caption">
                                                                {"Criatura"}
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell >
                                                        <TextField
                                                            disabled={props.profile?._id !== faction.founder}
                                                            value={faction.members["characters"].filter(member => member.id === character._id)[0]?.rank}
                                                            onChange={(event) => {
                                                                setEdited(true);
                                                                const newFaction = { ...faction };
                                                                const index = newFaction.members["npcs"].findIndex(member => member.id === character._id);
                                                                newFaction.members["npcs"][index].rank = event.target.value;
                                                                setFaction(newFaction)
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ cursor: "pointer" }} align="right" onClick={() => props.history.push("/npc/" + character._id)}>
                                                        <ArrowForwardIosIcon fontSize="small" />
                                                    </TableCell>
                                                </TableRow>)
                                        })}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                        <Grid item xs={5} style={{ padding: 0 }}>
                            <Paper variant="outlined" className={classes.profileBox} style={{ marginRight: 0 }}>
                                <Typography variant="h6">Descripción</Typography>
                                <TextField
                                    disabled={props.profile?._id !== faction.founder}
                                    variant="outlined"
                                    multiline
                                    fullWidth
                                    value={faction.description}
                                    onChange={(event) => {
                                        const newFaction = { ...faction };
                                        newFaction["description"] = event.target.value;
                                        setFaction(newFaction);
                                        setEdited(true);
                                    }}
                                    inputProps={{
                                        style: { minHeight: "92.5%", fontSize: "11px" },
                                    }}
                                />
                            </Paper>

                        </Grid>
                    </>}
            </Grid>
        </Slide>
    )
}


export default connect(mapStateToProps)(FactionProfile);
