import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { addCampaigns } from "shared/actions/index";
import {
    Paper,
    Table,
    TableBody,
    TableFooter,
    TableRow,
    TableCell,
    TablePagination,
    Typography,
    Slide,
    Divider,
    Menu,
    MenuItem,
    Box,
    IconButton,
    CircularProgress,
} from "@material-ui/core";
import {
    Add as AddIcon,
    MoreHoriz as MoreHorizIcon,
    Error as ErrorIcon,
} from "@material-ui/icons";
import SEO from "components/SEO/SEO";
import { useQuery } from "@apollo/client";
import { CAMPAIGN_LIST_QUERY } from "helpers/graphql/queries/campaign";
import Api from "helpers/api";

const useStyles = makeStyles((theme) => ({
    table: {
        width: "100%",
    },
    avatar: {
        width: "20%",
        height: "20%",
    },
    link: {
        color: "inherit",
        textDecoration: "none",
    },
    addButton: {
        textAlign: "right",
    },
    cell: {
        width: "10%",
    },
}));

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        campaigns: state.campaigns,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addCampaigns: (campaigns) => dispatch(addCampaigns(campaigns)),
    };
};

function CampaignList(props) {
    const classes = useStyles();
    const [campaigns, setCampaigns] = useState([]);
    const [selectedData, setSelectedData] = useState();
    const [players, setPlayers] = useState([]);
    const [dms, setDms] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // const [isLoading, setIsLoading] = useState(false);
    const { data, loading, error } = useQuery(CAMPAIGN_LIST_QUERY);
    const open = Boolean(anchorEl);

    const handleChangePage = (_, newPage) => {
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
        if (data?.get_user_campaigns.campaigns) {
            setCampaigns(data.get_user_campaigns.campaigns);
        }
    }, [data]);

    if (loading) {
        return (
            <Paper variant="outlined" style={{ height: "80vh" }}>
                <Box
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    <CircularProgress color="inherit" />
                </Box>
            </Paper>
        );
    }

    if (error || Api.hasApolloErrors(data)) {
        return (
            <Paper variant="outlined" style={{ height: "80vh" }}>
                <Box
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    <Box style={{ textAlign: "center" }}>
                        <ErrorIcon fontSize="large" />
                        <Typography variant="h6">
                            Error cargando los datos
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        );
    }

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
                            onClick={() => props.history.push("/campaigns/add")}
                        >
                            <AddIcon />
                        </IconButton>
                    </Box>
                    <Divider />
                    <Table className={classes.table}>
                        <TableBody>
                            {campaigns.length > 0 &&
                                campaigns
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage,
                                    )
                                    .map((campaign) => {
                                        const dungeonMaster = dms.filter(
                                            (dm) => campaign.dm === dm.id,
                                        )[0];
                                        return (
                                            <TableRow
                                                hover
                                                component={Link}
                                                to={
                                                    "/campaigns/" + campaign._id
                                                }
                                                className={classes.link}
                                            >
                                                <TableCell
                                                    style={{
                                                        padding: "1.5rem",
                                                    }}
                                                >
                                                    <Box
                                                        style={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "space-between",
                                                        }}
                                                    >
                                                        <Box
                                                            style={{
                                                                margin: "0 1rem 0 0",
                                                            }}
                                                        >
                                                            <Box component="div">
                                                                <Typography
                                                                    variant="body1"
                                                                    style={{
                                                                        fontWeight:
                                                                            "500",
                                                                        fontSize:
                                                                            "1rem",
                                                                    }}
                                                                >
                                                                    {
                                                                        campaign.name
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                            <Box component="div">
                                                                <Typography variant="caption">
                                                                    {
                                                                        campaign
                                                                            .flavor
                                                                            .game
                                                                    }
                                                                </Typography>
                                                            </Box>
                                                            <Box component="div">
                                                                <Typography variant="caption">
                                                                    {dungeonMaster &&
                                                                        dungeonMaster[
                                                                            "name"
                                                                        ]}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                        <Box>
                                                            {props.profile &&
                                                                props.profile
                                                                    ._id ===
                                                                    campaign.dm && (
                                                                    <Link>
                                                                        <IconButton
                                                                            onClick={(
                                                                                e,
                                                                            ) => {
                                                                                setSelectedData(
                                                                                    campaign._id,
                                                                                );
                                                                                return handleMenu(
                                                                                    e,
                                                                                );
                                                                            }}
                                                                        >
                                                                            <MoreHorizIcon />
                                                                        </IconButton>
                                                                    </Link>
                                                                )}
                                                        </Box>
                                                    </Box>
                                                    <Box
                                                        style={{
                                                            marginTop: "1rem",
                                                        }}
                                                    >
                                                        <Typography variant="body2">
                                                            {
                                                                campaign.flavor
                                                                    .synopsis
                                                            }
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 15]}
                                    colSpan={12}
                                    labelRowsPerPage={"Filas por página: "}
                                    labelDisplayedRows={({
                                        from,
                                        to,
                                        count,
                                    }) => {
                                        return (
                                            "" +
                                            from +
                                            "-" +
                                            to +
                                            " de " +
                                            count
                                        );
                                    }}
                                    count={campaigns.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={
                                        handleChangeRowsPerPage
                                    }
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Paper>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem
                        onClick={() =>
                            props.history.push("/npc/add/" + selectedData)
                        }
                    >
                        Editar
                    </MenuItem>
                </Menu>
            </div>
        </Slide>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignList);
