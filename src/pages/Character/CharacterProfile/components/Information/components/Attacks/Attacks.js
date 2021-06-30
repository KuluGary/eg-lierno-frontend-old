import React, { useEffect, useState } from 'react';
import {
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tabs,
    Tab,
    Paper,
    Typography,
    Box,
    Button,
    TextField,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControlLabel,
    Checkbox,
    Collapse,
    IconButton
} from '@material-ui/core';
import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
    Close as CloseIcon,
    Add as AddIcon
} from "@material-ui/icons"
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useWidth } from 'hooks/media-query';
import { stats } from 'assets/json/customizable_stats.json';
import useStyles from './Attacks.style';

const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const width = useWidth();

    const calculateDamageBonusStr = (damage) => {

        if (damage.properties === "Daño extra" || row.data?.properties?.includes("Desarmado")) {
            return damage["die"] + " (" + damage["type"]?.toLowerCase() + ")"
        }

        let bonus = 0;
        let bonusStat = "strength"

        if (!damage.modifier) {
            if (row.data?.properties?.includes("Sutil")) {
                if ((Math.floor((props.abilityScores["dexterity"] - 10) / 2)) > (Math.floor((props.abilityScores["strength"] - 10) / 2))) {
                    bonusStat = "dexterity";
                }
            } else if (damage["properties"] === "Distancia") {
                bonusStat = "dexterity";
            }
        } else {
            bonusStat = damage.modifier;
        }

        let property = damage["properties"] === "Versátil" ? "a dos manos" : damage["properties"]?.toLowerCase();

        bonus = Math.floor((props.abilityScores[bonusStat] - 10) / 2);

        return damage["die"] + " " + (bonus >= 0 ? "+" : "") + " " + bonus + " (" + property + ")";
    }

    const calculateToHitBonusStr = (damage) => {
        let bonus = 0;
        let bonusStat = "strength";

        if (!damage.modifier) {
            if (row.data?.properties?.includes("Sutil")) {
                if ((Math.floor((props.abilityScores["dexterity"] - 10) / 2)) > (Math.floor((props.abilityScores["strength"] - 10) / 2))) {
                    bonusStat = "dexterity";
                }
            } else if (row.data?.damage?.some(damage => damage.properties === "Distancia") && !row.data?.damage?.some(damage => damage.properties === "Melé")) {
                bonusStat = "dexterity";
            }
        } else {
            bonusStat = damage.modifier;
        }

        bonus = Math.floor((props.abilityScores[bonusStat] - 10) / 2) + (row.proficient ? props.proficiencyBonus : 0);

        return "1d20 " + (bonus >= 0 ? "+" : "") + " " + bonus;
    }

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell style={{ width: "5%" }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    <Typography style={{ fontSize: 12 }}>
                        {row.name}
                    </Typography>
                </TableCell>
                {width !== "xs" && <>
                    <TableCell component="th" scope="row">
                        <Typography style={{ fontSize: 12 }}>
                            {/* {calculateToHitBonusStr()} */}
                            {row.data?.damage?.map(damage => (
                                <Box component="div">
                                    {calculateToHitBonusStr(damage)}
                                </Box>
                            ))}
                        </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Typography style={{ fontSize: 12 }}>
                            {row.data?.damage?.map(damage => (
                                <Box component="div">
                                    {calculateDamageBonusStr(damage)}
                                </Box>
                            ))}
                        </Typography>
                    </TableCell>
                </>}
                <TableCell component="th" scope="row" style={{ width: "5%" }}>
                    <IconButton disabled={!props.editable} size="small" onClick={() => props.removeAttack(props.index)}>
                        <CloseIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {row.description &&
                            <Typography variant="body2" style={{ margin: "1rem 0", fontStyle: "italic" }}>
                                <span dangerouslySetInnerHTML={{ __html: row.description }} />
                            </Typography>}
                        {width === "xs" &&
                            <Box margin={1} component="div">
                                <Typography component="span" variant="body1" style={{ fontSize: 12, fontWeight: 600 }}>
                                    {"Daño: "}
                                </Typography>
                                <Typography component="span" variant="body2" style={{ fontSize: 12 }}>
                                    {row.data?.damage?.map(damage => calculateDamageBonusStr(damage)).join(", ")}
                                </Typography>
                            </Box>
                        }
                        {width === "xs" &&
                            <Box margin={1} component="div">
                                <Typography component="span" variant="body1" style={{ fontSize: 12, fontWeight: 600 }}>
                                    {"Bono al ataque: "}
                                </Typography>
                                <Typography component="span" variant="body2" style={{ fontSize: 12 }}>
                                    {row.data?.damage?.map(damage => (
                                        <Box component="div">
                                            {calculateToHitBonusStr(damage)}
                                        </Box>
                                    ))}
                                </Typography>
                            </Box>
                        }
                        <Box margin={1} component="div">
                            <Typography component="span" variant="body1" style={{ fontSize: 12, fontWeight: 600 }}>
                                {"Tipo: "}
                            </Typography>
                            <Typography component="span" variant="body2" style={{ fontSize: 12 }}>
                                {row.data?.type}
                            </Typography>
                        </Box>
                        <Box margin={1} component="div">
                            <Typography component="span" variant="body1" style={{ fontSize: 12, fontWeight: 600 }}>
                                {"Tipo de daño: "}
                            </Typography>
                            <Typography component="span" variant="body2" style={{ fontSize: 12 }}>
                                {[...new Set(row.data?.damage?.map(damage => damage.type))].join(", ")}
                            </Typography>
                        </Box>
                        <Box margin={1} component="div">
                            <Typography component="span" variant="body1" style={{ fontSize: 12, fontWeight: 600 }}>
                                {"Alcance: "}
                            </Typography>
                            <Typography component="span" variant="body2" style={{ fontSize: 12 }}>
                                {row.data?.range}
                            </Typography>
                        </Box>
                        <Box margin={1} component="div">
                            <Typography component="span" variant="body1" style={{ fontSize: 12, fontWeight: 600 }}>
                                {"Propiedades: "}
                            </Typography>
                            <Typography component="span" variant="body2" style={{ fontSize: 12 }}>
                                {row.data?.properties?.join(", ")}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment >
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <span
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <>
                    {children}
                </>
            )}
        </span>
    );
}

