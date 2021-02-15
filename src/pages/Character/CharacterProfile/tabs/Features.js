import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { StringUtil } from "helpers/string-util";
import { connect } from "react-redux";
import { addClasses, addRaces } from "shared/actions/index";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Api from "helpers/api";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import { Checkbox, Collapse, MenuItem, Select, TableCell, TableRow } from '@material-ui/core';
import ActionGeneration from '../components/FeatureGeneration/ActionGeneration';
import ReactionGeneration from '../components/FeatureGeneration/ReactionGeneration';
import BonusActionGeneration from '../components/FeatureGeneration/BonusActionGeneration';
import AdditionalAbilities from '../components/FeatureGeneration/AdditionalAbilities';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles({
    root: {
        width: "100%",
        paddingLeft: "4px"
    },
    paper: {
        padding: "1rem"
    },
    action: {
        margin: "1rem 0",
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
    fullWidthDivier: {
        margin: ".5rem 0"
    },
    image: {
        maxHeight: "75vh",
        float: "right",
        display: "block",
        margin: "1rem",
        borderRadius: 20
    },
    resize: {
        fontSize: 11
    },
    resize2: {
        fontSize: 14
    },
    title: {
        fontSize: 14
    },
    level: {
        textAlign: 'center',
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },

        "& input[type=number]": {
            "-moz-appearance": "textfield"
        }
    }
});

const mapStateToProps = state => {
    return { classes: state.classes }
}

const mapDispatchToProps = dispatch => {
    return {
        addClasses: classes => dispatch(addClasses(classes)),
        addRaces: races => dispatch(addRaces(races))
    };
}

const Row = (props) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const { item, array, index, type, editFunc, setSelectedData, modifyItem, handleMenu, checks } = props;

    return (
        <>
            <TableRow>
                <TableCell style={{ width: "5%" }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <TextField
                        fullWidth
                        InputProps={{
                            classes: {
                                input: classes.resize2,
                            },
                        }}
                        placeholder={'Nombre'}
                        disabled={!props.editable}
                        value={item.name}
                        style={{ width: "50%" }}
                        onChange={(event) => {
                            const newItem = { ...item };
                            newItem["name"] = event.target.value;
                            modifyItem(array, index, newItem, type)
                        }} />
                </TableCell>
                {props.editable && editFunc &&
                    <TableCell align="right">
                        <IconButton onClick={(e) => {
                            setSelectedData({
                                item,
                                index,
                                array,
                                type,
                                editFunc
                            })
                            return handleMenu(e)
                        }}>
                            <MoreVertIcon size="small" />
                        </IconButton>
                    </TableCell>}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {item.usage_num && item.usage_type &&
                            <Box style={{ display: "flex", alignItems: "center" }}>
                                {checks}
                                <Box style={{ fontSize: 11 }}>
                                    {item.usage_type === "long_rest" ? "por descanso largo" : "por descanso corto"}
                                </Box>
                            </ Box>
                        }
                        {/* <TextField
                            multiline
                            fullWidth
                            placeholder={'Descripción'}
                            disabled={!props.editable}
                            onChange={(event) => {
                                const newItem = { ...item };
                                newItem["description"] = event.target.value;
                                modifyItem(array, index, newItem, type)
                            }}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                            }}
                            value={item.description} /> */}
                            <div style={{ margin: ".5rem 0" }} dangerouslySetInnerHTML={{ __html: StringUtil.parseHTML(item.description) }} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

function Features(props) {
    const classes = useStyles();
    const [characterClasses, setCharacterClasses] = useState();
    const [classOptions, setClassOptions] = useState([]);
    const [selectedData, setSelectedData] = useState();
    const { features, race } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (!props.classes) {
            Api.fetchInternal('/classes/')
                .then(res => {
                    props.addClasses(res)
                    setClassOptions(res);
                    let characterClassArray = features.classes.map(apiClass => apiClass.classId)
                    let selectedClasses = res.filter(apiClass => characterClassArray.includes(apiClass._id))
                    setCharacterClasses(selectedClasses)
                })
        } else {
            setClassOptions(props.classes);
            let characterClassArray = features.classes.map(apiClass => apiClass.classId)
            let selectedClasses = props.classes.filter(apiClass => characterClassArray.includes(apiClass._id))
            setCharacterClasses(selectedClasses)
        }
    }, [])

    const generateRow = (item, index, array, type, editFunc = null) => {
        const checks = [];

        if (item.usage_num) {
            for (let i = 0; i < parseInt(item.usage_num.max); i++) {
                checks.push(
                    <Checkbox
                        color="default"
                        size="small"
                        checked={(item.usage_num.current - 1) >= i}
                        onChange={() => {
                            const action = { ...item };
                            action["usage_num"]["current"] =
                                ((item.usage_num.current - 1) >= i) ? i : i + 1

                            const newActions = [...features[type]];
                            newActions[index] = action;

                            props.changeStats(type, newActions)
                        }} />)

            }
        }

        return (
            <Row
                item={item}
                array={array}
                index={index}
                type={type}
                editFunc={editFunc}
                setSelectedData={setSelectedData}
                modifyItem={modifyItem}
                handleMenu={handleMenu}
                checks={checks}
                editable={props.editable}
            />
        )
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const modifyItem = (arr, index, item, type) => {
        let newItems = [...arr];

        newItems[index] = item;

        props.changeStats(type, newItems);
    }

    const removeItem = (arr, type, index) => {
        let newItems = [...arr];

        newItems.splice(index, 1);

        props.changeStats(type, newItems);
    }

    const changeClass = (index, event) => {
        let newItems = [...props.features.classes];

        const selectedClass = classOptions[classOptions.findIndex(item => item._id === event.target.value)];

        newItems[index] = {
            ...props.features.classes[index],
            className: selectedClass.name,
            classId: selectedClass._id
        }

        props.changeStats("classes", newItems);
    }

    const changeSubclass = (index, event, type) => {
        let newItems = [...props.features.classes];

        newItems[index] = {
            ...props.features.classes[index],
            [type]: event.target.value
        }

        props.changeStats("classes", newItems);
    }

    const changeClassLevel = (index, event) => {
        let newItems = [...props.features.classes];

        newItems[index] = {
            ...props.features.classes[index],
            classLevel: parseInt(event.target.value)
        }

        props.changeStats("classes", newItems);
    }

    const addClass = () => {
        props.changeStats("classes", [...props.features.classes, {
            className: classOptions[0].name,
            subclassName: null,
            classLevel: 1,
            classId: classOptions[0]._id
        }])
    }

    const removeClass = (index) => {
        let newItems = [...props.features.classes];

        newItems.splice(index, 1);
        props.changeStats("classes", newItems);
    }

    return (
        <>
            <Grid container className={classes.root} spacing={1}>
                <Grid item xs={12} lg={5} container style={{ rowGap: 8 }}>
                    <Grid item lg={12} xs={12} >
                        <Paper variant="outlined" className={classes.paper}>
                            <Box style={{ position: "relative" }}>
                                <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Box />
                                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'CLASES'}</Typography>
                                    {props.editable ?
                                        <IconButton size="small" onClick={addClass}>
                                            <AddIcon />
                                        </IconButton> : <Box />
                                    }
                                </Box>
                            </Box>
                            {characterClasses && props.features.classes.map((characterClass, index) => {
                                const extendedData = classOptions.filter(item => item._id === characterClass.classId)[0];
                                return (
                                    <Box>
                                        <Box style={{ display: "flex" }}>
                                            <Box>
                                                <Select
                                                    value={characterClass.classId}
                                                    disabled={!props.editable}
                                                    onChange={(event) => changeClass(index, event)}>
                                                    {classOptions.map(option => <MenuItem value={option._id}>{StringUtil.generizaClase(option.name, props.pronoun)}</MenuItem>)}
                                                </Select>
                                                <TextField
                                                    type="number"
                                                    value={characterClass.classLevel}
                                                    onChange={(event) => changeClassLevel(index, event)}
                                                    disabled={!props.editable}
                                                    className={classes.level}
                                                    InputProps={{
                                                        classes: {
                                                            input: classes.level,
                                                        },
                                                        inputProps: { min: 1, max: 20 }
                                                    }} />
                                            </Box>
                                            {props.editable &&
                                                <IconButton size="small" onClick={() => removeClass(index)}>
                                                    <CloseIcon size="small" />
                                                </IconButton>
                                            }
                                        </Box>
                                        <Divider />
                                        <Box component="p" style={{ fontSize: 11 }}>
                                            {extendedData && extendedData.description}
                                        </Box>
                                        <Box component="p">
                                            <Typography style={{ fontSize: 12 }}>Rasgos de clase</Typography>
                                            <Divider className={classes.fullWidthDivider} />
                                            <Box>
                                                <Box component="p">
                                                    <Typography display="inline" style={{ fontSize: 11 }}>{'Dado de golpe. '}</Typography>
                                                    <span style={{ fontSize: 11 }} dangerouslySetInnerHTML={{ __html: extendedData.data.hitDie }} />
                                                </Box>
                                                <Box component="p">
                                                    <Typography display="inline" style={{ fontSize: 11 }}>{'Habilidad primaria. '}</Typography>
                                                    <span style={{ fontSize: 11 }} dangerouslySetInnerHTML={{ __html: extendedData.data.primaryAbility }} />
                                                </Box>
                                                <Box component="p">
                                                    <Typography display="inline" style={{ fontSize: 11 }}>{'Tiradas de salvación. '}</Typography>
                                                    <span style={{ fontSize: 11 }} dangerouslySetInnerHTML={{ __html: extendedData.data.saves }} />
                                                </Box>
                                            </Box>
                                        </Box>
                                        {characterClass.classLevel >= extendedData.data.subclassLevel && <Box component="p">
                                            <TextField
                                                placeholder={'Nombre de subclase'}
                                                value={characterClass.subclassName}
                                                onChange={(event) => changeSubclass(index, event, "subclassName")}
                                                disabled={!props.editable}
                                                InputProps={{
                                                    classes: {
                                                        input: classes.title,
                                                    },
                                                }} />
                                            <Divider className={classes.fullWidthDivider} />
                                            <TextField
                                                fullWidth
                                                multiline
                                                value={characterClass.subclassDescription}
                                                onChange={(event) => changeSubclass(index, event, "subclassDescription")}
                                                placeholder={'Descripción'}
                                                disabled={!props.editable}
                                                InputProps={{
                                                    classes: {
                                                        input: classes.resize,
                                                    },
                                                }} />
                                        </Box>}
                                    </Box>
                                )
                            })}
                        </Paper>
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <Paper variant="outlined" className={classes.paper} style={{ position: "relative" }}>
                            <Box style={{ position: "relative" }}>
                                <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'RAZA'}</Typography>
                                </Box>
                            </Box>
                            <Box>
                                {race &&
                                    <>
                                        <TextField
                                            placeholder={'Raza'}
                                            value={race.name}
                                            onChange={(event) => props.changeStats("race", { ...race, name: event.target.value })}
                                            disabled={!props.editable} />
                                        <TextField
                                            placeholder={'Subraza'}
                                            value={race.subrace?.name}
                                            onChange={(event) => props.changeStats("race", { ...race, subrace: { ...race?.subrace, name: event.target.value } })}
                                            disabled={!props.editable} />
                                    </>
                                }
                                <Divider />
                                <Box component="p" style={{ fontSize: 11 }}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        placeholder={'Descripción'}
                                        disabled={!props.editable}
                                        value={race.description && race.description}
                                        onChange={(event) => props.changeStats("race", { ...race, description: event.target.value })}
                                        InputProps={{
                                            classes: {
                                                input: classes.resize,
                                            },
                                        }} />
                                </Box>
                                {race &&
                                    <Box component="p">
                                        <Typography style={{ fontSize: 12 }}>Rasgos raciales</Typography>
                                        <Divider className={classes.fullWidthDivier} />
                                        <TextField
                                            fullWidth
                                            multiline
                                            placeholder={'Descripción'}
                                            disabled={!props.editable}
                                            value={race.traits && race.traits}
                                            onChange={(event) => props.changeStats("race", { ...race, traits: event.target.value })}
                                            InputProps={{
                                                classes: {
                                                    input: classes.resize,
                                                },
                                            }} />
                                    </Box>}
                                {race.subrace?.name?.length > 0 && <Box component="p">
                                    <Typography style={{ fontSize: 12 }}>Rasgos de subraza</Typography>
                                    <Divider className={classes.fullWidthDivider} />
                                    <TextField
                                        fullWidth
                                        multiline
                                        placeholder={'Descripción'}
                                        disabled={!props.editable}
                                        value={race.subrace?.description && race.subrace?.description}
                                        onChange={(event) => props.changeStats("race", { ...race, subrace: { ...race?.subrace, description: event.target.value } })}
                                        InputProps={{
                                            classes: {
                                                input: classes.resize,
                                            },
                                        }} />
                                </Box>}
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <Paper variant="outlined" className={classes.paper}>
                            <Typography style={{ fontSize: 11, textAlign: "center" }}>TRASFONDO</Typography>
                            <Box >
                                <Box>
                                    <TextField
                                        value={features.background && features.background.name}
                                        placeholder={'Nombre de trasfondo'}
                                        disabled={!props.editable}
                                        onChange={(event) => props.changeStats("background", { ...features.background, name: event.target.value })}
                                        InputProps={{
                                            classes: {
                                                input: classes.title,
                                            },
                                        }} />
                                    <Divider />
                                    <TextField
                                        fullWidth
                                        multiline
                                        placeholder={'Descripción'}
                                        disabled={!props.editable}
                                        value={features.background && features.background.description}
                                        onChange={(event) => props.changeStats("background", { ...features.background, description: event.target.value })}
                                        InputProps={{
                                            classes: {
                                                input: classes.resize,
                                            },
                                        }} />
                                    <Typography style={{ fontSize: 12, marginTop: ".5rem" }}>
                                        {'Rasgo'}
                                    </Typography>
                                    <Divider />
                                    <TextField
                                        fullWidth
                                        multiline
                                        disabled={!props.editable}
                                        placeholder={'Rasgo'}
                                        value={features.background && features.background.trait}
                                        onChange={(event) => props.changeStats("background", { ...features.background, trait: event.target.value })}
                                        InputProps={{
                                            classes: {
                                                input: classes.resize,
                                            },
                                        }} />
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <Paper variant="outlined" className={classes.paper}>
                            <Typography style={{ fontSize: 11, textAlign: "center" }}>PROFICIENCIAS</Typography>
                            <TextField
                                multiline
                                fullWidth
                                disabled={!props.editable}
                                value={props.features.proficiencies}
                                style={{ marginLeft: ".5rem" }}
                                onChange={(event) => props.changeStats("proficiencies", event.target.value)}
                                InputProps={{
                                    classes: {
                                        input: classes.resize
                                    }
                                }}
                            />
                            {/* <Divider style={{ margin: ".5rem 0" }} />
                            <Box style={{ display: "flex", alignItems: "center" }}>
                                {'Alineamiento: '}
                                <Select
                                    fullWidth
                                    disabled={!props.editable}
                                    style={{ fontSize: 11, marginLeft: ".5rem" }}
                                    onChange={(event) => props.changeStats("alignment", event.target.value)}
                                    value={props.features.alignment}
                                >
                                    {alignmentOptions.map(item => <MenuItem value={item}>{item}</MenuItem>)}
                                </Select>
                            </Box>
                            <Divider style={{ margin: ".5rem 0" }} /> */}
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={7} container style={{ rowGap: 8 }}>
                    <Grid item lg={12} xs={12}>
                        <ActionGeneration
                            editable={props.editable}
                            addItem={props.changeStats}
                            modifyItem={modifyItem}
                            actions={features.actions}
                            generateRow={generateRow} />
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <BonusActionGeneration
                            editable={props.editable}
                            addItem={props.changeStats}
                            modifyItem={modifyItem}
                            bonusActions={features.bonusActions}
                            generateRow={generateRow}
                        />
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <ReactionGeneration
                            editable={props.editable}
                            addItem={props.changeStats}
                            modifyItem={modifyItem}
                            reactions={features.reactions}
                            generateRow={generateRow} />
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <AdditionalAbilities
                            editable={props.editable}
                            addItem={props.changeStats}
                            modifyItem={modifyItem}
                            additionalAbilities={features.additionalAbilities}
                            generateRow={generateRow} />
                    </Grid>
                </Grid>
            </Grid >
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
                <MenuItem onClick={() => {
                    selectedData.editFunc(selectedData.item, selectedData.index)
                    handleClose()
                }}>Editar</MenuItem>
                <MenuItem onClick={() => {
                    removeItem(selectedData.array, selectedData.type, selectedData.index)
                    handleClose()
                }}>Delete</MenuItem>
            </Menu>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Features);