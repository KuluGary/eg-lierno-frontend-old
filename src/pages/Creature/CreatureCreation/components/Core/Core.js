import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Select from '@material-ui/core/Select';
import character_template from 'assets/json/character_template';
import { skills as JSONSkills, stats as JSONStats } from 'assets/json/customizable_stats';
import { Checkbox, FormLabel, Table, TableCell, TableRow } from '@material-ui/core';
import useStyles from './Core.styles';

function Core(props) {
  const classes = useStyles();
  const [savingThrows, setSavingThrows] = useState(props.creature.stats.savingThrows || []);
  const [proficiencyBonus, setProficiencyBonus] = useState(props.creature.stats.proficiencyBonus);
  const [abilityScores, setAbilityScores] = useState({
    strength: props.creature.stats.abilityScores.strength,
    dexterity: props.creature.stats.abilityScores.dexterity,
    constitution: props.creature.stats.abilityScores.constitution,
    intelligence: props.creature.stats.abilityScores.intelligence,
    wisdom: props.creature.stats.abilityScores.wisdom,
    charisma: props.creature.stats.abilityScores.charisma
  })

  const abilities = [
    { key: "strength", label: "Fuerza" },
    { key: "dexterity", label: "Destreza" },
    { key: "constitution", label: "Constitución" },
    { key: "intelligence", label: "Inteligencia" },
    { key: "wisdom", label: "Sabiduría" },
    { key: "charisma", label: "Carisma" }
  ];

  const [skills, setSkills] = useState(props.creature.stats.skills || []);

  const skillList = character_template.stats.skills;

  useEffect(() => {
    props.addToCreatureStats(abilityScores, "abilityScores");
    props.addToCreatureStats(proficiencyBonus, "proficiencyBonus");
    props.addToCreatureStats({
      strength: calculateAbilityScoreModifiers(abilityScores["strength"]),
      dexterity: calculateAbilityScoreModifiers(abilityScores["dexterity"]),
      constitution: calculateAbilityScoreModifiers(abilityScores["constitution"]),
      intelligence: calculateAbilityScoreModifiers(abilityScores["intelligence"]),
      wisdom: calculateAbilityScoreModifiers(abilityScores["wisdom"]),
      charisma: calculateAbilityScoreModifiers(abilityScores["charisma"]),
    }, "abilityScoreModifiers")

    const newSavingThrows = savingThrows.map(savingThrow => ({
      ability: savingThrow.ability || abilities.filter(ability => ability.label === savingThrow.name)[0].label,
      proficient: true,
      modifier: calculateAbilityScoreModifiers(parseInt(abilityScores[savingThrow.ability || abilities.filter(ability => ability.label === savingThrow.name)[0].label])),
      modifierStr: `${savingThrow.label || abilities.filter(ability => ability.key === savingThrow.ability)[0].label} ${(calculateAbilityScoreModifiers(parseInt(abilityScores[savingThrow.ability || abilities.filter(ability => ability.label === savingThrow.name)[0].key]), parseInt(proficiencyBonus)) >= 0 && '+') + calculateAbilityScoreModifiers(parseInt(abilityScores[savingThrow.ability]), parseInt(proficiencyBonus))}`
    }))

    props.addToCreatureStats(newSavingThrows, 'savingThrows')
    props.addToCreatureStats(skills, 'skills')
  }, [abilityScores, proficiencyBonus, savingThrows, skills])

  const calculateAbilityScoreModifiers = (ability, proficiency = 0) => {
    return Math.floor((ability - 10) / 2 + proficiency);
  }

  const addSavingThrow = () => {
    const indexOf = abilities.findIndex(ability => savingThrows.every(savingThrow => savingThrow.ability !== ability.key))
    savingThrows.length < abilities.length && setSavingThrows([...savingThrows, {
      ability: abilities[indexOf < 0 ? 0 : indexOf].key,
      proficient: true,
      label: abilities[indexOf < 0 ? 0 : indexOf].label
    }])
  }

  const addSkill = () => {
    const indexOf = Object.keys(skillList).findIndex(item => skills.every(skill => skill.id !== item));
    const id = Object.keys(skillList)[indexOf < 0 ? 0 : indexOf];
    const modifier = character_template.stats.skills[id].modifier;

    setSkills([...skills, {
      id,
      modifier,
      proficient: true,
      expertise: false
    }])
  }

  const handleSavingThrowChange = (event, savingThrowToChange) => {
    const indexOf = savingThrows.findIndex(savingThrow => savingThrow.ability === savingThrowToChange.ability);
    const newSavingThrow = {
      ability: event.target.value,
      proficient: true,
      label: abilities.filter(ability => ability.key === event.target.value)[0].label
    }

    const newSavingThrows = [...savingThrows]
    newSavingThrows[indexOf] = newSavingThrow;

    setSavingThrows(newSavingThrows);
  }

  const handleSkillChange = (event, skillToChange, key) => {
    const indexOf = skills.findIndex(skill => skill.id === skillToChange.id);
    const newSkill = {
      ...skillToChange,
      [key]: event
    }

    const newSkills = [...skills];
    newSkills[indexOf] = newSkill;

    setSkills(newSkills);
  }

  const removeSavingThrow = (savingThrowToRemove) => {
    const newSavingThrows = [...savingThrows].filter(savingThrow => savingThrow.ability !== savingThrowToRemove.ability)

    setSavingThrows(newSavingThrows)
  }

  const removeSkill = (skillToRemove) => {
    const newSkills = [...skills].filter(skill => skill.id !== skillToRemove.id)

    setSkills(newSkills)
  }

  const getTotalPointsScoreArray = (arr) => {
    let total = 0;

    for (const item of Object.values(arr)) {
      total += parseInt(item);
    }

    return total;
  }

  const getTypeOfScoreArray = (arr) => {
    const types = {
      "Terrible": 46,
      "Mala": 58,
      "Pobre": 63,
      "Mediana": 66,
      "Estándar": 72,
      "Buena": 73,
      "Heroica": 80,
      "Épica": 86
    }

    const total = getTotalPointsScoreArray(arr);
    let type;

    for (const t of Object.keys(types)) {
      const value = types[t];

      if (value <= total) {
        type = t;
      }
    }

    return type;
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Estadísticas
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Por favor detalla los datos estadísticos de tu personaje no jugable.
      </Typography>
      <Grid container spacing={2}>
        <Grid item sm={9} container spacing={2}>
          <Grid item sm={2}>
            <TextField
              id="name"
              name="name"
              label="FUE"
              type="number"
              value={abilityScores['strength']}
              onChange={(e) => setAbilityScores({ ...abilityScores, strength: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              id="name"
              name="name"
              label="DES"
              type="number"
              value={abilityScores['dexterity']}
              onChange={(e) => setAbilityScores({ ...abilityScores, dexterity: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              id="name"
              name="name"
              label="CON"
              type="number"
              value={abilityScores['constitution']}
              onChange={(e) => setAbilityScores({ ...abilityScores, constitution: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              id="name"
              name="name"
              label="INT"
              type="number"
              value={abilityScores['intelligence']}
              onChange={(e) => setAbilityScores({ ...abilityScores, intelligence: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              id="name"
              name="name"
              label="SAB"
              type="number"
              value={abilityScores['wisdom']}
              onChange={(e) => setAbilityScores({ ...abilityScores, wisdom: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              id="name"
              name="name"
              label="CAR"
              type="number"
              value={abilityScores['charisma']}
              onChange={(e) => setAbilityScores({ ...abilityScores, charisma: e.target.value })}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item sm={3} style={{ padding: "0 2rem" }}>
          <TextField 
            disabled
            variant="outlined"
            label={"Puntos usados"}
            helperText={"Calidad " + getTypeOfScoreArray(abilityScores).toLowerCase()}
            value={getTotalPointsScoreArray(abilityScores)} />
          {/* <Paper variant="outlined">
          <Box style={{ textTransform: "uppercase", opacity: .5 }}>Puntos usados</Box>
          <Divider />
          {getTotalPointsScoreArray(abilityScores)}
          {getTypeOfScoreArray(abilityScores)}
          </Paper> */}
        </Grid>
        <Grid item sm={4}>
          <TextField
            id="name"
            name="name"
            label="Bonus de proficiencia"
            type="number"
            value={proficiencyBonus}
            onChange={(e => setProficiencyBonus(e.target.value))}
            fullWidth
          />
        </Grid>
        <Grid item sm={12}>
          <Button onClick={addSavingThrow}>
            AÑADIR TIRADA DE SALVACIÓN
          </Button>
        </Grid>
        {savingThrows.map(savingThrow => (
          <>
            <Grid item sm={10}>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel id="demo-simple-select-label">Tirada de Salvación</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={(e) => handleSavingThrowChange(e, savingThrow)}
                  value={savingThrow.ability || abilities.filter(ability => ability.label === savingThrow.name)[0].key}>
                  {abilities
                    .map(ability => (
                      <MenuItem
                        value={ability.key}
                        disabled={savingThrows.filter(savingThrow => savingThrow.ability === ability.key).length > 0}>
                        {ability.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={2}>
              <IconButton onClick={() => removeSavingThrow(savingThrow)}>
                <ClearIcon />
              </IconButton>
            </Grid>
          </>
        ))}

        <Grid item sm={12}>
          <Button onClick={addSkill}>
            AÑADIR habilidad
          </Button>
        </Grid>
        <Grid item sm={12}>
          <Table>
            {skills.map(skill => (
              <TableRow>
                <TableCell>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="demo-simple-select-label">Habilidad</InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(e) => handleSkillChange(e.target.value, skill, "id")}
                      value={skill.id}
                    >
                      {Object.keys(skillList).map(item => (
                        <MenuItem
                          disabled={skills.some(o => o.id === item)}
                          value={item}>
                          {JSONSkills[item].name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="modifier">Modificador</InputLabel>
                    <Select
                      fullWidth
                      onChange={(e) => handleSkillChange(e.target.value, skill, "modifier")}
                      value={skill.modifier}>
                      {Object.keys(JSONStats).map(item => (
                        <MenuItem
                          value={item}>
                          {JSONStats[item].name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl className={classes.formControl}>
                    <FormLabel id="proficient">¿Proficiente?</FormLabel>
                    <Checkbox
                      checked={skill.proficient || skill.expertise}
                      value={skill.proficient}
                      onChange={(e) => handleSkillChange(!skill.proficient, skill, "proficient")} />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl className={classes.formControl}>
                    <FormLabel id="proficient">¿Pericia?</FormLabel>
                    <Checkbox
                      checked={skill.expertise}
                      value={skill.expertise}
                      onChange={(e) => handleSkillChange(!skill.expertise, skill, "expertise")} />
                  </FormControl>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => removeSkill(skill)}>
                    <ClearIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Grid>

      </Grid>
    </>
  );
}

export { Core };