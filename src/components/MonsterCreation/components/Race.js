import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    // fontWeight: 600,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: "100%",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function Race(props) {
  const classes = useStyles();
  const [senses, setSenses] = useState(props.creature.stats.senses || []);
  const [senseAux, setSenseAux] = useState('');
  const [languages, setLanguages] = useState(props.creature.stats.languages || []);
  const [languageAux, setLanguageAux] = useState('');
  const [selectedRace, setSelectedRace] = useState(props.creature.stats.race);
  const [selectedSize, setSelectedSize] = useState(props.creature.stats.size);
  const [speed, setSpeed] = useState(props.creature.stats.speed);
  const races = [
    "Aberración", "Bestia", "Celestial",
    "Construcción", "Dragón", "Elemental",
    "Hada", "Felón", "Gigante",
    "Humanoide", "Goblinoide", "Monstruosidad",
    "Viscoso", "Plantas", "No-muerto"
  ]

  const sizes = [
    "Diminuto", "Pequeño", "Medio", "Grande", "Enorme", "Gigantesco"
  ]

  useEffect(() => {
      props.addToCreatureStats(senses, "senses");
      props.addToCreatureStats(languages, "languages");
      props.addToCreatureStats(selectedRace, "race");
      props.addToCreatureStats(selectedSize, "size");
      props.addToCreatureStats(speed, "speed");
  }, [senses, languages, selectedRace, selectedSize, speed])

  const handleKeyDown = (e, type) => {
    if (e.key === 'Enter') {
      if (type === "sense" && senseAux.length > 0) {
        setSenses([...senses, senseAux]);
        setSenseAux('');
      } else if (languageAux.length > 0) {
        setLanguages([...languages, languageAux]);
        setLanguageAux('');
      }
    }
  }

  const handleChange = (e, type) => {
    if (type === "sense") {
      setSenseAux(e.target.value);
    } else {
      setLanguageAux(e.target.value)
    }
  }

  const handleDelete = (chipToDelete, type) => {
    if (type === "sense") {
      setSenses((senses) => senses.filter((sense) => sense !== chipToDelete))
    } else {
      setLanguages((languages) => languages.filter((language) => language !== chipToDelete))
    }
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Datos raciales
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <FormControl required className={classes.formControl}>
            <InputLabel id="race-select-label">Raza</InputLabel>
            <Select
              labelId="race-select-label"
              id="race-select"
              value={selectedRace || races[0]}
              onChange={(e) => setSelectedRace(e.target.value)}
            >
              {races.map((race, index) =>
                <MenuItem key={index} value={race}>{race}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel required id="size-select-label">Tamaño</InputLabel>
            <Select
              labelId="size-select-label"
              id="size-select"
              value={selectedSize || sizes[0]}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {sizes.map((size, index) =>
                <MenuItem key={index} value={size}>{size}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl required className={classes.formControl}>
            <TextField
              id="speed"
              name="speed"
              label="Velocidad (ft.)"
              fullWidth
              defaultValue={30}
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item sm={12}>
          {senses.map(sense => (
            <Chip
              label={sense}
              className={classes.chip}
              onDelete={() => handleDelete(sense, "sense")} />
          ))}
          <TextField
            id="senses"
            name="senses"
            label="Sentidos"
            value={senseAux}
            fullWidth
            onKeyDown={(e) => handleKeyDown(e, "sense")}
            onChange={(e) => handleChange(e, "sense")}
          />
        </Grid>
        <Grid item sm={12}>
          {languages.map(language => (
            <Chip
              label={language}
              className={classes.chip}
              onDelete={() => handleDelete(language, "language")} />
          ))}
          <TextField
            id="languages"
            name="languages"
            label="Idiomas"
            value={languageAux}
            fullWidth
            onKeyDown={(e) => handleKeyDown(e, "language")}
            onChange={(e) => handleChange(e, "language")}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}