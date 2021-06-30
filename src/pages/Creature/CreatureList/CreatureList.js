import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { addNpcs, addMonsters } from "shared/actions/index";
import {
    Paper,
    IconButton,
    Box,
    MenuItem,
    Input,
    InputLabel,
    InputAdornment,
    FormControl,
    Button,
    Collapse,
    Divider,
    Select,
    CircularProgress
} from '@material-ui/core';
import {
    Add as AddIcon,
    Search as SearchIcon,
    FilterList as FilterListIcon
} from '@material-ui/icons'
import Api from 'helpers/api'
import useStyles from './CreatureList.styles';
import CreatureTable from './components/CreatureTable';

const mapStateToProps = state => {
    return { npcs: state.npcs, monsters: state.monsters, profile: state.profile }
}

const mapDispatchToProps = dispatch => {
    return {
        addNpcs: npcs => dispatch(addNpcs(npcs)),
        addMonsters: monsters => dispatch(addMonsters(monsters))
    };
}

function CreatureList(props) {
    const classes = useStyles();
    const [creatures, setCreatures] = useState([]);
    const [creaturesToDisplay, setCreaturesToDisplay] = useState([]);
    const [type, setType] = useState("npc");
    const [step, setStep] = useState(0.125);
    const creatureSizes = [
        "Diminuto",
        "Pequeño",
        "Mediano",
        "Grande",
        "Gigantesco"
    ];
    const creatureTypes = [
        "Humano",
        "Aberración", "Bestia", "Celestial",
        "Construcción", "Dragón", "Elemental",
        "Hada", "Felón", "Gigante",
        "Humanoide", "Goblinoide", "Monstruosidad",
        "Viscoso", "Planta", "No-muerto"
    ]
    const [openFilter, setOpenFilter] = React.useState(false);
    const [filter, setFilter] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const t = props.type === "bestiary" ? "monsters" : props.type + "s";
        setType(props.type);

        if (!props[t]) {
            fetchCreaturesFromAPI();
        } else {
            filterCreatures(props.type === "npc" ? props.npcs : props.monsters);
        }
    }, [props.type])

    const fetchCreaturesFromAPI = () => Api.fetchInternal(`/${props.type}`).then(filterCreatures);

    const filterCreatures = (creaturesRaw) => {
        const t = props.type === "bestiary" ? "monsters" : "npcs";
        const creaturesSorted = [...creaturesRaw].sort((a, b) => {
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

        if (!props[t]) {
            if (props.type === "npc") {
                props.addNpcs(creaturesSorted);
            } else {
                props.addMonsters(creaturesSorted)
            }
        }

        const creaturesFiltered = creaturesSorted.filter(npc => (
            npc.flavor.campaign.findIndex(campaign => campaign.campaignId === props.campaign) > -1
        ))

        setCreaturesToDisplay(creaturesFiltered)
        setCreatures(creaturesFiltered)
        setIsLoading(false);
    }

    const filterData = () => {
        if (Object.keys(filter).length > 0) {

            let newCreatures = [...creaturesToDisplay];

            if (filter.name) {
                newCreatures = newCreatures.filter(item => item.name.includes(filter.name));
            }

            if (filter.size) {
                newCreatures = newCreatures.filter(item => {
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
                newCreatures = newCreatures.filter(item => {
                    let check = item.stats.race;
                    if (["Humano", "Humana", "Humane"].includes(item.stats.race)) {
                        check = "Humano";
                    }

                    return check === filter.type
                });
            }

            if (filter.cr) {
                newCreatures = newCreatures.filter(item => item.stats.challengeRating === filter.cr)
            }

            setCreaturesToDisplay(newCreatures);
        }
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


    const deleteCreature = (id) => {
        Api.fetchInternal(`/${props.type}/${id}`, {
            method: "DELETE"
        })
            .then(() => fetchCreaturesFromAPI());
    }

    if (isLoading) {
        return (
            <Paper variant="outlined" style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress color="default" style={{ margin: "1rem" }} />
            </Paper>
        )
    }

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
                                    setCreaturesToDisplay(creatures.filter(i => i.name.includes(value)))
                                } else {
                                    setCreaturesToDisplay(creatures);
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
                        onClick={() => props.history.push(`/${type}/add`)}>
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
                            value={filter.type || creatureTypes[0]}
                            onChange={(e) => setFilter({ ...filter, type: e.target.value })}>
                            {creatureTypes.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Tamaño</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filter.size || creatureSizes[0]}
                            onChange={(e) => setFilter({ ...filter, size: e.target.value })}>
                            {creatureSizes.map(item => <MenuItem value={item}>{item}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Desafío</InputLabel>
                        <Input
                            required
                            type="number"
                            id="challenge"
                            name="challenge"
                            onChange={modifyStep}
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
                <CreatureTable
                    creaturesToDisplay={creaturesToDisplay}
                    campaign={props.campaign}
                    profile={props.profile}
                    dm={props.dm}
                    history={props.history}
                    deleteCreature={deleteCreature}
                    type={type} />
            </Box>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatureList);