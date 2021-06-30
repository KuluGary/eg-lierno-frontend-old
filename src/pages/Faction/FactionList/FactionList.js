import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { addNpcs } from "shared/actions/index";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Api from 'helpers/api'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Image from "components/Image/Image";

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
    },
    searchContainer: {
        display: "flex",
        justifyContent: "space-between",
        position: "absolute",
        top: "0",
        right: ".5rem",
        alignItems: "center",
        width: "25%"
    }
}));

const mapStateToProps = state => {
    return { npcs: state.npcs, profile: state.profile }
}

const mapDispatchToProps = dispatch => {
    return { addNpcs: npcs => dispatch(addNpcs(npcs)) };
}

function FactionList(props) {
    const classes = useStyles();
    const [factions, setFactions] = useState([]);
    const [factionsToDisplay, setFactionsToDisplay] = useState([]);
    const [selectedData] = useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const open = Boolean(anchorEl);
    const theme = useTheme();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (!props.factions) {
            Api.fetchInternal('/campaigns/factions/' + props.campaignId)
                .then(res => {
                    const factions = res;

                    setFactions(factions)
                    setFactionsToDisplay(factions)
                });
        } else {
            setFactions(props.factions)
            setFactionsToDisplay(props.factions)
        }
    }, []);

    const getMemberCount = (memberObj) => {
        let count = 0;

        if (memberObj) {
            Object.keys(memberObj).forEach(key => {
                memberObj[key].forEach(() => count++);
            })
        }

        return count;
    }

    return (
        <Grid item xs={12} className={classes.root}>
            <Box component={props.campaign ? "span" : Paper} variant="outlined">
                <Box className={classes.searchContainer}>
                    <FormControl style={{ marginLeft: "1rem" }}>
                        <InputLabel htmlFor="input-with-icon-adornment">Busca</InputLabel>
                        <Input
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value.length > 3) {
                                    setFactionsToDisplay(factions.filter(i => i.name.includes(value)))
                                } else {
                                    setFactionsToDisplay(factions);
                                }
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            } />
                    </FormControl>
                    <IconButton
                        component="span"
                        className={classes.addButton}
                        onClick={() => props.history.push("/npc/add")}>
                        <AddIcon />
                    </IconButton>
                </Box>
                <Table className={classes.table}>
                    <TableBody>
                        {factionsToDisplay.length > 0 && factionsToDisplay
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(faction => (
                                <TableRow hover component={Link} to={{
                                    pathname: '/factions/' + faction._id,
                                    campaignId: props.campaignId
                                    }} className={classes.link} style={{ opacity: faction.unlocked ? 1 : .5 }}>
                                    <TableCell style={{ padding: "1.5rem" }}>
                                        <Box style={{ display: "flex", alignItems: "center" }}>
                                            <Image
                                                mode="background"
                                                usage="avatar"
                                                src={faction.image}
                                                containerStyle={{
                                                    border: `1px solid ${theme.palette.divider}`,
                                                    borderRadius: "100%",
                                                    width: "4vw",
                                                    height: "4vw",
                                                }}
                                                style={{
                                                    backgroundImage: `url(${faction.image})`,
                                                    width: "4vw",
                                                    height: "4vw",
                                                    backgroundSize: "cover",
                                                    borderRadius: "100%"
                                                }} />
                                            <Box style={{ margin: "0 1rem" }}>
                                                <Box component="div" >
                                                    <Typography variant="body" style={{ fontWeight: "500", fontSize: "1rem" }}>
                                                        {faction.name}
                                                    </Typography>
                                                </Box>
                                                <Box component="div">
                                                    <Typography variant="caption">
                                                        {'Número de miembros: ' + getMemberCount(faction.members)}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box style={{ marginTop: "1rem", maxHeight: "4em", overflow: "hidden", }}>
                                            <span dangerouslySetInnerHTML={{ __html: faction.description }} />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15]}
                                colSpan={12}
                                labelRowsPerPage={'Filas por página: '}
                                labelDisplayedRows={
                                    ({ from, to, count }) => {
                                        return '' + from + '-' + to + ' de ' + count
                                    }
                                }
                                count={factions.length}
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
                <MenuItem onClick={() => props.history.push("/npc/add/" + selectedData)}>Editar</MenuItem>
            </Menu>
        </Grid>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(FactionList);