import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import useStyles from './Challenge.styles';

function Challenge(props) {
  const classes = useStyles();
  const [challengeRating, setChallengeRating] = useState(props.creature.stats.challengeRating);
  const [step, setStep] = useState(0.125)
  const [experience, setExperience] = useState(props.creature.stats.experiencePoints);
  const rows = [
    createData(0, 2, 13, 1 - 6, 3, 0 - 1, 13),
    createData(0.125, 2, 13, 7 - 35, 3, 2 - 3, 13),
    createData(0.25, 2, 13, 36 - 49, 3, 4 - 5, 13),
    createData(0.5, 2, 13, 50 - 70, 3, 6 - 8, 13),
    createData(1, 2, 13, 71 - 85, 3, 9 - 14, 13),
    createData(2, 2, 13, 86 - 100, 3, 15 - 20, 13),
    createData(3, 2, 13, 101 - 115, 4, 21 - 26, 13),
    createData(4, 2, 14, 116 - 130, 5, 27 - 32, 14),
    createData(5, 3, 15, 131 - 145, 6, 33 - 38, 15),
    createData(6, 3, 15, 141 - 160, 6, 39 - 44, 15),
    createData(7, 3, 15, 161 - 175, 6, 45 - 50, 15),
    createData(8, 3, 16, 176 - 190, 7, 51 - 56, 16),
    createData(9, 4, 16, 191 - 205, 7, 57 - 62, 16),
    createData(10, 4, 17, 206 - 220, 7, 63 - 68, 16),
    createData(11, 4, 17, 221 - 235, 8, 69 - 74, 17),
    createData(12, 4, 17, 236 - 250, 8, 75 - 80, 17),
    createData(13, 5, 18, 251 - 265, 8, 81 - 86, 18),
    createData(14, 5, 18, 266 - 280, 8, 87 - 92, 18),
    createData(15, 5, 18, 281 - 295, 8, 93 - 98, 18),
    createData(16, 5, 18, 296 - 310, 9, 99 - 104, 18),
    createData(17, 6, 19, 311 - 325, 10, 105 - 110, 19),
    createData(18, 6, 19, 326 - 340, 10, 111 - 116, 19),
    createData(19, 6, 19, 341 - 355, 10, 117 - 122, 19),
    createData(20, 6, 19, 356 - 400, 10, 123 - 140, 19),
    createData(21, 7, 19, 401 - 445, 11, 141 - 158, 20),
    createData(22, 7, 19, 446 - 490, 11, 159 - 176, 20),
    createData(23, 7, 19, 491 - 535, 11, 177 - 194, 20),
    createData(24, 7, 19, 536 - 580, 12, 195 - 212, 21),
    createData(25, 8, 19, 581 - 625, 12, 213 - 230, 21),
    createData(26, 8, 19, 626 - 670, 12, 231 - 248, 21),
    createData(27, 8, 19, 671 - 715, 13, 249 - 266, 22),
    createData(28, 8, 19, 716 - 760, 13, 267 - 284, 22),
    createData(29, 9, 19, 761 - 805, 13, 285 - 302, 22),
    createData(30, 9, 19, 806 - 850, 14, 303 - 320, 23)
  ]

  const experienceByCr = {
    "0": 10,
    "0.125": 25,
    "0.25": 50,
    "0.5": 100,
    "1": 200,
    "2": 450,
    "3": 700,
    "4": 1100,
    "5": 1800,
    "6": 2300,
    "7": 2900,
    "8": 3900,
    "9": 5000,
    "10": 5900,
    "11": 7200,
    "12": 8400,
    "13": 10000,
    "14": 11500,
    "15": 13000,
    "16": 15000,
    "17": 18000,
    "18": 20000,
    "19": 22000,
    "20": 25000,
    "21": 33000,
    "22": 41000,
    "23": 50000,
    "24": 62000,
    "25": 75000,
    "26": 90000,
    "27": 105000,
    "28": 120000,
    "29": 135000,
    "30": 155000
  }

  useEffect(() => {
    props.addToCreatureStats(challengeRating, "challengeRating");
    props.addToCreatureStats(experience, "experiencePoints");
    props.addToCreatureStats(generateCRString(challengeRating), "challengeRatingStr")
  }, [challengeRating, experience])

  const generateCRString = challengeRatingInt => {
    let challengeRatingStr;

    if (challengeRatingInt) {
      if (challengeRatingInt === 0.125) {
        challengeRatingStr = "1/8";
      } else if (challengeRatingInt === 0.25) {
        challengeRatingStr = "1/4";
      } else if (challengeRatingInt === 0.5) {
        challengeRatingStr = "1/2";
      } else {
        challengeRatingStr = challengeRatingInt.toString();
      }
    }

    return challengeRatingStr;
  }

  function createData(cr, prof, ac, hp, bonus, damage, dc) {
    return { cr, prof, ac, hp, bonus, damage, dc };
  }

  function modifyStep(e) {
    const value = parseFloat(e.target.value);

    if (value <= 0) {
      setStep(0.125)
    } else if (value <= 0.25) {
      setStep(0.25)
    } else if (value <= 0.5) {
      setStep(0.5)
    } else if (value > 0.5) {
      setStep(1)
    }

    setChallengeRating(e.target.value);
    setExperience(experienceByCr[e.target.value]);
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Desafío
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Por favor establece el nivel de dificultad del enemigo.
      </Typography>
      <Grid container spacing={3}>
        <Grid item sm={6}>
          <TextField
            required
            type="number"
            id="challenge"
            name="challenge"
            label="Desafío"
            onChange={(e) => {
              modifyStep(e);
            }}
            value={challengeRating}
            defaultValue={step}
            inputProps={{
              step: step,
              min: 0,
              max: 30
            }}
            fullWidth
          />
        </Grid>
        <Grid item sm={6}>
          <FormControl className={classes.formControl}>
            <TextField
              required
              type="number"
              id="xp"
              name="xp"
              label="Experiencia"
              defaultValue={0}
              value={experience}
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item sm={12}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Desafío</TableCell>
                <TableCell>Bon. de Proficiencia</TableCell>
                <TableCell>Clase de Armadura</TableCell>
                <TableCell>PdV</TableCell>
                <TableCell>Bonus de ataque</TableCell>
                <TableCell>Daño por ronda</TableCell>
                <TableCell>CD de Salvación</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow>
                  <TableCell>
                    {row.cr}
                  </TableCell>
                  <TableCell>
                    {row.prof}
                  </TableCell>
                  <TableCell>
                    {row.ac}
                  </TableCell>
                  <TableCell>
                    {row.hp}
                  </TableCell>
                  <TableCell>
                    {row.bonus}
                  </TableCell>
                  <TableCell>
                    {row.damage}
                  </TableCell>
                  <TableCell>
                    {row.dc}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>

    </>
  );
}

export { Challenge };