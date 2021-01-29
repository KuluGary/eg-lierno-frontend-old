import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Divider, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import AddIcon from '@material-ui/icons/Add';
import { useWidth } from '../../../helpers/media-query';


const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%"
    },
    paper: {
        padding: "1rem",
        // height: width === "xs" ? "100%" : "auto",
        width: "100%"
    },
    stat: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
    resize: {
        fontSize: 11
    }
});

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

        if (row.data?.properties?.includes("Sutil")) {
            if ((Math.floor((props.abilityScores["dexterity"] - 10) / 2)) > (Math.floor((props.abilityScores["strength"] - 10) / 2))) {
                bonusStat = "dexterity";
            }
        } else if (damage["properties"] === "Distancia") {
            bonusStat = "dexterity";
        }

        let property = damage["properties"] === "Versátil" ? "a dos manos" : damage["properties"]?.toLowerCase();

        bonus = Math.floor((props.abilityScores[bonusStat] - 10) / 2);

        return damage["die"] + " " + (bonus >= 0 ? "+" : "") + " " + bonus + " (" + property + ")";
    }

    const calculateToHitBonusStr = () => {
        let bonus = 0;
        let bonusStat = "strength";

        if (row.data?.properties?.includes("Sutil")) {
            if ((Math.floor((props.abilityScores["dexterity"] - 10) / 2)) > (Math.floor((props.abilityScores["strength"] - 10) / 2))) {
                bonusStat = "dexterity";
            }
        } else if (row.data?.damage?.some(damage => damage.properties === "Distancia") && !row.data?.damage?.some(damage => damage.properties === "Melé")) {
            bonusStat = "dexterity";
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
                            {calculateToHitBonusStr()}
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
                                    {calculateToHitBonusStr()}
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

export default function Attacks(props) {
    const [interacted, setInteracted] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [attacks, setAttacks] = useState([])
    const [attackProperties, setAttackProperties] = useState([]);
    const [attackName, setAttackName] = useState('');
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
    const classes = useStyles();
    const width = useWidth();

    const generateAttack = () => {
        setAttacks([...attacks, {
            name: attackName,
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
                    properties: "Distancia"
                }];
        }
        if (attackProperties.includes('Versátil')) {
            data["damage"] = [
                ...data["damage"],
                {
                    die: twoHandedAttackDieNum + "d" + twoHandedAttackDieSize,
                    type: twoHandedAttackType,
                    properties: "Versátil"
                }];
        }
        if (attackProperties.includes('Daño extra')) {
            data["damage"] = [
                ...data["damage"],
                {
                    die: bonusAttackDieNum + "d" + bonusAttackDieSize,
                    type: bonusAttackType,
                    properties: "Daño extra"
                }];
        }

        data["properties"] = attackProperties;

        return (data);
    }

    const resetAttackGeneration = () => {
        setAttackName('');
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


    return (
        <div className={classes.root}>
            <Dialog open={dialogOpen} style={{ padding: 10 }}>
                <DialogTitle>Genera un ataque</DialogTitle>
                <DialogContent >
                    <Grid container spacing={2}>
                        <Grid item sm={6}>
                            <TextField
                                required
                                fullWidth
                                onChange={(e) => setAttackName(e.target.value)}
                                value={attackName}
                                label={'Nombre'}
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={proficient}
                                        onChange={() => setProficient(!proficient)}
                                        name="checkedB"
                                        color="default"
                                    />
                                }
                                label="¿Proficiente?"
                            />
                        </Grid>
                        <Grid item sm={2}>
                            <Box style={{ display: "flex", flexDirection: "column" }}>
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
                        <Grid item sm={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attackProperties.includes('Sutil')}
                                        onChange={() => attackProperties.includes('Sutil') ? setAttackProperties(attackProperties.filter(attack => attack !== 'Sutil')) : setAttackProperties([...attackProperties, 'Sutil'])}
                                        name="checkedB"
                                        color="default"
                                    />
                                }
                                label="Sutil"
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attackProperties.includes('Versátil')}
                                        onChange={() => attackProperties.includes('Versátil') ? setAttackProperties(attackProperties.filter(attack => attack !== 'Versátil')) : setAttackProperties([...attackProperties, 'Versátil'])}
                                        name="checkedB"
                                        color="default"
                                    />
                                }
                                label="Versátil"
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attackProperties.includes('Daño extra')}
                                        onChange={() => attackProperties.includes('Daño extra') ? setAttackProperties(attackProperties.filter(attack => attack !== 'Daño extra')) : setAttackProperties([...attackProperties, 'Daño extra'])}
                                        name="checkedB"
                                        color="default"
                                    />
                                }
                                label="Daño extra"
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attackProperties.includes('Munición')}
                                        onChange={() => attackProperties.includes('Munición') ? setAttackProperties(attackProperties.filter(attack => attack !== 'Munición')) : setAttackProperties([...attackProperties, 'Munición'])}
                                        name="checkedB"
                                        color="default"
                                    />
                                }
                                label="Munición"
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attackProperties.includes('Pesada')}
                                        onChange={() => attackProperties.includes('Pesada') ? setAttackProperties(attackProperties.filter(attack => attack !== 'Pesada')) : setAttackProperties([...attackProperties, 'Pesada'])}
                                        name="checkedB"
                                        color="default"
                                    />
                                }
                                label="Pesada"
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attackProperties.includes('Ligera')}
                                        onChange={() => attackProperties.includes('Ligera') ? setAttackProperties(attackProperties.filter(attack => attack !== 'Ligera')) : setAttackProperties([...attackProperties, 'Ligera'])}
                                        name="checkedB"
                                        color="default"
                                    />
                                }
                                label="Ligera"
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attackProperties.includes('Recargable')}
                                        onChange={() => attackProperties.includes('Recargable') ? setAttackProperties(attackProperties.filter(attack => attack !== 'Recargable')) : setAttackProperties([...attackProperties, 'Recargable'])}
                                        name="checkedB"
                                        color="default"
                                    />
                                }
                                label="Recargable"
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attackProperties.includes('Larga')}
                                        onChange={() => attackProperties.includes('Larga') ? setAttackProperties(attackProperties.filter(attack => attack !== 'Larga')) : setAttackProperties([...attackProperties, 'Larga'])}
                                        name="checkedB"
                                        color="default"
                                    />
                                }
                                label="Larga"
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attackProperties.includes('Especial')}
                                        onChange={() => attackProperties.includes('Especial') ? setAttackProperties(attackProperties.filter(attack => attack !== 'Especial')) : setAttackProperties([...attackProperties, 'Especial'])}
                                        name="checkedB"
                                        color="default"
                                    />
                                }
                                label="Especial"
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attackProperties.includes('Arrojadiza')}
                                        onChange={() => attackProperties.includes('Arrojadiza') ? setAttackProperties(attackProperties.filter(attack => attack !== 'Arrojadiza')) : setAttackProperties([...attackProperties, 'Arrojadiza'])}
                                        name="checkedB"
                                        color="default"
                                    />
                                }
                                label="Arrojadiza"
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attackProperties.includes('De dos manos')}
                                        onChange={() => attackProperties.includes('De dos manos') ? setAttackProperties(attackProperties.filter(attack => attack !== 'De dos manos')) : setAttackProperties([...attackProperties, 'De dos manos'])}
                                        name="checkedB"
                                        color="default"
                                    />
                                }
                                label="De dos manos"
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attackProperties.includes('Desarmado')}
                                        onChange={() => attackProperties.includes('Desarmado') ? setAttackProperties(attackProperties.filter(attack => attack !== 'Desarmado')) : setAttackProperties([...attackProperties, 'Desarmado'])}
                                        name="checkedB"
                                        color="default"
                                    />
                                }
                                label="Desarmado"
                            />
                        </Grid>
                        {attackRange.includes('Melé') &&
                            <>
                                <Grid item sm={12}>
                                    <TextField
                                        fullWidth
                                        label={'Alcance'}
                                        type="number"
                                        onChange={(e) => setAttackReach(e.target.value)}
                                        value={attackReach}
                                        defaultValue={5} />
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
                            </>
                        }
                        {attackRange.includes('Distancia') &&
                            <>
                                <Grid item sm={6}>
                                    <TextField
                                        fullWidth
                                        label={'Alcance corto'}
                                        type="number"
                                        onChange={(e) => setAttackShortReach(e.target.value)}
                                        value={attackShortReach}
                                        defaultValue={80} />
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField
                                        fullWidth
                                        label={'Alcance largo'}
                                        type="number"
                                        onChange={(e) => setAttackLongReach(e.target.value)}
                                        value={attackLongReach}
                                        defaultValue={320} />
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
                            </>}
                        {attackProperties.includes('Versátil') &&
                            <>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        label={'Tipo de daño a dos manos'}
                                        onChange={(e) => setTwoHandedAttackType(e.target.value)}
                                        value={twoHandedAttackType}
                                        defaultValue="Cortante" />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        onChange={(e) => setTwoHandedAttackDieNum(e.target.value)}
                                        label={'Num. dados de daño a dos manos'}
                                        value={twoHandedAttackDieNum}
                                        defaultValue={1} />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        onChange={(e) => setTwoHandedAttackDieSize(e.target.value)}
                                        label={'Tamaño de dado a dos manos'}
                                        value={twoHandedAttackDieSize}
                                        defaultValue={6} />
                                </Grid>
                            </>
                        }
                        {attackProperties.includes('Daño extra') &&
                            <>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        label={'Tipo de daño extra'}
                                        onChange={(e) => setBonusAttackType(e.target.value)}
                                        value={bonusAttackType}
                                        defaultValue="Cortante" />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        onChange={(e) => setBonusAttackDieNum(e.target.value)}
                                        label={'Num. dados de daño extra'}
                                        value={bonusAttackDieNum}
                                        defaultValue={1} />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        onChange={(e) => setBonusAttackDieSize(e.target.value)}
                                        label={'Tamaño de dado extra'}
                                        value={bonusAttackDieSize}
                                        defaultValue={6} />
                                </Grid>
                            </>
                        }
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
                {/* <Typography variant="subtitle2" style={{ fontSize: "11px", textAlign: "center" }} >{'ATAQUES'}</Typography> */}
                <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box />
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'ATAQUES'}</Typography>
                    {props.editable ?
                        <IconButton size="small" onClick={openDialog} style={{}}>
                            <AddIcon />
                        </IconButton> : <Box />
                    }
                </Box>
                <Divider style={{ margin: ".3rem 0" }} />
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
                    {/* <Box style={{ float: "left" }}>
                        {props.editable && <Button onClick={openDialog} variant="outlined"><Typography variant="subtitle2" style={{ fontSize: "8px", textAlign: "left" }} >{'+ Añadir'}</Typography></Button>}
                    </Box> */}
                </Box>
            </Paper>
        </div>
    );
}