import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import {
    addNpcs,
    addCharacters,
    addMonsters
} from "../../shared/actions/index";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Slide from '@material-ui/core/Slide';
import Api from "../../helpers/api";
import { useWidth } from "../../hooks/media-query";
import { StringUtil } from "../../helpers/string-util";

const useStyles = makeStyles({
    root: {
        height: "100%",
    },
    paper: {
        margin: "1rem 0",
        padding: "1rem",
        height: "100%"
    },
    input: {
        margin: "0 1rem",
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    smallCell: {
        width: "10%"
    },
    table: {
        width: "100%"
    }
});

const mapStateToProps = state => {
    return { characters: state.characters }
}

const mapDispatchToProps = dispatch => {
    return {
        addCharacters: characters => dispatch(addCharacters(characters)),
        addNpcs: npcs => dispatch(addNpcs(npcs)),
        addMonsters: monsters => dispatch(addMonsters(monsters))
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function InitiativeTracker(props) {
    const classes = useStyles();
    const [combatants, setCombatant] = useState([]);
    const [name, setName] = useState('');
    const [initiative, setInitiative] = useState('');
    const [hp, setHp] = useState('');
    const [ac, setAc] = useState('');
    const [characters, setCharacters] = useState([])
    const [npcs, setNpcs] = useState([]);
    const [monsters, setMonsters] = useState([])
    const [value, setValue] = React.useState(0);
    const width = useWidth();

    useEffect(() => {
        if (!props.characters) {
            Api.fetchInternal('/characters')
                .then(res => {
                    props.addCharacters(res)
                    setCharacters(res)
                })
        } else {
            setCharacters(props.characters)
        }

        if (!props.npcs) {
            Api.fetchInternal('/npc')
                .then(res => {
                    props.addNpcs(res)
                    setNpcs(res)
                });
        } else {
            setNpcs(props.npcs)
        }

        if (!props.monsters) {
            Api.fetchInternal('/bestiary')
                .then(res => {
                    props.addMonsters(res)
                    setMonsters(res)
                });
        } else {
            setMonsters(props.monsters)
        }
    }, [])

    function passTurn() {
        let newCombatants = [...combatants]

        newCombatants.push(newCombatants.shift());

        setCombatant([...newCombatants])
    }

    function removeItem(i) {
        let newCombatants = [...combatants]
        newCombatants.splice(i, 1);
        setCombatant([...newCombatants])
    }

    function addCombatant(combatant = null) {
        if (combatant) {
            const newCombatant = {
                name: combatant.name || combatant.name,
                ac: combatant.stats.armorClass,
                initiative: (initiative ? initiative : StringUtil.getRandomInt() + (combatant.initiative_bonus || 0)),
                hp: hp ? hp
                    : combatant.stats.hitPoints ? combatant.stats.hitPoints.hp_current
                        ? combatant.stats.hitPoints.hp_current
                        : combatant.stats.hitPoints.hp_max
                        : combatant.stats.hitPoints
            }

            if (combatants.length === 0) {
                setCombatant([newCombatant])
            } else {
                const combatantsToAdd = [...combatants, newCombatant].sort((a, b) => (parseInt(a.initiative) > parseInt(b.initiative)) ? -1 : 1)
                setCombatant(combatantsToAdd)
            }
        } else {
            const newCombatant = { name, ac, initiative, hp }

            if (combatants.length === 0) {
                setCombatant([newCombatant])
            } else {
                let newCombatants = [...combatants];

                newCombatants.push(newCombatant)
                newCombatants.sort((a, b) => (parseInt(a.initiative) > parseInt(b.initiative)) ? -1 : 1)

                setCombatant(newCombatants);

            }
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Slide direction="right" in={true} mountOnEnter unmountOnExit>
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item md={6}>
                        <Paper variant="outlined" className={classes.paper}>
                            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                <Tab label="Personajes" {...a11yProps(0)} />
                                <Tab label="PNJs" {...a11yProps(1)} />
                                <Tab label="Enemigos" {...a11yProps(2)} />
                                <Tab label="Personalizado" {...a11yProps(3)} />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                <Box className={classes.box}>
                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Nombre</TableCell>
                                                <TableCell>Clase de Armadura</TableCell>
                                                <TableCell align="center">Iniciativa</TableCell>
                                                <TableCell align="center">PdV</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {characters && characters.map((char, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {char.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {char.stats.armorClass}
                                                    </TableCell>
                                                    <TableCell className={classes.smallCell}>
                                                        <TextField
                                                            onChange={(e) => setInitiative(e.target.value)}
                                                            className={classes.input}
                                                            placeholder={(width !== "xs" && width !== "sm") && char.stats.initiativeBonus.toString()}
                                                            name="initiative"
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    </TableCell>
                                                    <TableCell className={classes.smallCell}>
                                                        <TextField
                                                            onChange={(e) => setHp(e.target.value)}
                                                            className={classes.input}
                                                            defaultValue={
                                                                char.stats.hitPoints.hp_current ?
                                                                    char.stats.hitPoints.hp_current :
                                                                    char.stats.hitPoints.hp_max}
                                                            name="initiative"
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            onClick={() => addCombatant(char)}>
                                                            <AddIcon />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Box className={classes.box}>
                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Nombre</TableCell>
                                                <TableCell>Clase de Armadura</TableCell>
                                                <TableCell align="center">Iniciativa</TableCell>
                                                <TableCell align="center">PdV</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {npcs && npcs.map((npc, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {npc.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {npc.stats.armorClass}
                                                    </TableCell>
                                                    <TableCell className={classes.smallCell}>
                                                        <TextField
                                                            onChange={(e) => setInitiative(e.target.value)}
                                                            className={classes.input}
                                                            placeholder={((width !== "xs" && width !== "sm") && npc.stats.initiative_bonus) || "0"}
                                                            name="initiative"
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    </TableCell>
                                                    <TableCell className={classes.smallCell}>
                                                        <TextField
                                                            onChange={(e) => setHp(e.target.value)}
                                                            className={classes.input}
                                                            defaultValue={
                                                                npc.stats.hitPoints}
                                                            name="initiative"
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            onClick={() => addCombatant(npc)}>
                                                            <AddIcon />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <Box className={classes.box}>
                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Nombre</TableCell>
                                                <TableCell>Clase de Armadura</TableCell>
                                                <TableCell align="center">Iniciativa</TableCell>
                                                <TableCell align="center">PdV</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {monsters && monsters.map((monster, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {monster.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {monster.stats.armorClass}
                                                    </TableCell>
                                                    <TableCell className={classes.smallCell}>
                                                        <TextField
                                                            onChange={(e) => setInitiative(e.target.value)}
                                                            className={classes.input}
                                                            placeholder={((width !== "xs" && width !== "sm") && monster.stats.initiative_bonus) || "0"}
                                                            name="initiative"
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    </TableCell>
                                                    <TableCell className={classes.smallCell}>
                                                        <TextField
                                                            onChange={(e) => setHp(e.target.value)}
                                                            className={classes.input}
                                                            defaultValue={
                                                                monster.stats.hitPoints}
                                                            name="initiative"
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            onClick={() => addCombatant(monster)}>
                                                            <AddIcon />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                <Box className={classes.box}>
                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Nombre</TableCell>
                                                <TableCell>Clase de Armadura</TableCell>
                                                <TableCell align="center">Iniciativa</TableCell>
                                                <TableCell align="center">PdV</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    <TextField
                                                        onChange={(e) => setName(e.target.value)}
                                                        label={(width !== "xs" && width !== "sm") && "Name"}
                                                        id="name"
                                                        name="name"
                                                        variant="outlined"
                                                        fullWidth
                                                    />
                                                </TableCell>
                                                <TableCell className={classes.smallCell}>
                                                    <TextField
                                                        onChange={(e) => setAc(e.target.value)}
                                                        label={(width !== "xs" && width !== "sm") && "AC"}
                                                        id="ac"
                                                        name="ac"
                                                        variant="outlined"
                                                        fullWidth
                                                    />
                                                </TableCell>
                                                <TableCell className={classes.smallCell}>
                                                    <TextField
                                                        onChange={(e) => setInitiative(e.target.value)}
                                                        label={(width !== "xs" && width !== "sm") && "Init"}
                                                        id="init"
                                                        name="init"
                                                        variant="outlined"
                                                        fullWidth
                                                    />
                                                </TableCell>
                                                <TableCell className={classes.smallCell}>
                                                    <TextField
                                                        onChange={(e) => setHp(e.target.value)}
                                                        label={(width !== "xs" && width !== "sm") && "HP"}
                                                        id="hp"
                                                        name="hp"
                                                        variant="outlined"
                                                        fullWidth
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        onClick={() => addCombatant(null)}>
                                                        <AddIcon />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                            </TabPanel>
                        </Paper>
                    </Grid>
                    <Grid item md={6}>
                        <Paper variant="outlined" className={classes.paper}>
                            <Button
                                onClick={passTurn}>
                                Pasar turno
                            <SkipNextIcon />
                            </Button>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>AC</TableCell>
                                        <TableCell>Iniciativa</TableCell>
                                        <TableCell>PdV</TableCell>
                                        {/* <TableCell>Notas</TableCell> */}
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {combatants.length > 0 && combatants.map((combatant, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {combatant.name}
                                            </TableCell>
                                            <TableCell className={classes.smallCell}>
                                                {combatant.ac}
                                            </TableCell>
                                            <TableCell className={classes.smallCell}>
                                                {combatant.initiative}
                                            </TableCell>
                                            <TableCell className={classes.smallCell}>
                                                <TextField
                                                    defaultValue={combatant.hp}
                                                    variant="outlined"
                                                    fullWidth />
                                            </TableCell>
                                            {/* <TableCell>
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Notes"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            </TableCell> */}
                                            <TableCell className={classes.smallCell}>
                                                <Button onClick={() => removeItem(index)}>
                                                    <RemoveCircleIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Slide>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(InitiativeTracker);