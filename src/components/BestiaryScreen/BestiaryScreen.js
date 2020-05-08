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
import Api from '../../helpers/api'
import { useWidth } from '../../helpers/media-query';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    table: {
        // minWidth: 650,
        width: "100%"
    },
    avatar: {
        width: "20%",
        height: "20%"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none'
    }
}));

const mapStateToProps = state => {
    return { monsters: state.monsters }
}

const mapDispatchToProps = dispatch => {
    return { addMonsters: monsters => dispatch(addMonsters(monsters)) };
}

function BestiaryScreen(props) {
    const classes = useStyles();
    const [monsters, setMonsters] = useState([]);
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
        if (!props.monsters) {
            Api.fetchInternal('/bestiary')
                .then(res => {
                    const monsters = res.sort((a, b) => (a.stats.challengeRating > b.stats.challengeRating) ? 1 : -1)
                    props.addMonsters(monsters)
                    setMonsters(monsters)
                });
        } else {
            setMonsters(props.monsters)
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
                                        <TableCell>Desafío</TableCell>
                                        <TableCell>Descripción</TableCell>
                                    </>
                                }
                                {/* <TableCell></TableCell> */}
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
                                                        backgroundSize: "cover"
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
                </Paper>
            </div>
        </Slide>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(BestiaryScreen);