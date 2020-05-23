import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { addMonsters } from "../../shared/actions/index";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Slide from '@material-ui/core/Slide';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Api from '../../helpers/api'
import { useWidth } from '../../helpers/media-query';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    table: {
        width: "100%"
    },
    avatar: {
        width: "20%",
        height: "20%",
        borderRadius: 10
    },
    link: {
        color: 'inherit',
        textDecoration: 'none'
    },
    addButton: {
        padding: 8,
        float: "right"
    }
}));

const mapStateToProps = state => {
    return { monsters: state.monsters, profile: state.profile }
}

const mapDispatchToProps = dispatch => {
    return { addMonsters: monsters => dispatch(addMonsters(monsters)) };
}

function BestiaryScreen(props) {
    const classes = useStyles();
    const [monsters, setMonsters] = useState([]);
    const [selectedData, setSelectedData] = useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const width = useWidth();
    const open = Boolean(anchorEl);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (!props.monsters) {
            Api.fetchInternal('/bestiary')
                .then(res => {
                    const monsters = res.sort((a, b) => {
                        if (a.stats.challengeRating > b.stats.challengeRating) {
                            return 1
                        } else if (a.stats.challengeRating < b.stats.challengeRating) {
                            return -1
                        } else {
                            if (a.name > b.name) {
                                return 1
                            } else {
                                return -1
                            }
                        }
                    })
                    props.addMonsters(monsters)
                    setMonsters(props.campaign ? monsters.filter(monster => monster.flavor.campaign.some(campaign => campaign.campaignId === props.campaign)) : monsters)
                });
        } else {
            setMonsters(props.campaign ? props.monsters.filter(monster => monster.flavor.campaign.some(campaign => campaign.campaignId === props.campaign)) : props.monsters)
        }
    }, [])

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <div className={classes.root}>
                <Box component={props.campaign ? "span" : Paper} variant="outlined">
                    <IconButton
                        component="span"
                        className={classes.addButton}
                        onClick={() => props.history.push("/bestiary/add")}>
                        <AddIcon />
                    </IconButton>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {(width !== "xs") &&
                                    <>
                                        <TableCell></TableCell>
                                    </>}
                                <TableCell>Nombre</TableCell>
                                {(width !== "xs" && width !== "sm") &&
                                    <>
                                        <TableCell>Desafío</TableCell>
                                        <TableCell>Descripción</TableCell>
                                    </>
                                }
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {monsters.length > 0 && monsters
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(monster => (
                                    <TableRow component={Link} to={'/bestiary/' + monster._id} className={classes.link}>
                                        {(width !== "xs") &&
                                            <>
                                                <TableCell>
                                                    <div style={{
                                                        backgroundImage: `url(${monster.flavor.imageUrl})`,
                                                        width: "5vw",
                                                        height: "5vw",
                                                        backgroundSize: "cover",
                                                        borderRadius: 10,
                                                        backgroundColor: "white"
                                                    }} />
                                                </TableCell>
                                            </>}
                                        <TableCell>{monster.name}</TableCell>
                                        {(width !== "xs" && width !== "sm") &&
                                            <>
                                                <TableCell>{monster.stats.challengeRatingStr}</TableCell>
                                                <TableCell style={{
                                                    maxWidth: "30vw",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}>
                                                    {monster.flavor.description}
                                                </TableCell>
                                            </>}
                                        {console.log(props.profile._id, props.dm)}
                                        {(props.profile && props.dm) && props.profile._id === props.dm && <TableCell align="right">
                                            <Link>
                                                <IconButton onClick={(e) => {
                                                    setSelectedData(monster._id)
                                                    return handleMenu(e)
                                                }}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            </Link>
                                        </TableCell>}
                                        {/* <TableCell><NavLink className={classes.link} to={'/bestiary/' + monster._id}><NavigateNextIcon /></NavLink></TableCell> */}
                                    </TableRow>
                                ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={5, 10, 15}
                                    colspan={12}
                                    count={monsters.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage} />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Box>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => props.history.push("/bestiary/add/" + selectedData)}>Editar</MenuItem>
                </Menu>
            </div>
        </Slide>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(BestiaryScreen);