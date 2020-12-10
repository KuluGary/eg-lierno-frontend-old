import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { StringUtil } from "../../../helpers/string-util";
import { connect } from "react-redux";
import { addClasses, addRaces } from "../../../shared/actions/index";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Api from "../../../helpers/api";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { Checkbox, MenuItem, Select } from '@material-ui/core';
import { useWidth } from '../../../helpers/media-query';
import ActionGeneration from '../components/FeatureGeneration/ActionGeneration';
import ReactionGeneration from '../components/FeatureGeneration/ReactionGeneration';
import BonusActionGeneration from '../components/FeatureGeneration/BonusActionGeneration';
import AdditionalAbilities from '../components/FeatureGeneration/AdditionalAbilities';

const useStyles = makeStyles({
    root: {
        width: "100%",
        paddingLeft: "4px"
    },
    paper: {
        padding: "1rem",
        height: "100%",
        margin: ".1rem 0"
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
        // padding: ".5rem 1rem .5rem .5rem",
        borderRadius: 20
    },
    resize: {
        fontSize: 11
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

function Features(props) {
    const classes = useStyles();
    const [characterClasses, setCharacterClasses] = useState();
    const [classOptions, setClassOptions] = useState([]);
    const [selectedData, setSelectedData] = useState();
    const { features, raceId, subraceIndex } = props;
    const [race, setRace] = useState();
    const [raceOptions, setRaceOptions] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const alignmentOptions = [
        StringUtil.generiza("Legal malo", "Legal mala", "Legal male", props.pronoun),
        StringUtil.generiza("Neutral malo", "Neutral mala", "Legal mala", props.pronoun),
        StringUtil.generiza("Caótico malo", "Caótica mala", "Caótica male", props.pronoun),
        "Legal neutral",
        "Neutral",
        StringUtil.generiza("Caótico neutral", "Caótica neutral", "Caótique neutral", props.pronoun),
        StringUtil.generiza("Legal bueno", "Legal buena", "Legal buene", props.pronoun),
        StringUtil.generiza("Neutral bueno", "Neutral buena", "Neutral buene", props.pronoun),
        StringUtil.generiza("Caótico bueno", "Caótica buena", "Caótique buene", props.pronoun)
    ]
    const width = useWidth();

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

        if (!props.races) {
            Api.fetchInternal('/races/')
                .then(res => {
                    props.addRaces(res)
                    let selectedRace = res.filter(apiRace => apiRace._id === raceId)[0]
                    setRace(selectedRace)
                    setRaceOptions(res)
                })
        } else {
            setRaceOptions(props.races);
            setRace(props.races.filter(apiRace => apiRace._id === raceId)[0]);
        }
    }, [])

    const generateRow = (item, index, array, type, editFunc = null) => {
        const checks = [];

        if (item.usage_num) {
            for (let i = 0; i < parseInt(item.usage_num.max); i++) {
                console.log("i: " + (parseInt(i)), "current: " + parseInt(item.usage_num.current - 1))
                checks.push(
                    <Checkbox
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
        return <Box component="p">
            <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <TextField
                    InputProps={{
                        classes: {
                            input: classes.title,
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
                {props.editable && editFunc &&
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
                }
            </Box>
            {item.usage_num && item.usage_type &&
                <Box style={{ display: "flex", alignItems: "center" }}>
                    {checks}
                    <Box>
                        {item.usage_type === "long_rest" ? "por descanso largo" : "por descanso corto"}
                    </Box>
                </ Box>
            }
            <TextField
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
                value={item.description} />
        </Box>
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

    const changeSubrace = (event) => {
        const subrace = race.subraces.findIndex(item => item.name === event.target.value);

        props.changeStats("subrace", subrace)
    }

    const changeRace = (event) => {
        props.changeStats("race", event.target.value);

        setRace(raceOptions.filter(apiRace => apiRace._id === event.target.value)[0])
    }

    return (
        <div className={classes.root}>
            <Box style={{ display: "flex", flexWrap: width === "xs" && "wrap" }}>
                <Box style={{ width: width === "xs" ? "100%" : "40%", display: "flex", flexDirection: "column", marginLeft: ".1rem" }}>
                    <Paper variant="outlined" className={classes.paper}>
                        <Box>
                            <Box>
                                <Typography style={{ fontSize: 11, textAlign: "center" }}>CLASES</Typography>
                                {characterClasses && props.features.classes.map((characterClass, index) => {
                                    const extendedData = classOptions.filter(item => item._id === characterClass.classId)[0];
                                    return (
                                        <Box>
                                            {width !== "xs" && <img alt="class" className={classes.image} src={extendedData.icon} />}
                                            <Box style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
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
                                                    <IconButton onClick={() => removeClass(index)}>
                                                        <CancelIcon size="small"></CancelIcon>
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
                                            {characterClass.classLevel === extendedData.data.subclassLevel && <Box component="p">
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
                            </Box>
                            <Box style={{
                                float: "right",
                                marginTop: ".5rem"
                            }}>
                                <Button variant="outlined" disabled={!props.editable} onClick={addClass}>
                                    <Typography variant="subtitle2" style={{ fontSize: "8px", textAlign: "left" }} >
                                        {'+ Añadir'}
                                    </Typography>
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                    <Paper variant="outlined" className={classes.paper}>
                        <Box style={{ position: "relative" }}>
                            <Typography style={{ fontSize: 11, textAlign: "center" }}>RAZA</Typography>
                            <Box>
                                {race &&
                                    <Select
                                        value={race._id}
                                        disabled={!props.editable}
                                        onChange={changeRace}>
                                        {raceOptions.map(option => <MenuItem value={option._id}>{StringUtil.generizaClase(option.name, props.pronoun)}</MenuItem>)}
                                    </Select>
                                }
                                {race &&
                                    <Select
                                        value={race.subraces[subraceIndex].name}
                                        disabled={!props.editable}
                                        defaultValue={race.subraces[0]}
                                        onChange={changeSubrace}>
                                        {race.subraces.map(option => <MenuItem value={option.name}>{option.name}</MenuItem>)}
                                    </Select>
                                }

                                <Typography style={{ fontSize: 11 }}>
                                    {race && race.description}
                                </Typography>
                                {race && race.racialFeatures.length > 0 &&
                                    <Box component="p">
                                        <Typography style={{ fontSize: 12 }}>Rasgos raciales</Typography>
                                        <Divider className={classes.fullWidthDivier} />
                                        <Box>
                                            {race.racialFeatures.map(feature => (
                                                <Box component="p">
                                                    <Typography display="inline" style={{ fontSize: 11 }}>{feature.name + '. '}</Typography>
                                                    <span style={{ fontSize: 11 }} dangerouslySetInnerHTML={{ __html: feature.effect }} />
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>}
                            </Box>
                        </Box>
                    </Paper>
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
                    <Paper variant="outlined" className={classes.paper}>
                        <Box>
                            <Box style={{ display: "flex", alignItems: "center" }}>
                                {'Proficiencias: '}
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
                            </Box>
                            <Divider style={{ margin: ".5rem 0" }} />
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
                            <Divider style={{ margin: ".5rem 0" }} />
                        </Box>
                    </Paper>
                </Box>
                <Box style={{ width: width === "xs" ? "100%" : "60%", position: "relative", marginLeft: ".2rem", display: "flex", flexDirection: "column" }}>
                    <ActionGeneration
                        editable={props.editable}
                        addItem={props.changeStats}
                        modifyItem={modifyItem}
                        actions={features.actions}
                        generateRow={generateRow} />
                    <BonusActionGeneration
                        editable={props.editable}
                        addItem={props.changeStats}
                        modifyItem={modifyItem}
                        bonusActions={features.bonusActions}
                        generateRow={generateRow}
                    />
                    <ReactionGeneration
                        editable={props.editable}
                        addItem={props.changeStats}
                        modifyItem={modifyItem}
                        reactions={features.reactions}
                        generateRow={generateRow} />
                    <AdditionalAbilities
                        editable={props.editable}
                        addItem={props.changeStats}
                        modifyItem={modifyItem}
                        additionalAbilities={features.additionalAbilities}
                        generateRow={generateRow} />
                </Box>
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
                <MenuItem onClick={() => {
                    selectedData.editFunc(selectedData.item, selectedData.index)
                    handleClose()
                }}>Editar</MenuItem>
                <MenuItem onClick={() => {
                    removeItem(selectedData.array, selectedData.type, selectedData.index)
                    handleClose()
                }}>Delete</MenuItem>
            </Menu>
        </div >
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Features);