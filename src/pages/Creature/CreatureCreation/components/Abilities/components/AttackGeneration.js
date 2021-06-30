import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';

export default function AttacksGeneration({
  addFunc,
  dialogOpen,
  openDialog,
  abilityScoreModifiers,
  proficiencyBonus
}) {
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

  const generateAttack = () => {
    addFunc(attackName, createDescription());
    openDialog(false);
    resetAttackGeneration();
  }

  const createDescription = () => {
    let type;
    let ability = "strength";
    if (attackProperties.includes('Sutil') || (attackRange.includes('Distancia') && !attackRange.includes('Melé'))) {
      ability = "dexterity"
    }

    if (attackRange.includes('Melé') && attackRange.includes('Distancia')) {
      type = "Ataque de arma melé o distancia: ";
    } else if (attackRange.includes('Melé')) {
      type = 'Ataque de arma melé: '
    } else if (attackRange.includes('Distancia')) {
      type = 'Ataque de arma distancia: '
    } else {
      type = 'Ataque de arma: '
    }

    let toHit = parseInt(abilityScoreModifiers[ability]) + parseInt(proficiencyBonus);
    let rangeStr;

    if (attackRange.includes('Melé') && attackRange.includes('Distancia')) {
      rangeStr = "alcance " + attackReach + " ft. o alcance " + attackShortReach + "/" + attackLongReach + " ft."
    } else if (attackRange.includes('Melé')) {
      rangeStr = "alcance " + attackReach + "ft.";
    } else if (attackRange.includes('Distancia')) {
      rangeStr = "alcance " + attackShortReach + "/" + attackLongReach + " ft.";
    }

    let damageMod = abilityScoreModifiers[ability];
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
      hitStr = hitStr + " o " + twoHandedDamageStr + " si es usado con dos manos para hacer un ataque melé";
      needsCommaBeforeBonusDamage = true;
    }

    if (attackProperties.includes('Daño extra')) {
      if (needsCommaBeforeBonusDamage) {
        hitStr = hitStr + ",";
        needsCommaBeforeBonusDamage = false;
      }
      hitStr = hitStr + " más " + bonusDamageStr;
    }

    let description = "<em>" + type + "</em>" + toHit + " al golpe, " + rangeStr
      + ", un objetivo. <em>Daño:</em> " + hitStr + ".";

    if (attackProperties && attackProperties.length > 0) {
      description = description + ' <small><em>Propiedades: ' + attackProperties + '</em></small>'
    }
    return ('<p>' + description + '</p>');
  }

  const createDamageStr = (damageType, diceSize, numDice, modifier) => {
    let diceAvg = (diceSize / 2.0) + 0.5;
    let avgDamage = Math.floor(numDice * diceAvg) + modifier;
    let damageStr = avgDamage + " (" + numDice + "d" + diceSize;
    if (modifier !== 0) {
      damageStr = damageStr + (modifier >= 0 ? " + " : "") + modifier;
    }
    damageStr = damageStr + ") daño " + damageType.toLowerCase();
    return damageStr;
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

  return (
    <Dialog maxWidth={'md'} open={dialogOpen} style={{ padding: 10 }}>
      <DialogTitle>Genera un ataque</DialogTitle>
      <DialogContent>
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
        <Button onClick={openDialog} color="default">Cerrar</Button>
        <Button color="default" onClick={generateAttack} autoFocus>Generar</Button>
      </DialogActions>
    </Dialog>
  )
}
