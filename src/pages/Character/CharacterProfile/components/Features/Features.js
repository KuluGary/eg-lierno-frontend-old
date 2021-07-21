import React, { useEffect, useState } from "react";
import { StringUtil } from "helpers/string-util";
import { connect } from "react-redux";
import { addClasses, addRaces } from "shared/actions/index";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Api from "helpers/api";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import Grid from "@material-ui/core/Grid";
import { MenuItem, Select } from "@material-ui/core";
import { ActionGeneration, ReactionGeneration, BonusActionGeneration, AbilityGeneration } from "./components";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./Features.styles";

import DraggableRow from "./components/Row/Row";

const mapStateToProps = (state) => {
    return { classes: state.classes };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addClasses: (classes) => dispatch(addClasses(classes)),
        addRaces: (races) => dispatch(addRaces(races)),
    };
};

// const Row = (props) => {
//     const [open, setOpen] = useState(false);
//     const classes = useStyles();
//     const { item, array, index, type, editFunc, setSelectedData, modifyItem, handleMenu, checks } = props;

//     return (
//         <>
//             <TableRow>
//                 <TableCell style={{ width: "5%" }}>
//                     <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
//                         {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                     </IconButton>
//                 </TableCell>
//                 <TableCell>
//                     <TextField
//                         fullWidth
//                         InputProps={{
//                             classes: {
//                                 input: classes.resize2,
//                             },
//                         }}
//                         placeholder={"Nombre"}
//                         disabled={!props.editable}
//                         value={item.name}
//                         style={{ width: "50%" }}
//                         onChange={(event) => {
//                             const newItem = { ...item };
//                             newItem["name"] = event.target.value;
//                             modifyItem(array, index, newItem, type);
//                         }}
//                     />
//                 </TableCell>
//                 {props.editable && editFunc && (
//                     <TableCell align="right">
//                         <IconButton
//                             onClick={(e) => {
//                                 setSelectedData({
//                                     item,
//                                     index,
//                                     array,
//                                     type,
//                                     editFunc,
//                                 });
//                                 return handleMenu(e);
//                             }}
//                         >
//                             <MoreVertIcon size="small" />
//                         </IconButton>
//                     </TableCell>
//                 )}
//             </TableRow>
//             <TableRow>
//                 <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//                     <Collapse in={open} timeout="auto" unmountOnExit>
//                         {item.usage_num && item.usage_type && (
//                             <Box style={{ display: "flex", alignItems: "center" }}>
//                                 {checks}
//                                 <Box style={{ fontSize: 11 }}>
//                                     {item.usage_type === "long_rest" ? "por descanso largo" : "por descanso corto"}
//                                 </Box>
//                             </Box>
//                         )}
//                         <div
//                             style={{ margin: ".5rem 0" }}
//                             className={classes.descriptionBox}
//                             dangerouslySetInnerHTML={{ __html: StringUtil.parseHTML(item.description) }}
//                         />
//                     </Collapse>
//                 </TableCell>
//             </TableRow>
//         </>
//     );
// };

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
            Api.fetchInternal("/classes/").then((res) => {
                props.addClasses(res);
                setClassOptions(res);
                let characterClassArray = features.classes.map((apiClass) => apiClass.classId);
                let selectedClasses = res.filter((apiClass) => characterClassArray.includes(apiClass._id));
                setCharacterClasses(selectedClasses);
            });
        } else {
            setClassOptions(props.classes);
            let characterClassArray = features.classes.map((apiClass) => apiClass.classId);
            let selectedClasses = props.classes.filter((apiClass) => characterClassArray.includes(apiClass._id));
            setCharacterClasses(selectedClasses);
        }
    }, []);

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
    };

    const removeItem = (arr, type, index) => {
        let newItems = [...arr];

        newItems.splice(index, 1);

        props.changeStats(type, newItems);
    };

    const changeClass = (index, event) => {
        if (event?.target.value) {
            let newItems = [...props.features.classes];

            const selectedClass = classOptions[classOptions.findIndex((item) => item._id === event.target.value)];

            newItems[index] = {
                ...props.features.classes[index],
                className: selectedClass.name,
                classId: selectedClass._id,
            };
            props.changeStats("classes", newItems);
        } else {
            removeClass(index);
        }
    };

    const changeSubclass = (index, event, type) => {
        let newItems = [...props.features.classes];

        newItems[index] = {
            ...props.features.classes[index],
            [type]: event.target.value,
        };

        props.changeStats("classes", newItems);
    };

    const changeClassLevel = (index, event) => {
        let newItems = [...props.features.classes];

        newItems[index] = {
            ...props.features.classes[index],
            classLevel: parseInt(event.target.value),
        };

        props.changeStats("classes", newItems);
    };

    const addClass = () => {
        props.changeStats("classes", [
            ...props.features.classes,
            {
                className: classOptions[0].name,
                subclassName: null,
                classLevel: 1,
                classId: classOptions[0]._id,
            },
        ]);
    };

    const removeClass = (index) => {
        let newItems = [...props.features.classes];

        newItems.splice(index, 1);
        props.changeStats("classes", newItems);
    };

    return (
        <>
            <Grid container className={classes.root} spacing={1}>
                <Grid item xs={12} lg={5} container spacing={1}>
                    <Grid item lg={12} xs={12}>
                        <Paper variant="outlined" className={classes.paper}>
                            <Box className={classes.subtitleContainer}>
                                <Box />
                                <Typography variant="subtitle2" className={classes.subtitle}>
                                    {"CLASES"}
                                </Typography>
                                {props.editable ? (
                                    <IconButton size="small" onClick={addClass}>
                                        <AddIcon />
                                    </IconButton>
                                ) : (
                                    <Box />
                                )}
                            </Box>
                            <Divider />
                            {characterClasses &&
                                props.features.classes.map((characterClass, index) => {
                                    const extendedData = classOptions.find(
                                        (item) => item._id === characterClass.classId,
                                    );
                                    return (
                                        <div key={index}>
                                            {index > 0 && <Divider />}
                                            <Box style={{ padding: "1rem" }}>
                                                <Box style={{ display: "flex" }}>
                                                    <Box style={{ display: "flex", alignItems: "flex-end" }}>
                                                        <Select
                                                            value={characterClass.classId}
                                                            disabled={!props.editable}
                                                            onChange={(event) => changeClass(index, event)}
                                                        >
                                                            <MenuItem
                                                                value={null}
                                                                style={{ opacity: 0.7, fontStyle: "italic" }}
                                                            >
                                                                {"Eliminar"}
                                                            </MenuItem>
                                                            <Divider />
                                                            {classOptions.map((option) => (
                                                                <MenuItem key={option._id} value={option._id}>
                                                                    {StringUtil.generizaClase(
                                                                        option.name,
                                                                        props.pronoun,
                                                                    )}
                                                                </MenuItem>
                                                            ))}
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
                                                                inputProps: { min: 1, max: 20 },
                                                            }}
                                                        />
                                                    </Box>
                                                </Box>
                                                <Box component="p" style={{ fontSize: 11 }}>
                                                    {extendedData && extendedData.description}
                                                </Box>
                                                {characterClass.classLevel >= extendedData.data.subclassLevel && (
                                                    <Box component="p">
                                                        <TextField
                                                            placeholder={"Nombre de subclase"}
                                                            value={characterClass.subclassName}
                                                            onChange={(event) =>
                                                                changeSubclass(index, event, "subclassName")
                                                            }
                                                            disabled={!props.editable}
                                                            InputProps={{
                                                                classes: {
                                                                    input: classes.title,
                                                                },
                                                            }}
                                                        />
                                                        <Divider className={classes.fullWidthDivider} />
                                                        <TextField
                                                            fullWidth
                                                            multiline
                                                            value={characterClass.subclassDescription}
                                                            onChange={(event) =>
                                                                changeSubclass(index, event, "subclassDescription")
                                                            }
                                                            placeholder={"Descripción"}
                                                            disabled={!props.editable}
                                                            InputProps={{
                                                                classes: {
                                                                    input: classes.resize,
                                                                },
                                                            }}
                                                        />
                                                    </Box>
                                                )}
                                            </Box>
                                        </div>
                                    );
                                })}
                        </Paper>
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <Paper variant="outlined" className={classes.paper}>
                            <Box className={classes.subtitleContainer}>
                                <Box />
                                <Typography variant="subtitle2" className={classes.subtitle}>
                                    {"RAZA"}
                                </Typography>
                                <Box />
                            </Box>
                            <Divider />
                            <Box Box style={{ padding: "1rem" }}>
                                {race && (
                                    <Box style={{ display: "flex", alignItems: "flex-end" }}>
                                        <TextField
                                            placeholder={"Raza"}
                                            value={race.name}
                                            onChange={(event) =>
                                                props.changeStats("race", { ...race, name: event.target.value })
                                            }
                                            disabled={!props.editable}
                                        />
                                        <TextField
                                            placeholder={"Subraza"}
                                            value={race.subrace?.name}
                                            className={classes.level}
                                            InputProps={{
                                                classes: {
                                                    input: classes.subField,
                                                },
                                            }}
                                            onChange={(event) =>
                                                props.changeStats("race", {
                                                    ...race,
                                                    subrace: { ...race?.subrace, name: event.target.value },
                                                })
                                            }
                                            disabled={!props.editable}
                                        />
                                    </Box>
                                )}
                                <Box component="p">
                                    <TextField
                                        fullWidth
                                        multiline
                                        variant="outlined"
                                        label={"Descripción"}
                                        disabled={!props.editable}
                                        value={race.description && race.description}
                                        onChange={(event) =>
                                            props.changeStats("race", { ...race, description: event.target.value })
                                        }
                                        InputProps={{
                                            classes: {
                                                input: classes.resize,
                                            },
                                        }}
                                    />
                                </Box>
                                <Divider />
                                {race && (
                                    <Box component="p">
                                        <TextField
                                            fullWidth
                                            multiline
                                            variant="outlined"
                                            label={"Rasgos raciales"}
                                            disabled={!props.editable}
                                            value={race.traits && race.traits}
                                            onChange={(event) =>
                                                props.changeStats("race", { ...race, traits: event.target.value })
                                            }
                                            InputProps={{
                                                classes: {
                                                    input: classes.resize,
                                                },
                                            }}
                                        />
                                    </Box>
                                )}
                                {race.subrace?.name?.length > 0 && (
                                    <>
                                        <Divider />
                                        <Box component="p">
                                            <TextField
                                                fullWidth
                                                multiline
                                                variant="outlined"
                                                label={"Rasgos de subraza"}
                                                disabled={!props.editable}
                                                value={race.subrace?.description && race.subrace?.description}
                                                onChange={(event) =>
                                                    props.changeStats("race", {
                                                        ...race,
                                                        subrace: { ...race?.subrace, description: event.target.value },
                                                    })
                                                }
                                                InputProps={{
                                                    classes: {
                                                        input: classes.resize,
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </>
                                )}
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <Paper variant="outlined" className={classes.paper}>
                            <Box className={classes.subtitleContainer}>
                                <Box />
                                <Typography variant="subtitle2" className={classes.subtitle}>
                                    {"TRASFONDO"}
                                </Typography>
                                <Box />
                            </Box>
                            <Divider />
                            <Box style={{ padding: "1rem" }}>
                                <TextField
                                    value={features.background && features.background.name}
                                    placeholder={"Nombre de trasfondo"}
                                    disabled={!props.editable}
                                    onChange={(event) =>
                                        props.changeStats("background", {
                                            ...features.background,
                                            name: event.target.value,
                                        })
                                    }
                                    InputProps={{
                                        classes: {
                                            input: classes.title,
                                        },
                                    }}
                                />
                                <Box component="p">
                                    <TextField
                                        fullWidth
                                        multiline
                                        variant="outlined"
                                        label={"Descripción"}
                                        disabled={!props.editable}
                                        value={features.background && features.background.description}
                                        onChange={(event) =>
                                            props.changeStats("background", {
                                                ...features.background,
                                                description: event.target.value,
                                            })
                                        }
                                        InputProps={{
                                            classes: {
                                                input: classes.resize,
                                            },
                                        }}
                                    />
                                </Box>
                                <Divider />
                                <Box component="p">
                                    <TextField
                                        fullWidth
                                        multiline
                                        label={"Rasgo"}
                                        variant="outlined"
                                        disabled={!props.editable}
                                        value={features.background && features.background.trait}
                                        onChange={(event) =>
                                            props.changeStats("background", {
                                                ...features.background,
                                                trait: event.target.value,
                                            })
                                        }
                                        InputProps={{
                                            classes: {
                                                input: classes.resize,
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <Paper variant="outlined" className={classes.paper}>
                            <Box className={classes.subtitleContainer}>
                                <Box />
                                <Typography variant="subtitle2" className={classes.subtitle}>
                                    {"COMPETENCIAS"}
                                </Typography>
                                <Box />
                            </Box>
                            <Divider />
                            <Box style={{ padding: "1rem" }}>
                                <TextField
                                    multiline
                                    fullWidth
                                    variant="outlined"
                                    disabled={!props.editable}
                                    value={props.features.proficiencies}
                                    onChange={(event) => props.changeStats("proficiencies", event.target.value)}
                                    InputProps={{
                                        classes: {
                                            input: classes.resize,
                                        },
                                    }}
                                />
                            </Box>
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
                            setSelectedData={setSelectedData}
                            handleMenu={handleMenu}
                            DraggableRow={DraggableRow}
                        />
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <BonusActionGeneration
                            editable={props.editable}
                            addItem={props.changeStats}
                            modifyItem={modifyItem}
                            bonusActions={features.bonusActions}
                            setSelectedData={setSelectedData}
                            handleMenu={handleMenu}
                            DraggableRow={DraggableRow}
                        />
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <ReactionGeneration
                            editable={props.editable}
                            addItem={props.changeStats}
                            modifyItem={modifyItem}
                            features={features}
                            reactions={features.reactions}
                            setSelectedData={setSelectedData}
                            handleMenu={handleMenu}
                            DraggableRow={DraggableRow}
                        />
                    </Grid>
                    <Grid item lg={12} xs={12}>
                        <AbilityGeneration
                            editable={props.editable}
                            addItem={props.changeStats}
                            modifyItem={modifyItem}
                            features={features}
                            additionalAbilities={features.additionalAbilities}
                            setSelectedData={setSelectedData}
                            handleMenu={handleMenu}
                            DraggableRow={DraggableRow}
                        />
                    </Grid>
                </Grid>
            </Grid>
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
                    onClick={() => {
                        selectedData.editFunc(selectedData.item, selectedData.index);
                        handleClose();
                    }}
                >
                    Editar
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        removeItem(selectedData.array, selectedData.type, selectedData.index);
                        handleClose();
                    }}
                >
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Features);
