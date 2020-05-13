import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    title: {
        marginTop: theme.spacing(2),
    },
    formControl: {
        minWidth: "100%",
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

export default function Abilities(props) {
    const [actions, setActions] = useState(props.creature.stats.actions || []);
    const [reactions, setReactions] = useState(props.creature.stats.reactions || []);
    const [abilities, setAbilities] = useState(props.creature.stats.additionalAbilities || []);
    const [legendaryActions, setLegendaryActions] = useState(props.creature.stats.legendaryActions || []);

    const [attackName, setAttackName] = useState('');
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

    const [attackProperties, setAttackProperties] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        return () => {
            props.addToCreatureStats(actions, "actions");
            props.addToCreatureStats(reactions, "reactions");
            props.addToCreatureStats(abilities, "additionalAbilities");
            props.addToCreatureStats(legendaryActions, "legendaryActions");
            props.addToCreatureStats(`${(props.pronoun && props.pronoun.length > 0) ? props.pronoun + ' ' + props.creature.name.toLowerCase() : props.creature.name} puede llevar a cabo 3 acciones legendarias, escogiendo entre las opciones disponibles. Solo se puede utilizar una opción a la vez y solo al final del turno de otra criatura. ${props.creature.name} recupera las acciones legendarias usadas al principio de su turno.`,"legendaryActionsDescription")
        }
    }, [actions, reactions, abilities, legendaryActions])

    const createDescription = () => {
        let type;
        let ability = "strength";
        //  if ((finesse || (attackReach.includes('Distancia') && !attackReach.includes('Melé'))    ))
        if (attackProperties.includes('Sutil') || (attackRange.includes('Distancia') && !attackRange.includes('Melé'))) {
            ability = "dexterity"
        }

        if (attackRange.includes('Melé') && attackRange.includes('Distancia')) {
            type = "Ataque de arma melé o distancia:";
        } else if (attackRange.includes('Melé')) {
            type = 'Ataque de arma melé:'
        } else if (attackRange.includes('Distancia')) {
            type = 'Ataque de arma distancia:'
        } else {
            type = 'Ataque de arma:'
        }

        let toHit = parseInt(props.creature.stats.abilityScoreModifiers[ability]) + parseInt(props.creature.stats.proficiencyBonus);
        let rangeStr;

        if (attackRange.includes('Melé') && attackRange.includes('Distancia')) {
            rangeStr = "alcance " + attackReach + " ft. o alcance " + attackShortReach + "/" + attackLongReach + " ft."
        } else if (attackRange.includes('Melé')) {
            rangeStr = "alcance " + attackReach + "ft.";
        } else if (attackRange.includes('Distancia')) {
            rangeStr = "alcance " + attackShortReach + "/" + attackLongReach + " ft.";
        }

        let damageMod = props.creature.stats.abilityScoreModifiers[ability];
        let meleeDamageStr;
        let rangedDamageStr;
        let twoHandedDamageStr;
        let bonusDamageStr;

        if (attackRange.includes('Melé')) {
            meleeDamageStr = createDamageStr(meleeAttackType, meleeAttackDieSize, meleeAttackDieNum, damageMod);
        }
        if (attackRange.includes('Distancia')) {
            rangedDamageStr = createDamageStr(rangedAttackType, distanceAttackDieSize, distanceAttackDieNum, damageMod)
        }
        if (attackProperties.includes('Versátil')) {
            twoHandedDamageStr = createDamageStr(twoHandedAttackType, twoHandedAttackDieSize, twoHandedAttackDieNum, damageMod)
        }
        if (attackProperties.includes('Daño extra')) {
            bonusDamageStr = createDamageStr(bonusAttackType, bonusAttackDieSize, bonusAttackDieNum, 0)
        }
        let hitStr;
        let needsCommaBeforeBonusDamage;

        if (attackRange.includes('Melé')) {
            hitStr = meleeDamageStr;
            if (attackRange.includes('Distance')) {
                hitStr = hitStr + " en melé, o " + rangedDamageStr + " a distancia";
                needsCommaBeforeBonusDamage = true;
            }
        } else if (attackRange.includes('Distancia')) {
            hitStr = rangedDamageStr;
        }

        if (attackProperties.includes('Versátil')) {
            hitStr = hitStr + " o " + twoHandedDamageStr + " si es usado con dos manos para hacer un ataque melé.";
            needsCommaBeforeBonusDamage = true;
        }

        if (attackProperties.includes('Daño extra')) {
            if (needsCommaBeforeBonusDamage) {
                hitStr = hitStr + ",";
                needsCommaBeforeBonusDamage = false;
            }
            hitStr = hitStr + " más " + bonusDamageStr;
        }

        let description = "<i>" + type + "</i>" + toHit + " al golpe, " + rangeStr
            + ", un objetivo. <i>Daño:</i> " + hitStr + ".";

        if (attackProperties && attackProperties.length > 0) {
            description = description + ' <small><i>Propiedades: ' + attackProperties + '</i></small>'
        }
        return (description);
    }

    const createDamageStr = (damageType, diceSize, numDice, modifier) => {
        let diceAvg = (diceSize / 2.0) + 0.5;
        let avgDamage = Math.floor(numDice * diceAvg) + modifier;
        let damageStr = avgDamage + "(" + numDice + "d" + diceSize;
        if (modifier != 0) {
            damageStr = damageStr + " + " + modifier;
        }
        damageStr = damageStr + ")" + " daño " + damageType.toLowerCase();
        return damageStr;
    }

    const addAction = () => {
        setActions([...actions, {
            name: "",
            description: ""
        }])
    }

    const modifyActions = (key, value, index) => {
        let newActions = [...actions];
        newActions[index][key] = value;
        setActions(newActions);
    }

    const generateAttack = () => {
        setActions([...actions, {
            name: attackName,
            description: createDescription()
        }])
        setDialogOpen(!dialogOpen);
        resetAttackGeneration();
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

    const addReaction = () => {
        setReactions([...reactions, {
            name: "",
            description: ""
        }])
    }

    const modifyReactions = (key, value, index) => {
        let newReactions = [...reactions];
        newReactions[index][key] = value;
        setReactions(newReactions);
    }

    const addAbility = () => {
        setAbilities([...abilities, {
            name: "",
            description: ""
        }])
    }

    const modifyAbilities = (key, value, index) => {
        let newAbilities = [...abilities];
        newAbilities[index][key] = value;
        setAbilities(newAbilities);
    }

    const addLegendaryAction = () => {
        setLegendaryActions([...legendaryActions, {
            name: "",
            description: ""
        }])
    }

    const modifyLegendaryActions = (key, value, index) => {
        let newLegendaryActions = [...legendaryActions];
        newLegendaryActions[index][key] = value;
        setLegendaryActions(newLegendaryActions);
    }

    const removeAction = (actionToRemove) => {
        const newActions = [...actions].filter(action => action.name !== actionToRemove.name);

        setActions(newActions);
    }

    const removeReaction = (reactionToRemove) => {
        const newReactions = [...reactions].filter(reaction => reaction.name !== reactionToRemove.name);

        setReactions(newReactions);
    }

    const removeAbility = (abilityToRemove) => {
        const newAbilities = [...abilities].filter(ability => ability.name !== abilityToRemove.name);

        setAbilities(newAbilities);
    }

    const removeLegendaryAction = (actionToRemove) => {
        const newActions = [...legendaryActions].filter(action => action.name !== actionToRemove.name);

        setLegendaryActions(newActions)
    }

    const openDialog = () => {
        setDialogOpen(!dialogOpen);
    }

    return (
        <React.Fragment>
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
                        <Grid item sm={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attackRange.includes('Melé')}
                                        onChange={() => attackRange.includes('Melé') ? setAttackRange(attackRange.filter(attack => attack !== 'Melé')) : setAttackRange([...attackRange, 'Melé'])}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Melé"
                            />
                        </Grid>
                        <Grid item sm={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attackRange.includes('Distancia')}
                                        onChange={() => attackRange.includes('Distancia') ? setAttackRange(attackRange.filter(attack => attack !== 'Distancia')) : setAttackRange([...attackRange, 'Distancia'])}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Distancia"
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attackProperties.includes('Sutil')}
                                        onChange={() => attackProperties.includes('Sutil') ? setAttackProperties(attackRange.filter(attack => attack !== 'Sutil')) : setAttackProperties([...attackProperties, 'Sutil'])}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Sutil"
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attackProperties.includes('Versátil')}
                                        onChange={() => attackProperties.includes('Versátil') ? setAttackProperties(attackRange.filter(attack => attack !== 'Versátil')) : setAttackProperties([...attackProperties, 'Versátil'])}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Versátil"
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attackProperties.includes('Daño extra')}
                                        onChange={() => attackProperties.includes('Daño extra') ? setAttackProperties(attackRange.filter(attack => attack !== 'Daño extra')) : setAttackProperties([...attackProperties, 'Daño extra'])}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Daño extra"
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
                                        label={'Tipo de daño melé'}
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
                    <Button onClick={openDialog} color="primary">
                        Cerrar
                     </Button>
                    <Button color="primary" onClick={generateAttack} autoFocus>
                        Generar
                    </Button>
                </DialogActions>
            </Dialog>
            <Typography variant="h6" gutterBottom>
                Habilidades
            </Typography>
            <Grid container spacing={2}>
                <Grid item sm={12}>
                    <Button onClick={addAction}>
                        AÑADIR ACCIÓN
                    </Button>
                    <Button onClick={openDialog}>
                        GENERAR ATAQUE
                    </Button>
                </Grid>
                {actions.map((action, index) => (
                    <>
                        <Grid container spacing={2} item sm={12}>
                            <Grid item sm={2}>
                                <TextField
                                    fullWidth
                                    value={action.name}
                                    onChange={(e) => modifyActions("name", e.target.value, index)}
                                    placeholder="Nombre" />
                            </Grid>
                            <Grid item sm={9}>
                                <TextField
                                    fullWidth
                                    value={action.description}
                                    onChange={(e) => modifyActions("description", e.target.value, index)}
                                    placeholder="Descripción" />
                            </Grid>
                            <Grid item sm={1}>
                                <IconButton onClick={() => removeAction(action)}>
                                    <ClearIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </>
                ))}
                <Grid item sm={12}>
                    <Button onClick={addReaction}>
                        AÑADIR REACCIÓN
                    </Button>
                </Grid>
                {reactions.map((reaction, index) => (
                    <>
                        <Grid container spacing={2} item sm={12}>
                            <Grid item sm={2}>
                                <TextField
                                    fullWidth
                                    value={reaction.name}
                                    onChange={(e) => modifyReactions("name", e.target.value, index)}
                                    placeholder="Nombre" />
                            </Grid>
                            <Grid item sm={9}>
                                <TextField
                                    fullWidth
                                    value={reaction.description}
                                    onChange={(e) => modifyReactions("description", e.target.value, index)}
                                    placeholder="Descripción" />
                            </Grid>
                            <Grid item sm={1}>
                                <IconButton onClick={() => removeReaction(reaction)}>
                                    <ClearIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </>
                ))}
                <Grid item sm={12}>
                    <Button onClick={addAbility}>
                        AÑADIR HABILIDAD
                    </Button>
                </Grid>
                {abilities.map((ability, index) => (
                    <>
                        <Grid container spacing={2} item sm={12}>
                            <Grid item sm={2}>
                                <TextField
                                    fullWidth
                                    value={ability.name}
                                    onChange={(e) => modifyAbilities("name", e.target.value, index)}
                                    placeholder="Nombre" />
                            </Grid>
                            <Grid item sm={9}>
                                <TextField
                                    fullWidth
                                    value={ability.description}
                                    onChange={(e) => modifyAbilities("description", e.target.value, index)}
                                    placeholder="Descripción" />
                            </Grid>
                            <Grid item sm={1}>
                                <IconButton onClick={() => removeAbility(ability)}>
                                    <ClearIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </>
                ))}
                <Grid item sm={12}>
                    <Button onClick={addLegendaryAction}>
                        AÑADIR ACCIÓN LEGENDARIA
                    </Button>
                </Grid>
                {legendaryActions.length > 0 && (
                    <TextField
                        fullWidth
                        multiline
                        placeholder="Descripción"
                        defaultValue={
                            `${(props.pronoun && props.pronoun.length > 0) ? props.pronoun + ' ' + props.creature.name.toLowerCase() : props.creature.name} puede llevar a cabo 3 acciones legendarias, escogiendo entre las opciones disponibles. Solo se puede utilizar una opción a la vez y solo al final del turno de otra criatura. ${props.creature.name} recupera las acciones legendarias usadas al principio de su turno.`
                        } />
                )}
                {legendaryActions.map((legendaryAction, index) => (
                    <>
                        <Grid container spacing={2} item sm={12}>
                            <Grid item sm={2}>
                                <TextField
                                    fullWidth
                                    value={legendaryAction.name}
                                    onChange={(e) => modifyLegendaryActions("name", e.target.value, index)}
                                    placeholder="Nombre" />
                            </Grid>
                            <Grid item sm={9}>
                                <TextField
                                    fullWidth
                                    value={legendaryAction.description}
                                    onChange={(e) => modifyLegendaryActions("description", e.target.value, index)}
                                    placeholder="Descripción" />
                            </Grid>
                            <Grid item sm={1}>
                                <IconButton onClick={() => removeLegendaryAction(legendaryAction)}>
                                    <ClearIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </>
                ))}
            </Grid>
        </React.Fragment>
    );
}