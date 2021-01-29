import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { addCampaigns } from "../../shared/actions/index";
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
    },
    cell: {
        width: "10%"
    }
}));

const mapStateToProps = state => {
    return {
        profile: state.profile,
        campaigns: state.campaigns
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCampaigns: campaigns => dispatch(addCampaigns(campaigns))
    };
}

function CampaignScreen(props) {
    const classes = useStyles();
    const [campaigns, setCampaigns] = useState([]);
    const [selectedData, setSelectedData] = useState();
    const [players, setPlayers] = useState([]);
    const [dms, setDms] = useState([]);
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
        if (!props.campaigns) {
            Api.fetchInternal('/campaigns')
                .then(res => {
                    props.addCampaigns(res)
                    const dungeonMasters = [];
                    res.forEach(campaign => (
                        Api.fetchInternal('/auth/players', {
                            method: "POST",
                            body: JSON.stringify({
                                dmId: campaign.dm,
                                userIds: campaign.players
                            })
                        })
                            .then(res => {
                                if (dungeonMasters.findIndex(dungeonMaster => dungeonMaster.id === res.dm.id) < 0) {
                                    dungeonMasters.push(res.dm);
                                }

                                setPlayers([...players, res.players]);
                            })
                    ))

                    setDms(dungeonMasters)
                    setCampaigns(res)
                });
        } else {
            setCampaigns(props.campaigns)
        }
    }, [])

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <div className={classes.root}>
                <Paper variant="outlined" className={classes.profileBox}>
                    <IconButton
                        component="span"
                        className={classes.addButton}
                        onClick={() => props.history.push("/campaigns/add")}>
                        <AddIcon />
                    </IconButton>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                {(width !== "xs") && <TableCell>Juego</TableCell>}
                                <TableCell>DM</TableCell>
                                {(width !== "xs") && <TableCell>Sinopsis</TableCell>}
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {campaigns.length > 0 && campaigns
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(campaign => {
                                    const dungeonMaster = dms.filter(dm => campaign.dm === dm.id)[0]
                                    return (
                                        <TableRow hover component={Link} to={'/campaigns/' + campaign._id} className={classes.link}>
                                            <TableCell className={classes.cell}>{campaign.name}</TableCell>
                                            {(width !== "xs") && <TableCell className={classes.cell}>{campaign.flavor.game}</TableCell>}
                                            <TableCell className={classes.cell}>{dungeonMaster && dungeonMaster["name"]}</TableCell>
                                            {(width !== "xs") && <TableCell>{campaign.flavor.synopsis}</TableCell>}
                                            <TableCell align="right">
                                                {props.profile && props.profile._id === campaign.dm &&
                                                    <Link>
                                                        <IconButton onClick={(e) => {
                                                            setSelectedData(campaign._id)
                                                            return handleMenu(e)
                                                        }}>
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                    </Link>}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
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
                                    count={campaigns.length}
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

export default connect(mapStateToProps, mapDispatchToProps)(CampaignScreen);