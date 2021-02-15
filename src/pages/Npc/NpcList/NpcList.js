import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Image from 'components/Image/Image'
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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Api from 'helpers/api'
import { useWidth } from 'helpers/media-query';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Button, Collapse, Divider, Select } from '@material-ui/core';

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
    },
    formControl: {
        margin: "1rem 1.2rem"
    }
}));

const mapStateToProps = state => {
    return { npcs: state.npcs, profile: state.profile }
}

const mapDispatchToProps = dispatch => {
    return { addNpcs: npcs => dispatch(addNpcs(npcs)) };
}

function NpcList(props) {
    const classes = useStyles();
    const [npcs, setNpcs] = useState([]);
    const [npcsToDisplay, setNpcsToDisplay] = useState([]);
    const [selectedData, setSelectedData] = useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const open = Boolean(anchorEl);
    const [step, setStep] = useState(0.125)
    const width = useWidth();
    const theme = useTheme();
    const [npcSizes] = useState([
        "Diminuto",
        "Pequeño",
        "Mediano",
        "Grande",
        "Gigantesco"
    ]);
    const [npcTypes] = useState([
        "Humano",
        "Aberración", "Bestia", "Celestial",
        "Construcción", "Dragón", "Elemental",
        "Hada", "Felón", "Gigante",
        "Humanoide", "Goblinoide", "Monstruosidad",
        "Viscoso", "Planta", "No-muerto"
    ])
    const [openFilter, setOpenFilter] = React.useState(false);
    const [filter, setFilter] = useState({});

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

    const filterData = () => {
        let newMonsters = [...npcs];

        if (filter.name) {
            newMonsters = newMonsters.filter(item => item.name.includes(filter.name));
        }

        if (filter.size) {
            newMonsters = newMonsters.filter(item => {
                let nonGenderedSize = item.stats.size;

                const sizes = [["Diminuto", "Diminuta", "Diminute"],
                ["Pequeño", "Pequeña", "Pequeñe"],
                ["Mediano", "Mediana", "Mediane"],
                    "Grande",
                    "Enorme",
                ["Gigantesco", "Gigantesca", "Gigantesque"]];


                sizes.forEach(size => {
                    if (Array.isArray(size)) {
                        if (size.includes(item.stats.size)) {
                            nonGenderedSize = size[0];
                        }
                    }
                })

                return nonGenderedSize === filter.size;
            });
        }

        if (filter.type) {
            newMonsters = newMonsters.filter(item => {
                let check = item.stats.race;
                if (["Humano", "Humana", "Humane"].includes(item.stats.race)) {
                    check = "Humano";
                }

                return check === filter.type
            });
        }

        if (filter.cr) {
            newMonsters = newMonsters.filter(item => item.stats.challengeRating === filter.cr)
        }

        setNpcsToDisplay(newMonsters);
    }

    useEffect(() => filterData(), [filter])

    function modifyStep(e) {
        const value = parseFloat(e.target.value);

        if (value <= 0) {
            setStep(0.125)
        } else if (value <= 0.25) {
            setStep(0.25)
        } else if (value <= 0.5) {
            setStep(0.5)
        } else if (value > 0.5) {
            setStep(1)
        }

        setFilter({ ...filter, cr: e.target.value })
    }

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
                    setNpcs(props.campaign ? npcs.filter(npc => npc.flavor.campaign.some(campaign => campaign.campaignId === props.campaign)) : npcs)
                    setNpcsToDisplay(props.campaign ? npcs.filter(npc => npc.flavor.campaign.some(campaign => campaign.campaignId === props.campaign)) : npcs)
                });
        } else {
            setNpcs(props.campaign ? props.npcs.filter(npc => npc.flavor.campaign.some(campaign => campaign.campaignId === props.campaign)) : props.npcs)
            setNpcsToDisplay(props.campaign ? props.npcs.filter(npc => npc.flavor.campaign.some(campaign => campaign.campaignId === props.campaign)) : props.npcs)
        }
    }, [])

    return (
        <div className={classes.root}>
            <Box component={props.campaign ? "span" : Paper}>
                <Box className={classes.searchContainer}>
                    <FormControl style={{ marginLeft: "1rem" }}>
                        <InputLabel htmlFor="input-with-icon-adornment">Busca</InputLabel>
                        <Input
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value.length > 3) {
                                    setNpcsToDisplay(npcs.filter(i => i.name.includes(value)))
                                } else {
                                    setNpcsToDisplay(npcs);
                                }
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            } />
                    </FormControl>
                    <IconButton
                        onClick={() => setOpenFilter(!openFilter)}>
                        <FilterListIcon />
                    </IconButton>
                    <IconButton
                        component="span"
                        className={classes.addButton}
                        onClick={() => props.history.push("/npc/add")}>
                        <AddIcon />
                    </IconButton>
                </Box>
                <Divider />
                <Collapse in={openFilter} timeout="auto" unmountOnExit>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filter.type || npcTypes[0]}
                            onChange={(e) => setFilter({ ...filter, type: e.target.value })}>
                            {npcTypes.map(item => <MenuItem value={item}>{item}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Tamaño</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filter.size || npcSizes[0]}
                            onChange={(e) => setFilter({ ...filter, size: e.target.value })}>
                            {npcSizes.map(item => <MenuItem value={item}>{item}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Desafío</InputLabel>
                        <Input
                            required
                            type="number"
                            id="challenge"
                            name="challenge"
                            onChange={(e) => {
                                modifyStep(e);
                            }}
                            value={filter.cr || 0.125}
                            defaultValue={step}
                            inputProps={{
                                step: step,
                                min: 0,
                                max: 30
                            }}
                        />
                    </FormControl>
                    <Box component="div" style={{ textAlign: "right", margin: "1rem" }}>
                        <Button
                            color="default"
                            variant="outlined"
                            onClick={() => setFilter({})}>
                            Borrar
                            </Button>
                    </Box>
                    <Divider />
                </Collapse>
                <Table className={classes.table}>
                    <TableBody>
                        {npcsToDisplay.length > 0 && npcsToDisplay
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(npc => (
                                <TableRow hover component={Link} to={'/npc/' + npc._id} className={classes.link} style={{
                                    opacity: npc.flavor.campaign[npc.flavor.campaign.findIndex(campaign => props.campaign === campaign.campaignId)].unlocked ? 1 : .5
                                }}>
                                    {(width !== "xs") &&
                                        <>
                                            <TableCell style={{ padding :"1.5rem" }}>
                                                <Box style={{ display: "flex", alignItems: "center" }}>
                                                    <Image
                                                        mode="background"
                                                        usage="avatar"
                                                        src={npc.flavor.imageUrl}
                                                        containerStyle={{
                                                            border: `1px solid ${theme.palette.divider}`,
                                                            borderRadius: "100%",
                                                            width: "4vw",
                                                            height: "4vw",
                                                        }}
                                                        style={{
                                                            backgroundImage: `url(${npc.flavor.imageUrl})`,
                                                            width: "4vw",
                                                            height: "4vw",
                                                            backgroundSize: "cover",
                                                            borderRadius: "100%"
                                                        }} />
                                                    <Box style={{ margin: "0 1rem" }}>
                                                        <Box component="div" >
                                                            <Typography variant="body" style={{ fontWeight: "500", fontSize: "1rem" }}>
                                                                {npc.name}
                                                            </Typography>
                                                        </Box>
                                                        <Box component="div">
                                                            <Typography variant="caption">
                                                            {[npc.stats.race, npc.flavor.class].filter(item => item).join(", ")}
                                                            </Typography>
                                                        </Box>
                                                        <Box component="div">
                                                            <Typography variant="caption">
                                                                {"Dificultad " + npc.stats.challengeRatingStr + (npc.stats.experiencePoints && ' (' + npc.stats.experiencePoints + ' XP)')}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box style={{ marginTop: "1rem", maxHeight: "4em", overflow: "hidden", }}>
                                                    <span dangerouslySetInnerHTML={{ __html: npc.flavor.description }} />
                                                </Box>
                                            </TableCell>
                                        </>}
                                    {(props.profile && props.dm) && props.profile._id === props.dm && <TableCell>
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
                                rowsPerPageOptions={[5, 10, 15]}
                                colSpan={12}
                                labelRowsPerPage={'Filas por página: '}
                                labelDisplayedRows={
                                    ({ from, to, count }) => {
                                        return '' + from + '-' + to + ' de ' + count
                                    }
                                }
                                count={npcsToDisplay.length}
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
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(NpcList);