export function Attacks(props) {
    const [interacted, setInteracted] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [tabValue, setTabValue] = useState();
    const [attacks, setAttacks] = useState([])
    const [attackProperties, setAttackProperties] = useState([]);
    const [attackName, setAttackName] = useState('');
    const [attackDescription, setAttackDescription] = useState();
    const [proficient, setProficient] = useState(true)
    const [attackRange, setAttackRange] = useState([]);
    const [attackReach, setAttackReach] = useState(5);
    const [attackShortReach, setAttackShortReach] = useState(80);
    const [attackLongReach, setAttackLongReach] = useState(320);

    const [meleeAttackType, setMeleeAttackType] = useState('Cortante');
    const [rangedAttackType, setRangedAttackType] = useState('Perforante');
    const [twoHandedAttackType, setTwoHandedAttackType] = useState('Cortante');
    const [bonusAttackType, setBonusAttackType] = useState('Fuego');

    const [meleeAttackDieNum, setMeleeAttackDieNum] = useState(1);
    const [distanceAttackDieNum, setDistanceAttackDieNum] = useState(1);
    const [twoHandedAttackDieNum, setTwoHandedAttackDieNum] = useState(1);
    const [bonusAttackDieNum, setBonusAttackDieNum] = useState(1);

    const [meleeAttackDieSize, setMeleeAttackDieSize] = useState(6);
    const [distanceAttackDieSize, setDistanceAttackDieSize] = useState(6);
    const [twoHandedAttackDieSize, setTwoHandedAttackDieSize] = useState(8);
    const [bonusAttackDieSize, setBonusAttackDieSize] = useState(4);

    const [meleeAttackModifier, setMeleeAttackModifier] = useState();
    const [distanceAttackModifier, setDistanceAttackModifier] = useState();
    const [twoHandedAttackModifier, setTwoHandedAttackModifer] = useState();
    const [bonusAttackModifier, setBonusAttackModifier] = useState();

    const selectableProperties = [
        "Sutil",
        "Versátil",
        "Daño extra",
        "Munición",
        "Pesada",
        "Ligera",
        "Recargable",
        "Larga",
        "Especial",
        "Arrojadiza",
        "De dos manos",
        "Desarmado"
    ]

    const classes = useStyles();
    const width = useWidth();

    const generateAttack = () => {
        setAttacks([...attacks, {
            name: attackName,
            description: attackDescription,
            proficient,
            data: createData()
        }])
        setDialogOpen(!dialogOpen);
        resetAttackGeneration();
        setInteracted(true)
    }

    const createData = () => {
        let data = {
            damage: [],
            properties: []
        };
        let type;

        if (attackRange.includes('Melé') && attackRange.includes('Distancia')) {
            type = "Ataque de arma melé o distancia.";
        } else if (attackRange.includes('Melé')) {
            type = 'Ataque de arma melé.'
        } else if (attackRange.includes('Distancia')) {
            type = 'Ataque de arma distancia.'
        } else {
            type = 'Ataque de arma.'
        }

        data["type"] = type;

        let rangeStr;

        if (attackRange.includes('Melé') && attackRange.includes('Distancia')) {
            rangeStr = attackReach + " ft. o " + attackShortReach + "/" + attackLongReach + " ft."
        } else if (attackRange.includes('Melé')) {
            rangeStr = attackReach + " ft.";
        } else if (attackRange.includes('Distancia')) {
            rangeStr = attackShortReach + "/" + attackLongReach + " ft.";
        }

        data["range"] = rangeStr;

        if (attackRange.includes('Melé')) {
            data["damage"] = [
                ...data["damage"],
                {
                    die: meleeAttackDieNum + "d" + meleeAttackDieSize,
                    type: meleeAttackType,
                    modifier: meleeAttackModifier,
                    properties: "Melé"
                }
            ];
        }
        if (attackRange.includes('Distancia')) {
            data["damage"] = [
                ...data["damage"],
                {
                    die: distanceAttackDieNum + "d" + distanceAttackDieSize,
                    type: rangedAttackType,
                    modifier: distanceAttackModifier,
                    properties: "Distancia"
                }];
        }
        if (attackProperties.includes('Versátil')) {
            data["damage"] = [
                ...data["damage"],
                {
                    die: twoHandedAttackDieNum + "d" + twoHandedAttackDieSize,
                    type: twoHandedAttackType,
                    modifier: twoHandedAttackModifier,
                    properties: "Versátil"
                }];
        }
        if (attackProperties.includes('Daño extra')) {
            data["damage"] = [
                ...data["damage"],
                {
                    die: bonusAttackDieNum + "d" + bonusAttackDieSize,
                    type: bonusAttackType,
                    modifier: bonusAttackModifier,
                    properties: "Daño extra"
                }];
        }

        data["properties"] = attackProperties;

        return (data);
    }

    const resetAttackGeneration = () => {
        setAttackName('');
        setAttackDescription();
        setAttackRange([]);
        setAttackReach(5);
        setAttackShortReach(80);
        setAttackLongReach(320);
        setMeleeAttackType('Cortante');
        setRangedAttackType('Perforante');
        setTwoHandedAttackType('Cortante');
        setBonusAttackType('Fuego');
        setMeleeAttackDieNum(1);
        setDistanceAttackDieNum(1);
        setTwoHandedAttackDieNum(1);
        setBonusAttackDieNum(1);
        setMeleeAttackDieSize(6);
        setDistanceAttackDieSize(6);
        setTwoHandedAttackDieSize(8);
        setBonusAttackDieSize(4);
        setAttackProperties([])
        setMeleeAttackModifier();
        setDistanceAttackModifier();
        setTwoHandedAttackModifer();
        setBonusAttackModifier();
    }

    const openDialog = () => {
        setDialogOpen(!dialogOpen);
    }

    const removeAttack = (index) => {
        let newItems = [...attacks];

        newItems.splice(index, 1);

        setAttacks(newItems);
        setInteracted(true);
    }

    useEffect(() => {
        if (!Object.is(props.attacks, attacks) && interacted) {
            props.changeStats("attacks", attacks)
        }
    }, [attacks])

    useEffect(() => {
        if (attacks.length <= 0) {
            if (props.attacks) {
                setAttacks(props.attacks)
            }
        }
    }, [props.attacks])

    useEffect(() => {
        if (attackRange.length > 0) {

        } else {
            setTabValue(null);
        }
    }, [attackRange])


    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
    }
    return (
        <div className={classes.root}>
            <Dialog open={dialogOpen} style={{ padding: 10 }} maxWidth={"sm"} fullWidth>
                <DialogTitle>Genera un ataque</DialogTitle>
                <DialogContent >
                    <Grid container spacing={2}>
                        <Grid item sm={8}>
                            <TextField
                                required
                                fullWidth
                                onChange={(e) => setAttackName(e.target.value)}
                                value={attackName}
                                label={'Nombre'}
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={proficient}
                                        onChange={() => setProficient(!proficient)}
                                        name="checkedB"
                                        color="default"
                                    />
                                }
                                label="¿Añadir proficiencia?"
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                required
                                fullWidth
                                multiline
                                variant="outlined"
                                onChange={(e) => setAttackDescription(e.target.value)}
                                value={attackDescription}
                                label={'Descripción del ataque'}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <Autocomplete
                                multiple
                                freeSolo
                                id="tags-standard"
                                options={selectableProperties}
                                onChange={(_, value) => setAttackProperties(value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Propiedades"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <Box style={{ display: "flex", justifyContent: "center" }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={attackRange.includes('Melé')}
                                            onChange={() => attackRange.includes('Melé') ? setAttackRange(attackRange.filter(attack => attack !== 'Melé')) : setAttackRange([...attackRange, 'Melé'])}
                                            name="checkedB"
                                            color="default"
                                        />
                                    }
                                    label="Melé"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={attackRange.includes('Distancia')}
                                            onChange={() => attackRange.includes('Distancia') ? setAttackRange(attackRange.filter(attack => attack !== 'Distancia')) : setAttackRange([...attackRange, 'Distancia'])}
                                            name="checkedB"
                                            color="default"
                                        />
                                    }
                                    label="Distancia"
                                />
                            </Box>
                        </Grid>
                        <Grid sm={12}>
                            <Tabs value={tabValue} onChange={handleTabChange} aria-label="simple tabs example">
                                {attackRange.includes('Melé') && <Tab value={0} label="Melé" {...a11yProps(0)} />}
                                {attackRange.includes('Distancia') && <Tab value={1} label="Distancia" {...a11yProps(1)} />}
                                {attackProperties.includes('Versátil') && <Tab value={2} label="Dos manos" {...a11yProps(2)} />}
                                {attackProperties.includes('Daño extra') && <Tab value={3} label="Daño extra" {...a11yProps(3)} />}
                            </Tabs>
                        </Grid>
                        <TabPanel value={tabValue} index={0}>
                            <Grid container spacing={2}>
                                <Grid item sm={6}>
                                    <TextField
                                        fullWidth
                                        label={'Alcance'}
                                        type="number"
                                        onChange={(e) => setAttackReach(e.target.value)}
                                        value={attackReach}
                                        defaultValue={5} />
                                </Grid>
                                <Grid item sm={6}>
                                    <FormControl className={classes.formControl} fullWidth>
                                        <InputLabel id="demo-simple-select-label">Modificador de daño</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={meleeAttackModifier}
                                            fullWidth
                                            defaultValue={'strength'}
                                            onChange={(e) => setMeleeAttackModifier(e.target.value)}
                                        >
                                            {Object.keys(stats).map(check => (
                                                <MenuItem value={check}>
                                                    {stats[check].name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        label={'Tipo de daño melé'}
                                        onChange={(e) => setMeleeAttackType(e.target.value)}
                                        value={meleeAttackType}
                                        defaultValue="Cortante" />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        onChange={(e) => setMeleeAttackDieNum(e.target.value)}
                                        label={'Num. dados de daño'}
                                        value={meleeAttackDieNum}
                                        defaultValue={1} />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        onChange={(e) => setMeleeAttackDieSize(e.target.value)}
                                        label={'Tamaño de dado'}
                                        value={meleeAttackDieSize}
                                        defaultValue={6} />
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <Grid container spacing={2}>
                                <Grid item sm={3}>
                                    <TextField
                                        fullWidth
                                        label={'Alcance corto'}
                                        type="number"
                                        onChange={(e) => setAttackShortReach(e.target.value)}
                                        value={attackShortReach}
                                        defaultValue={80} />
                                </Grid>
                                <Grid item sm={3}>
                                    <TextField
                                        fullWidth
                                        label={'Alcance largo'}
                                        type="number"
                                        onChange={(e) => setAttackLongReach(e.target.value)}
                                        value={attackLongReach}
                                        defaultValue={320} />
                                </Grid>
                                <Grid item sm={6}>
                                    <FormControl className={classes.formControl} fullWidth>
                                        <InputLabel id="demo-simple-select-label">Modificador de daño</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={distanceAttackModifier}
                                            fullWidth
                                            defaultValue={'strength'}
                                            onChange={(e) => setDistanceAttackModifier(e.target.value)}
                                        >
                                            {Object.keys(stats).map(check => (
                                                <MenuItem value={check}>
                                                    {stats[check].name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        label={'Tipo de daño a distancia'}
                                        onChange={(e) => setRangedAttackType(e.target.value)}
                                        value={rangedAttackType}
                                        defaultValue="Cortante" />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        onChange={(e) => setDistanceAttackDieNum(e.target.value)}
                                        label={'Num. dados de daño'}
                                        value={distanceAttackDieNum}
                                        defaultValue={1} />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        onChange={(e) => setDistanceAttackDieSize(e.target.value)}
                                        label={'Tamaño de dado'}
                                        value={distanceAttackDieSize}
                                        defaultValue={6} />
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                            <Grid container spacing={2}>
                                <Grid item sm={6}>
                                    <TextField
                                        fullWidth
                                        label={'Tipo de daño a dos manos'}
                                        onChange={(e) => setTwoHandedAttackType(e.target.value)}
                                        value={twoHandedAttackType}
                                        defaultValue="Cortante" />
                                </Grid>
                                <Grid item sm={6}>
                                    <FormControl className={classes.formControl} fullWidth>
                                        <InputLabel id="demo-simple-select-label">Modificador de daño</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={twoHandedAttackModifier}
                                            fullWidth
                                            defaultValue={'strength'}
                                            onChange={(e) => setTwoHandedAttackModifer(e.target.value)}
                                        >
                                            {Object.keys(stats).map(check => (
                                                <MenuItem value={check}>
                                                    {stats[check].name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        onChange={(e) => setTwoHandedAttackDieNum(e.target.value)}
                                        label={'Num. dados de daño a dos manos'}
                                        value={twoHandedAttackDieNum}
                                        defaultValue={1} />
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        onChange={(e) => setTwoHandedAttackDieSize(e.target.value)}
                                        label={'Tamaño de dado a dos manos'}
                                        value={twoHandedAttackDieSize}
                                        defaultValue={6} />
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={tabValue} index={3}>
                            <Grid container spacing={2}>
                                <Grid item sm={6}>
                                    <TextField
                                        fullWidth
                                        label={'Tipo de daño extra'}
                                        onChange={(e) => setBonusAttackType(e.target.value)}
                                        value={bonusAttackType}
                                        defaultValue="Cortante" />
                                </Grid>
                                <Grid item sm={6}>
                                    <FormControl className={classes.formControl} fullWidth>
                                        <InputLabel id="demo-simple-select-label">Modificador de daño</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={bonusAttackModifier}
                                            fullWidth
                                            defaultValue={'strength'}
                                            onChange={(e) => setBonusAttackModifier(e.target.value)}
                                        >
                                            {Object.keys(stats).map(check => (
                                                <MenuItem value={check}>
                                                    {stats[check].name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        onChange={(e) => setBonusAttackDieNum(e.target.value)}
                                        label={'Num. dados de daño extra'}
                                        value={bonusAttackDieNum}
                                        defaultValue={1} />
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        onChange={(e) => setBonusAttackDieSize(e.target.value)}
                                        label={'Tamaño de dado extra'}
                                        value={bonusAttackDieSize}
                                        defaultValue={6} />
                                </Grid>
                            </Grid>
                        </TabPanel>
                        {/* } */}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={openDialog} color="default">
                        Cerrar
                     </Button>
                    <Button variant="outlined" color="default" onClick={generateAttack} autoFocus>
                        Generar
                    </Button>
                </DialogActions>
            </Dialog>
            <Paper variant="outlined" className={classes.paper} style={{ height: width !== "xs" ? "100%" : "auto" }}>
                <Box className={classes.subtitleContainer}>
                    <Box />
                    <Typography variant="subtitle2" className={classes.subtitle} >{'ATAQUES'}</Typography>
                    {props.editable ?
                        <IconButton size="small" onClick={openDialog} style={{}}>
                            <AddIcon />
                        </IconButton> : <Box />
                    }
                </Box>
                <Divider />
                <Box component="span" className={classes.stat}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Nombre</TableCell>
                                {width !== "xs" && <TableCell>Ataque</TableCell>}
                                {width !== "xs" && <TableCell>Daño</TableCell>}
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {attacks.map((attack, index) => (
                                <Row
                                    row={attack}
                                    abilityScores={props.abilityScores}
                                    proficiencyBonus={props.proficiencyBonus}
                                    removeAttack={removeAttack}
                                    index={index}
                                    editable={props.editable} />
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Paper>
        </div>
    );
}