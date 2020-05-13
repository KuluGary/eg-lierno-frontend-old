import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  title: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    minWidth: "100%",
    margin: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function Defense(props) {
  const classes = useStyles();
  const [damageVulnerabilities, setDamageVulnerabilities] = useState(props.creature.stats.damageVulnerabilities || []);
  const [damageVulnerabilityAux, setDamageVulnerabilityAux] = useState('');
  const [damageResistances, setDamageResistances] = useState(props.creature.stats.damageResistances || []);
  const [damageResistanceAux, setDamageResistanceAux] = useState('');
  const [damageImmunities, setDamageImmunities] = useState(props.creature.stats.damageImmunities || []);
  const [damageImmunityAux, setDamageImmunityAux] = useState('');
  const [conditionImmunities, setConditionImmunities] = useState(props.creature.stats.conditionImmunities || []);
  const [conditionImmunityAux, setConditionImmunityAux] = useState('');
  const [damageDie, setDamageDie] = useState(props.creature.stats.numHitDie);
  const [dieSize, setDieSize] = useState(props.creature.stats.hitDieSize);
  const [armorType, setArmorType] = useState(props.creature.stats.armorType || '');
  const [armorClass, setArmorClass] = useState(props.creature.stats.armorClass || 10);

  useEffect(() => {
      const hitPoints = damageDie * ((dieSize/2.0) + 0.5 + props.creature.stats.abilityScoreModifiers["constitution"]);
      const extraHealthFromConstitution = props.creature.stats.abilityScoreModifiers['constitution'] * damageDie;
      let sign = extraHealthFromConstitution >= 0 ? "+" : "-";
      props.addToCreatureStats(damageDie, "numHitDie");
      props.addToCreatureStats(dieSize, "hitDieSize");
      props.addToCreatureStats(armorType, "armorType");
      armorType && armorType.length > 0 && props.addToCreatureStats("(" + armorType + ")", "armorTypeStr");
      props.addToCreatureStats(armorClass, "armorClass");
      props.addToCreatureStats(damageVulnerabilities, "damageVulnerabilities");
      props.addToCreatureStats(damageResistances, "damageResistances");
      props.addToCreatureStats(damageImmunities, "damageImmunities");
      props.addToCreatureStats(conditionImmunities, "conditionImmunities");
      props.addToCreatureStats(Math.floor(hitPoints), "hitPoints");
      props.addToCreatureStats(Math.floor(Math.abs(extraHealthFromConstitution)), "extraHealthFromConstitution")
      props.addToCreatureStats(`${Math.floor(hitPoints)} (${damageDie}d${dieSize} ${sign} ${Math.floor(Math.abs(extraHealthFromConstitution))})`, "hitPointsStr")
  }, [damageDie, dieSize, armorType, armorClass, damageVulnerabilities, damageResistances, damageImmunities, conditionImmunities])

  const handleKeyDown = (e, type) => {
    if (e.key === 'Enter') {
      switch (type) {
        case 'damageVulnerability':
          if (damageVulnerabilityAux.length > 0) {
            setDamageVulnerabilities([...damageVulnerabilities, damageVulnerabilityAux]);
            setDamageVulnerabilityAux('');
          }
          break;
        case 'damageResistance':
          if (damageResistanceAux.length > 0) {
            setDamageResistances([...damageResistances, damageResistanceAux])
            setDamageResistanceAux('')
          }
          break;
        case 'damageImmunity':
          if (damageImmunityAux.length > 0) {
            setDamageImmunities([...damageImmunities, damageImmunityAux])
            setDamageImmunityAux('')
          }
          break;
        case 'conditionImmunity':
          if (conditionImmunityAux.length > 0) {
            setConditionImmunities([...conditionImmunities, conditionImmunityAux])
            setConditionImmunityAux('')
          }
          break;
      }
    }
  }

  const handleChange = (e, type) => {
    switch (type) {
      case "damageVulnerability":
        setDamageVulnerabilityAux(e.target.value);
        break;
      case "damageResistance":
        setDamageResistanceAux(e.target.value);
        break;
      case "damageImmunity":
        setDamageImmunityAux(e.target.value);
        break;
      case "conditionImmunity":
        setConditionImmunityAux(e.target.value);
        break;
    }
  }

  const handleDelete = (chipToDelete, type) => {
    switch (type) {
      case "damageVulnerability":
        setDamageVulnerabilities((damageVulnerabilities) => damageVulnerabilities.filter((damageVulnerability) => damageVulnerability !== chipToDelete));
        break;
      case "damageResistance":
        setDamageResistances((damageResistances) => damageResistances.filter((damageResistance) => damageResistance !== chipToDelete));
        break;
      case "damageImmunity":
        setDamageImmunities((damageImmunities) => damageImmunities.filter((damageImmunity) => damageImmunity !== chipToDelete));
        break;
      case "conditionImmunity":
        setConditionImmunities((conditionImmunities) => conditionImmunities.filter((conditionImmunity) => conditionImmunity !== chipToDelete));
        break;
    }
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Defensas
      </Typography>
      <Grid container spacing={2}>
        <Grid item sm={3}>
          <TextField
            id="name"
            name="name"
            label="# de dados de golpe"
            type="number"
            defaultValue={1}
            value={damageDie}
            onChange={(e => setDamageDie(e.target.value))}
            fullWidth
          />
        </Grid>
        <Grid item sm={3}>
          <TextField
            id="name"
            name="name"
            label="Tam. de dado de golpe"
            type="number"
            defaultValue={8}
            value={dieSize}
            onChange={(e => setDieSize(e.target.value))}
            fullWidth
          />
        </Grid>
        <Grid item sm={3}>
          <TextField
            id="name"
            name="name"
            label="Tipo de armadura"
            value={armorType}
            onChange={(e) => setArmorType(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item sm={3}>
          <TextField
            id="name"
            name="name"
            label="Clase de Armadura"
            type="number"
            defaultValue={10}
            value={armorClass}
            onChange={(e) => setArmorClass(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item sm={12}>
          {damageVulnerabilities.map(damageVulnerability => (
            <Chip
              label={damageVulnerability}
              className={classes.chip}
              onDelete={() => handleDelete(damageVulnerability, "damageVulnerability")}
            />
          ))}
          <TextField
            id="name"
            name="name"
            label="Vulnerabilidad al daño"
            value={damageVulnerabilityAux}
            fullWidth
            onKeyDown={(e) => handleKeyDown(e, "damageVulnerability")}
            onChange={(e) => handleChange(e, "damageVulnerability")}
          />
        </Grid>
        <Grid item sm={12}>
          {damageResistances.map(damageResistance => (
            <Chip
              label={damageResistance}
              className={classes.chip}
              onDelete={() => handleDelete(damageResistance, "damageResistance")}
            />
          ))}
          <TextField
            id="name"
            name="name"
            label="Resistencias al daño"
            value={damageResistanceAux}
            fullWidth
            onKeyDown={(e) => handleKeyDown(e, "damageResistance")}
            onChange={(e) => handleChange(e, "damageResistance")}
          />
        </Grid>
        <Grid item sm={12}>
          {damageImmunities.map(damageImmunity => (
            <Chip
              label={damageImmunity}
              className={classes.chip}
              onDelete={() => handleDelete(damageImmunity, "damageImmunity")}
            />
          ))}
          <TextField
            id="name"
            name="name"
            label="Inmunidades al daño"
            value={damageImmunityAux}
            fullWidth
            onKeyDown={(e) => handleKeyDown(e, "damageImmunity")}
            onChange={(e) => handleChange(e, "damageImmunity")}
          />
        </Grid>
        <Grid item sm={12}>
          {conditionImmunities.map(conditionImmunity => (
            <Chip
              label={conditionImmunity}
              className={classes.chip}
              onDelete={() => handleDelete(conditionImmunity, "conditionImmunity")}
            />
          ))}
          <TextField
            id="name"
            name="name"
            label="Inmunidades a las condiciones"
            value={conditionImmunityAux}
            fullWidth
            onKeyDown={(e) => handleKeyDown(e, "conditionImmunity")}
            onChange={(e) => handleChange(e, "conditionImmunity")}
          />
        </Grid>
      </Grid>
    </>
  );
}