import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

export default function StepTwo() {
  // const stats = [8, 8, 8, 8, 8, 8];
  const baseStat = 8;
  const [statPool, setStatPool] = useState(27);
  const [str, setStr] = useState(0);
  const [dex, setDex] = useState(0);
  const [con, setCon] = useState(0);
  const [int, setInt] = useState(0);
  const [wis, setWis] = useState(0);
  const [cha, setCha] = useState(0);

  const setCount = (num, type) => {
    switch (type) {
      case "str":
        if (statPool > 0 || num < 0) {
          setStatPool(statPool - num * (str >= 5 ? 2 : 1))

          setStr(str + num);
        }
        break;
      case "dex":
        if (statPool > 0 || num < 0) {
          setStatPool(statPool - num * (dex >= 5 ? 2 : 1))

          setDex(dex + num);
        }
        break;
      case "con":
        if (statPool > 0 || num < 0) {
          setStatPool(statPool - num * (con >= 5 ? 2 : 1))

          setCon(con + num);
        }
        break;
      case "int":
        if (statPool > 0 || num < 0) {
          setStatPool(statPool - num * (int >= 5 ? 2 : 1))

          setInt(int + num);
        }
        break;
      case "wis":
        if (statPool > 0 || num < 0) {
          setStatPool(statPool - num * (wis >= 5 ? 2 : 1))

          setWis(wis + num);
        }
        break;
      case "cha":
        if (statPool > 0 || num < 0) {
          setStatPool(statPool - num * (cha >= 5 ? 2 : 1))

          setCha(cha + num);
        }
        break;
      default:
    }
  }

  return (
    <>
    <Box>
      <Typography variant="h6" inline>
        Character Stats – {statPool > 0 ? statPool : '✔'}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Add your stat numbers with a point buy system.
      </Typography>
    </Box>
      <Grid container spacing={3}>
        <Grid item md={4}>
          Strength
          <ButtonGroup>
            <Button
              disabled={baseStat + str <= 8}
              aria-label="reduce"
              onClick={() => {
                setCount(-1, "str");
              }}
            >
              <RemoveIcon fontSize="small" />
            </Button>
            <TextField
              disabled
              value={baseStat + str}
            />
            <Button
              disabled={baseStat + str >= 15}
              aria-label="increase"
              onClick={() => {
                setCount(1, "str");
              }}
            >
              <AddIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item md={4}>
          Dexterity
          <ButtonGroup>
            <Button
              disabled={baseStat + dex <= 8}
              aria-label="reduce"
              onClick={() => {
                setCount(- 1, "dex");
              }}
            >
              <RemoveIcon fontSize="small" />
            </Button>
            <TextField
              disabled
              value={baseStat + dex}
            />
            <Button
              disabled={baseStat + dex >= 15}
              aria-label="increase"
              onClick={() => {
                setCount(1, "dex");
              }}
            >
              <AddIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item md={4}>
          Constitution
          <ButtonGroup>
            <Button
              disabled={baseStat + con <= 8}
              aria-label="reduce"
              onClick={() => {
                setCount(- 1, "con");
              }}
            >
              <RemoveIcon fontSize="small" />
            </Button>
            <TextField
              disabled
              value={baseStat + con}
            />
            <Button
              disabled={baseStat + con >= 15}
              aria-label="increase"
              onClick={() => {
                setCount(1, "con");
              }}
            >
              <AddIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item md={4}>
          Intelligence
          <ButtonGroup>
            <Button
              disabled={baseStat + int <= 8}
              aria-label="reduce"
              onClick={() => {
                setCount(- 1, "int");
              }}
            >
              <RemoveIcon fontSize="small" />
            </Button>
            <TextField
              disabled
              value={baseStat + int}
            />
            <Button
              disabled={baseStat + int >= 15}
              aria-label="increase"
              onClick={() => {
                setCount(1, "int");
              }}
            >
              <AddIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item md={4}>
          Wisdom
          <ButtonGroup>
            <Button
              disabled={baseStat + wis <= 8}
              aria-label="reduce"
              onClick={() => {
                setCount(-1, "wis");
              }}
            >
              <RemoveIcon fontSize="small" />
            </Button>
            <TextField
              disabled
              value={baseStat + wis}
            />
            <Button
              disabled={baseStat + wis >= 15}
              aria-label="increase"
              onClick={() => {
                setCount(1, "wis");
              }}
            >
              <AddIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item md={4}>
          Charisma
          <ButtonGroup>
            <Button
              disabled={baseStat + cha <= 8}
              aria-label="reduce"
              onClick={() => {
                setCount(- 1, "cha");
              }}
            >
              <RemoveIcon fontSize="small" />
            </Button>
            <TextField
              disabled
              value={baseStat + cha}
            />
            <Button
              disabled={baseStat + cha >= 15}
              aria-label="increase"
              onClick={() => {
                setCount(1, "cha");
              }}
            >
              <AddIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </Grid>

      </Grid>
    </>
  );
}