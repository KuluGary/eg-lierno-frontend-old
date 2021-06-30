import React, { useState, useEffect } from 'react';

import useStyles from './CreatureStats.styles';
import { StringUtil } from 'helpers/string-util';
import Stats from '../Stats';

import {
  Typography,
  Box,
  Divider,
  Paper,
  Tabs,
  Tab,
  Grid
} from '@material-ui/core';

export default function CreatureFlavor({
  creature
}) {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const cats = [];

    if (creature.stats.additionalAbilities.length > 0) {
      cats.push({
        label: "Habilidades",
        value: "additionalAbilities"
      });
    }

    if (creature.stats.actions.length > 0) {
      cats.push({
        label: "Acciones",
        value: "actions"
      })
    }

    if (creature.stats.reactions.length > 0) {
      cats.push({
        label: "Reacciones",
        value: "reactions"
      })
    }

    if (creature.stats.items?.length > 0) {
      cats.push({
        label: "Objetos",
        value: "items"
      })
    }

    if (creature.stats.legendaryActions?.length > 0) {
      cats.push({
        label: "Acciones legendarias",
        value: "legendaryActions"
      })
    }

    if (creature.stats.lairActions?.length > 0) {
      cats.push({
        label: "Acciones de guarida",
        value: "lairActions"
      })
    }

    if (creature.stats.regionalAbilities?.length > 0) {
      cats.push({
        label: "Efectos regionales",
        value: "regionalAbilities"
      })
    }

    setCategories(cats);

  }, [])

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setSelectedCategory(newValue);
  }

  const selectedData = () => {
    if (categories.length > 0) {

      const res = creature.stats[categories[selectedCategory].value];
      return res
    }

    return [];
  }

  return (
    <Paper variant="outlined" className={classes.profileBox}>
      <Box className={classes.content}>
        <Grid container spacing={1}>
          <Stats stats={creature.stats.abilityScores} modifiers={creature.stats.abilityScoreModifiers} mode="npc" />
        </Grid>

        <Divider className={classes.divider} />

        <Box>
          <Typography variant={'subtitle2'} display="inline">
            {'Armadura: '}
          </Typography>
          {creature.stats.armorClass + (creature.stats.armorType && ' (' + creature.stats.armorType + ')')}
        </Box>
        <Box>
          <Typography variant={'subtitle2'} display="inline">
            {'Puntos de vida: '}
          </Typography>

          {creature.stats.hitPointsStr}
        </Box>
        <Box>
          <Box>
            <Typography variant={'subtitle2'} display="inline">
              {'Velocidad: '}
            </Typography>

            {creature.stats.speed}

          </Box>
        </Box>

        <Divider className={classes.divider} />

        <Box>
          <Box>
            <Typography variant={'subtitle2'} display="inline">
              {'Tiradas de salvación: '}
            </Typography>

            {creature.stats.savingThrows.length > 0
              ? StringUtil.returnStringFromObjectArray(creature.stats.savingThrows, "modifierStr") : '—'}
          </Box>
          <Box>
            <Typography variant={'subtitle2'} display="inline">
              {'Habilidades: '}
            </Typography>

            {creature.stats.skills.length > 0
              ? StringUtil.returnModifierStr(creature.stats.skills, creature) : '—'}
          </Box>
          <Box>
            <Typography variant={'subtitle2'} display="inline">
              {'Sentidos: '}
            </Typography>

            {creature.stats.senses.length > 0 ? creature.stats.senses.join(", ") : '—'}

          </Box>
          {creature.stats.damageVulnerabilities.length > 0 && <Box>
            <Typography variant={'subtitle2'} display="inline">
              {'Vulnerabilidades al daño: '}
            </Typography>

            {creature.stats.damageVulnerabilities.join(", ")}

          </Box>}
          {creature.stats.damageResistances.length > 0 && <Box>
            <Typography variant={'subtitle2'} display="inline">
              {'Resistencias al daño: '}
            </Typography>

            {creature.stats.damageResistances.join(", ")}

          </Box>}
          {creature.stats.damageImmunities.length > 0 && <Box>
            <Typography variant={'subtitle2'} display="inline">
              {'Inmunidades al daño: '}
            </Typography>

            {creature.stats.damageImmunities.join(", ")}

          </Box>}
          {creature.stats.conditionImmunities.length > 0 && <Box>
            <Typography variant={'subtitle2'} display="inline">
              {'Inmunidades a las condiciones: '}
            </Typography>

            {creature.stats.conditionImmunities.join(", ")}

          </Box>}
          <Box>
            <Typography variant={'subtitle2'} display="inline">
              {'Idiomas: '}
            </Typography>

            {creature.stats.languages.length > 0
              ? creature.stats.languages.join(", ")
              : '–'}

          </Box>
          <Box>
            <Typography variant={'subtitle2'} display="inline">
              {'Valor de desafío: '}
            </Typography>

            {creature.stats.challengeRatingStr + (creature.stats.experiencePoints && ' (' + creature.stats.experiencePoints + ' XP)')}

          </Box>
        </Box>

        <Divider className={classes.divider} />

        <Tabs
          variant="scrollable"
          value={selectedCategory}
          onChange={handleChange}>
          {categories.map((category, index) => (
            <Tab key={index} label={category.label} {...a11yProps(category)} />
          ))}
        </Tabs>

        <Divider style={{ marginBottom: "1rem" }} />

        {selectedData().map((ability, i) => (
          <Box>
            <span 
              className={classes.abilityDescription} 
              dangerouslySetInnerHTML={{ __html: `<b>${ability.name}.</b> ${ability.description}` }} />
            {(i + 1 < selectedData().length) && <Divider className={classes.divider} />}
          </Box>
        ))}        
      </Box>
    </Paper>
  )
}
