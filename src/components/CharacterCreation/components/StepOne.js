import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Api from '../../../helpers/api'

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function StepOne() {
  const classes = useStyles();
  const [races, setRaces] = useState([]);
  const [_classes, setClasses] = useState([]);
  const [selectedRace, setSelectedRace] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [selectedLevel] = useState();
  const levels = Array.from({ length: 20 }, (_, i) => i + 1);

  useEffect(() => {
    Api.fetchInternal('/races')
      .then(res => setRaces(res));

    Api.fetchInternal('/classes')
      .then(res => setClasses(res));
  }, [])

  const handleChange = (event, type) => {
    switch (type) {
      case "race":
        setSelectedRace(event.target.value);
        break;
      default:
        setSelectedClass(event.target.value);
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Basic details
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Fill the details of your character, such as name, race and class.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Race</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedRace}
              onChange={(e) => handleChange(e, "race")}
            >
              {races.length > 0 && races.map(race =>
                <MenuItem value={race._id}>{race.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8} sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Class</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedClass}
              onChange={(e) => handleChange(e, "class")}
            >
              {_classes.length > 0 && _classes.map(_class =>
                <MenuItem value={_class._id}>{_class.name}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} sm={2}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Level</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedLevel}
              onChange={(e) => handleChange(e, "level")}
            >
              {levels.map((level, index) =>
                <MenuItem value={index + 1}>{index + 1}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="image"
            name="image"
            label="Portrait"
            fullWidth
          />
        </Grid>
        {selectedRace && races.filter(race => race._id === selectedRace)[0].subraces &&
          <>
            <Grid item xs={12} sm={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Subrace</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedClass}
                  onChange={(e) => handleChange(e, "subrace")}>
                  {races
                    .filter(race => race._id === selectedRace)[0].subraces.length > 0 && races
                      .filter(race => race._id === selectedRace)[0].subraces
                      .map(subrace => <MenuItem value={subrace}>{subrace}</MenuItem>)}
                </Select>
              </FormControl>
              <Grid item xs={0} sm={6}></Grid>
            </Grid>
          </>}
        <Grid item xs={12} sm={6}>
          <TextField
            id="image"
            name="image"
            label="Portrait"
            fullWidth
          />
        </Grid>
      </Grid>

    </>
  );
}