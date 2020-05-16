import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { addNpcs } from "../../shared/actions/index";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
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
    return { npcs: state.npcs, profile: state.profile }
}

const mapDispatchToProps = dispatch => {
    return { addNpcs: npcs => dispatch(addNpcs(npcs)) };
}

function NpcScreen(props) {
    const classes = useStyles();
    const [npcs, setNpcs] = useState([]);
    const [selectedData, setSelectedData] = useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const open = Boolean(anchorEl);
    const width = useWidth();

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
        if (!props.npcs) {
            Api.fetchInternal('/npc')
                .then(res => {
                    const npcs = res.sort((a, b) => {
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
                    props.addNpcs(npcs)
                    setNpcs(npcs)
                });
        } else {
            setNpcs(props.npcs)
        }
    }, [])

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <div className={classes.root}>
                <Paper variant="outlined" className={classes.profileBox}>
                    <IconButton
                        component="span"
                        className={classes.addButton}
                        onClick={() => props.history.push("/npc/add")}>
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
                                        <TableCell>Descripción</TableCell>
                                    </>
                                }
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {npcs.length > 0 && npcs
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(npc => (
                                    <TableRow component={Link} to={'/npc/' + npc._id} className={classes.link}>
                                        {(width !== "xs") &&
                                            <>
                                                <TableCell>
                                                    <div style={{
                                                        backgroundImage: `url(${npc.flavor.imageUrl})`,
                                                        width: "5vw",
                                                        height: "5vw",
                                                        backgroundSize: "cover",
                                                        borderRadius: 10
                                                    }} />
                                                </TableCell>
                                            </>}
                                        <TableCell>{npc.name}</TableCell>
                                        {(width !== "xs" && width !== "sm") &&
                                            <>
                                                <TableCell>{npc.flavor.description}</TableCell>
                                            </>}
                                        {props.profile && props.profile._id === npc.flavor.owner && <TableCell>
                                            <Link>
                                                <IconButton onClick={(e) => {
                                                    setSelectedData(npc._id)
                                                    return handleMenu(e)
                                                }}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            </Link>
                                        </TableCell>}
                                    </TableRow>
                                ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={5, 10, 15}
                                    colspan={12}
                                    count={npcs.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage} />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Paper>
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
                    <MenuItem onClick={() => props.history.push("/npc/add/" + selectedData)}>Editar</MenuItem>
                </Menu>
            </div>
        </ Slide>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NpcScreen);