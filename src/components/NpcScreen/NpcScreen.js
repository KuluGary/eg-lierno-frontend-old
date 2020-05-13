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
    }
}));

const mapStateToProps = state => {
    return { npcs: state.npcs }
}

const mapDispatchToProps = dispatch => {
    return { addNpcs: npcs => dispatch(addNpcs(npcs)) };
}

function NpcScreen(props) {
    const classes = useStyles();
    const [npcs, setNpcs] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const width = useWidth();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        if (!props.npcs) {
            Api.fetchInternal('/npc')
                .then(res => {
                    props.addNpcs(res)
                    setNpcs(res)
                });
        }  else {
            setNpcs(props.npcs)
        }
    }, [])

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <div className={classes.root}>
                <Paper variant="outlined" className={classes.profileBox}>
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
                                {/* <TableCell></TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {npcs.length > 0 && npcs
                                .sort((a, b) => (a.stats.challengeRating > b.stats.challengeRating) ? 1 : -1)
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
            </div>
        </ Slide>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NpcScreen);