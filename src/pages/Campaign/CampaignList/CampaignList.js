import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { addCampaigns } from "shared/actions/index";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import TableRow from '@material-ui/core/TableRow';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import Api from 'helpers/api'
import SEO from 'components/SEO/SEO';

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
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
        textAlign: "right"
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

function CampaignList(props) {
    const classes = useStyles();
    const [campaigns, setCampaigns] = useState([]);
    const [selectedData, setSelectedData] = useState();
    const [players, setPlayers] = useState([]);
    const [dms, setDms] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
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
                <SEO>
                    <title>{"Campañas | Lierno App"}</title>
                </SEO>
                <Paper variant="outlined" className={classes.profileBox}>
                    <Box className={classes.addButton}>
                        <IconButton
                            component="span"

                            onClick={() => props.history.push("/campaigns/add")}>
                            <AddIcon />
                        </IconButton>
                    </Box>
                    <Divider />
                    <Table className={classes.table}>
                        <TableBody>
                            {campaigns.length > 0 && campaigns
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(campaign => {
                                    const dungeonMaster = dms.filter(dm => campaign.dm === dm.id)[0]
                                    return (
                                        <TableRow hover component={Link} to={'/campaigns/' + campaign._id} className={classes.link}>
                                            <TableCell style={{ padding: "1.5rem" }}>
                                                <Box style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <Box style={{ margin: "0 1rem 0 0" }}>
                                                        <Box component="div" >
                                                            <Typography variant="body" style={{ fontWeight: "500", fontSize: "1rem" }}>
                                                                {campaign.name}
                                                            </Typography>
                                                        </Box>
                                                        <Box component="div">
                                                            <Typography variant="caption">
                                                                {campaign.flavor.game}
                                                            </Typography>
                                                        </Box>
                                                        <Box component="div">
                                                            <Typography variant="caption">
                                                                {dungeonMaster && dungeonMaster["name"]}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    <Box>
                                                        {props.profile && props.profile._id === campaign.dm &&
                                                            <Link>
                                                                <IconButton onClick={(e) => {
                                                                    setSelectedData(campaign._id)
                                                                    return handleMenu(e)
                                                                }}>
                                                                    <MoreHorizIcon />
                                                                </IconButton>
                                                            </Link>}
                                                    </Box>
                                                </Box>
                                                <Box style={{ marginTop: "1rem" }}>
                                                    <Typography variant="body2">{campaign.flavor.synopsis}</Typography>
                                                </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(CampaignList);