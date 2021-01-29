import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Api from '../../../helpers/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroll-component';
import Avatar from '@material-ui/core/Avatar';
import { toHTML } from 'discord-markdown';
import { MenuItem, Select } from '@material-ui/core';
import Image from '../../ItemsUi/Image';

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        minHeight: 0,
        verticalAlign: "center"
    },
    messageContainer: {
        overflow: "auto",
        height: "80vh",
        '&::-webkit-scrollbar': {
            width: "10px",
            opacity: .5
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "20px"
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: "rgba(255,255,255,0.5)",
            borderRadius: "20px"
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: "rgba(255,255,255,0.8)",
        },
        display: 'flex',
        flexDirection: 'column-reverse',
    },
    infiniteContainer: {
        '&::-webkit-scrollbar': {
            display: "none"
        },
    }
}));

function CampaignLogs(props) {
    const classes = useStyles();
    const [logs, setLogs] = useState([]);
    const [currentMessages, setCurrentMessages] = useState(50)
    const [dm, setDm] = useState();
    const [players, setPlayers] = useState();
    const [characters, setCharacters] = useState([]);
    const [options, setOptions] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(0)
    let chatBox = React.createRef();

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

        Api.fetchInternal('/logs/' + props.campaignId)
            .then(res => {
                setLogs(res)
                const opts = [];

                res.forEach((option, index) => {
                    opts.push({
                        label: option.name.replace("-", " "),
                        value: index
                    })
                })

                setOptions(opts);
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
        if (chatBox && chatBox.current) {
            chatBox.current.scrollTop = chatBox.current.scrollHeight;
        }
    }, [logs, chatBox])

    const getDisplayName = (author) => {
        if (dm && dm.metadata.discordId === author.id) {
            return "Dungeon Master"
        } else if (players) {
            const selectedPlayer = players.filter(player => player.metadata.discordId === author.id)[0]
            if (selectedPlayer) {
                const selectedCharacter = characters.filter(character => character.player === selectedPlayer.id)[0]

                if (selectedCharacter) {
                    return selectedCharacter.flavor.traits.name;
                } else {
                    return author.name
                }
            } else {
                return author.displayname
            }
        } else {
            return author.displayname;
        }
    }

    const getAvatar = (author) => {
        if (dm && dm.metadata.discordId === author.id) {
            return null;
        } else if (players) {
            const selectedPlayer = players.filter(player => player.metadata.discordId === author.id)[0]
            if (selectedPlayer) {
                const selectedCharacter = characters.filter(character => character.player === selectedPlayer.id)[0]

                if (selectedCharacter) {
                    return selectedCharacter.flavor.portrait;
                } else {
                    return null
                }
            } else {
                return null
            }
        } else {
            return author.displayname;
        }
    }

    return (
        <Box className={classes.container}>
            {logs.length > 0 &&
                <Paper variant="outlined" style={{ padding: "1rem", width: "100%", }} >
                    <Box style={{ display: "flex", justifyContent: "space-between" }}>
                        <Box style={{ display: "flex" }}>
                            <Image
                                src={logs[selectedCategory].discordData.guild.iconUrl}
                                style={{ padding: ".5rem", maxWidth: "100px", maxHeight: "100px" }} />
                            <Box>
                                <Typography variant="h6">
                                    {logs[selectedCategory].discordData.guild.name}
                                </Typography>
                                <Typography variant="h6">
                                    {/* {logs[selectedCategory].discordData.channel.category + ' / ' + logs[selectedCategory].discordData.channel.name} */}
                                    {logs[selectedCategory].discordData.channel.category + ' / '}
                                    <Select
                                        style={{ fontSize: 18, textTransform: 'capitalize', fontWeight: '500' }}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        value={selectedCategory} >
                                            {options.map(option => (
                                                <MenuItem style={{ textTransform: 'capitalize' }} value={option.value}>{option.label}</MenuItem>
                                            ))}
                                        </Select>
                                </Typography>
                                <Typography>
                                    {'Total de mensajes: ' + logs[selectedCategory].messages.length}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Divider />
                    <div className={classes.messageContainer} ref={ref => chatBox = ref} id="scrollableDiv">
                        <InfiniteScroll
                            className={classes.infiniteContainer}
                            dataLength={logs[selectedCategory].messages.slice(0, currentMessages)}
                            next={() => setCurrentMessages(currentMessages + 50)}
                            hasMore={logs[selectedCategory].messages.length > currentMessages}
                            style={{ display: 'flex', flexDirection: 'column-reverse' }}
                            loader={
                                <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
                                    <CircularProgress color="default" />
                                </div>
                            }
                            inverse
                            scrollableTarget="scrollableDiv"
                        >
                            {logs.length > 0 && logs[selectedCategory].messages
                                .slice(0, currentMessages)
                                // .reverse()
                                .map((message, index) => {
                                    const portrait = getAvatar(message.author);
                                    return (
                                        <>
                                            <Divider />
                                            <Box style={{
                                                display: "grid",
                                                margin: "0 0.6em",
                                                padding: "0.9em 0",
                                                // borderTop: "1px solid",
                                                gridTemplateColumns: "auto 1fr"
                                            }}>
                                                <Box style={{
                                                    gridColumn: 1,
                                                    width: "40px",
                                                    height: "40px"
                                                }}>
                                                    {portrait ?
                                                        <Avatar
                                                            style={{
                                                                height: "40px"
                                                            }}
                                                            src={portrait}
                                                            className={classes.avatar}
                                                            alt={message.author.displayname}
                                                        /> :
                                                        <Avatar
                                                            style={{
                                                                height: "40px"
                                                            }}
                                                            className={classes.avatar}
                                                            alt={message.author.displayname}>
                                                            {(message.author.displayname).match(/\b(\w)/g).join('')}
                                                        </Avatar>}
                                                </Box>
                                                <Box style={{
                                                    gridColumn: 2,
                                                    marginLeft: "1.2em",
                                                    minWidth: "50%"
                                                }}>
                                                    <span style={{
                                                        color: "",
                                                        fontWeight: "500",
                                                        fontSize: "1.2em"
                                                    }}>
                                                        {getDisplayName(message.author)}
                                                        {/* {message.author.displayname} */}
                                                    </span>
                                                    <span style={{
                                                        color: "rgba(255,255,255,0.2)",
                                                        fontSize: ".8em",
                                                        marginLeft: ".5em"
                                                    }}>
                                                        {message.timestamp.replace(/T.*$/, "")}
                                                    </span>
                                                    <Box style={{
                                                        padding: "0.1em 0.3em",
                                                        margin: "0 -0.3em",
                                                        backgroundColor: "transparent"
                                                    }}>
                                                        <Box component="div"
                                                            style={{
                                                                maxWidth: "100%",
                                                                whiteSpace: "pre-wrap",
                                                                lineHeight: "1.3",
                                                                overflowWrap: "break-word"
                                                            }}>
                                                            <span dangerouslySetInnerHTML={{
                                                                __html: toHTML(message.content, {
                                                                    discordCallback: {
                                                                        user: node => {
                                                                            if (dm && dm.metadata.discordId === node.id) {
                                                                                return "@Dungeon Master"
                                                                            } else if (players) {
                                                                                const selectedPlayer = players.filter(player => player.metadata.discordId === node.id)[0];
                                                                                if (selectedPlayer) {
                                                                                    const selectedCharacter = characters.filter(character => character.player === selectedPlayer.id)[0];
                                                                                    if (selectedCharacter) {
                                                                                        return '@' + selectedCharacter.flavor.traits.name;
                                                                                    }
                                                                                }
                                                                            }

                                                                            return '@' + node.id;
                                                                        }
                                                                    }
                                                                })
                                                            }} />
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </>
                                    )
                                })}
                            <div />
                        </InfiniteScroll>
                    </div>
                </Paper>
            }
            <Box className={classes.game}>

            </Box>
        </Box>
    )

}

export default CampaignLogs;