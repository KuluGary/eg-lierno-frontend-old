import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import { addNpcs, addMonsters } from "shared/actions/index";
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import Api from 'helpers/api'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Button, Collapse, Divider, Select } from '@material-ui/core';
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
    const [creatureSizes] = useState([
        "Diminuto",
        "Pequeño",
        "Mediano",
        "Grande",
        "Gigantesco"
    ]);
    const [creatureTypes] = useState([
        "Humano",
        "Aberración", "Bestia", "Celestial",
        "Construcción", "Dragón", "Elemental",
        "Hada", "Felón", "Gigante",
        "Humanoide", "Goblinoide", "Monstruosidad",
        "Viscoso", "Planta", "No-muerto"
    ])
    const [openFilter, setOpenFilter] = React.useState(false);
    const [filter, setFilter] = useState({});

    useEffect(() => {
        const type = props.type === "bestiary" ? "monsters" : props.type + "s";
        setType(props.type);

        if (!props[type]) {
            fetchCreaturesFromAPI();
        } else {
            filterCreatures(props.type === "npc" ? props.npcs : props.monsters);
        }
    }, [props.type])

    const fetchCreaturesFromAPI = () => Api.fetchInternal(`/${props.type}`).then(filterCreatures);

    const filterCreatures = (creaturesRaw) => {
        const type = props.type === "bestiary" ? "monsters" : props.type + "s";
        const creaturesSorted = creaturesRaw.sort((a, b) => {
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

        if (props[type]) {
            if (props.type === "npc") {
                props.addNpcs(creaturesSorted);
            } else {
                props.addMonsters(creaturesSorted);
            }
        }

        setCreaturesToDisplay(props.campaign ? creaturesSorted.filter(npc => npc.flavor.campaign.some(campaign => campaign.campaignId === props.campaign)) : creaturesSorted)
        setCreatures(props.campaign ? creaturesSorted.filter(npc => npc.flavor.campaign.some(campaign => campaign.campaignId === props.campaign)) : creaturesSorted)
    }

    const filterData = () => {
        let newCreatures = [...creatures];

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
                {creaturesToDisplay.length > 0 && <CreatureTable
                    creaturesToDisplay={creaturesToDisplay}
                    campaign={props.campaign}
                    profile={props.profile}
                    dm={props.dm}
                    history={props.history}
                    deleteCreature={deleteCreature}
                    type={type} />}
            </Box>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatureList);