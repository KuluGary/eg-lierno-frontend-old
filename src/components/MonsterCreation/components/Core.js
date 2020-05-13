import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  title: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    minWidth: "100%",
    margin:  theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function Core(props) {
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
  const skillList = [
    "Acrobacias",
    "Atletismo",
    "C.Arcano",
    "Engaño",
    "Historia",
    "Interpretación",
    "Intimidación",
    "Investigación",
    "Juego de Manos",
    "Medicina",
    "Naturaleza",
    "Percepción",
    "Perspicacia",
    "Persuasión",
    "Religión",
    "Sigilo",
    "Supervivencia",
    "T. con Animales"
  ];

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
        ability: savingThrow.ability,
        proficient: true,
        modifier: calculateAbilityScoreModifiers(parseInt(abilityScores[savingThrow.ability])),
        modifierStr: `${savingThrow.label} ${(calculateAbilityScoreModifiers(parseInt(abilityScores[savingThrow.ability])) >= 0 && '+') + calculateAbilityScoreModifiers(parseInt(abilityScores[savingThrow.ability]))}`
      }))

      props.addToCreatureStats(newSavingThrows, 'savingThrows')
      props.addToCreatureStats(skills, 'skills')
  }, [abilityScores, proficiencyBonus, savingThrows, skills])

  const calculateAbilityScoreModifiers = (ability) => {
    return Math.floor((ability - 10) / 2);
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
    const indexOf = skillList.findIndex(item => skills.every(skill => skill.name !== item));
    skills.length < skillList.length && setSkills([...skills,  {
      name: skillList[indexOf < 0 ? 0 : indexOf],
      proficient: true
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

  const handleSkillChange = (event, skillToChange) => {
    const indexOf = skills.findIndex(skill => skill.name === skillToChange.name);
    const newSkill =  {
      name: event.target.value,
      proficient: true
    }

    const newSkills  = [...skills];
    newSkills[indexOf] = newSkill;

    setSkills(newSkills);
  }

  const removeSavingThrow = (savingThrowToRemove) => {
    const newSavingThrows  = [...savingThrows].filter(savingThrow => savingThrow.ability !== savingThrowToRemove.ability)

    setSavingThrows(newSavingThrows)
  }

  const removeSkill = (skillToRemove) => {
    const newSkills = [...skills].filter(skill => skill.name !== skillToRemove.name)

    setSkills(newSkills)
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Estadísticas
      </Typography>
      <Grid container spacing={2}>
        <Grid item sm={2}>
          <TextField
            id="name"
            name="name"
            label="FUE"
            type="number"
            value={abilityScores['strength']}
            onChange={(e) => setAbilityScores({...abilityScores, strength: e.target.value})}
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
            onChange={(e) => setAbilityScores({...abilityScores, dexterity: e.target.value})}
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
            onChange={(e) => setAbilityScores({...abilityScores, constitution: e.target.value})}
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
            onChange={(e) => setAbilityScores({...abilityScores, intelligence: e.target.value})}
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
            onChange={(e) => setAbilityScores({...abilityScores, wisdom: e.target.value})}
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
            onChange={(e) => setAbilityScores({...abilityScores, charisma: e.target.value})}
            fullWidth
          />
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
              <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Tirada de Salvación</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(e) => handleSavingThrowChange(e, savingThrow)}
                    value={savingThrow.ability}
                  >
                    {abilities
                      .map(ability =>  (
                        <MenuItem 
                          value={ability.key}
                          disabled={savingThrows.filter(savingThrow => savingThrow.ability == ability.key).length > 0}>
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
          {skills.map(skill => (
            <>
              <Grid item sm={10}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Habilidad</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(e) => handleSkillChange(e, skill)}
                    value={skill.name}
                  >
                    {skillList
                      .map(item =>  (
                        <MenuItem 
                          value={item}
                          disabled={skills.filter(skill => skill.name == item).length > 0}>
                            {item}
                        </MenuItem>
                      ))}
                    </Select>
                </FormControl>
              </Grid>
              <Grid item sm={2}>
                <IconButton onClick={() => removeSkill(skill)}>
                  <ClearIcon />
                </IconButton>
              </Grid>
            </>
          ))}          
    </Grid> 
    </>
  );
}