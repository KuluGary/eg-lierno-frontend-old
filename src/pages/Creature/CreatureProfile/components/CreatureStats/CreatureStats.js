import React from 'react';
import useStyles from './CreatureStats.styles';
import { StringUtil } from 'helpers/string-util';
import Stats from '../Stats';

import {
  Typography,
  Box,
  Divider,
  Paper,
  IconButton,
  Grid
} from '@material-ui/core';

import {
  Share as ShareIcon,
  Edit as EditIcon,
  ArrowBackIos as ArrowBackIosIcon
} from '@material-ui/icons';

export default function CreatureFlavor({
  history,
  creature,
  type,
  editable,
  openDialog
}) {
  const classes = useStyles();
  
  return (
    <Paper variant="outlined" className={classes.profileBox}>
      <Box>
        <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant={'h2'} className={classes.title}>
            <IconButton onClick={history.goBack} className={classes.link}>
              <ArrowBackIosIcon />
            </IconButton>
            <Box component="span" style={{ height: "100%" }}>
              {creature.name}
            </Box>
          </Typography>
          <Box>
            <IconButton
              disabled={!editable}
              onClick={() => history.push(`/${type}/add/${creature._id}`)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={openDialog}>
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography variant={'subtitle1'}>
          {creature.flavor.gender + ' ' + creature.stats.race + ', ' + creature.flavor.class + ' ' + creature.stats.alignment}
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box>
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

        <Grid container spacing={1}>
          <Stats stats={creature.stats.abilityScores} modifiers={creature.stats.abilityScoreModifiers} mode="npc" />
        </Grid>

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
        {creature.stats.additionalAbilities.length > 0 &&
          <Box>
            <Box>
              {creature.stats.additionalAbilities.map(ability => (
                <Box component="p">
                  <Typography display="inline" variant="subtitle2">{ability.name + '. '}</Typography>
                  <span dangerouslySetInnerHTML={{ __html: ability.description }} />
                </Box>
              ))}
            </Box>
          </Box>
        }

        {creature.stats.actions.length > 0 &&
          <Box component="p">
            <Typography variant={'h6'}>Acciones</Typography>
            <Divider className={classes.fullWidthDivier} />
            <Box>
              {creature.stats.actions.map(action => (
                <Box component="p">
                  <Typography display="inline" variant="subtitle2">{action.name + '. '}</Typography>
                  <span dangerouslySetInnerHTML={{ __html: action.description }} />
                </Box>
              ))}
            </Box>
          </Box>
        }

        {creature.stats.reactions.length > 0 &&
          <Box>
            <Typography variant={'h6'}>Reacciones</Typography>
            <Divider className={classes.fullWidthDivier} />
            <Box>
              {creature.stats.reactions.map(reaction => (
                <Box component="p">
                  <Typography display="inline" variant="subtitle2">{reaction.name + '. '}</Typography>
                  <span dangerouslySetInnerHTML={{ __html: reaction.description }} />
                </Box>
              ))}
            </Box>
          </Box>
        }
        {creature.stats.legendaryActions.length > 0 &&
          <Box>
            <Typography variant={'h6'}>Acciones legendarias</Typography>
            <Divider className={classes.fullWidthDivier} />
            <Box>
              {creature.stats.legendaryActionsDescription}
            </Box>
            <Box>
              {creature.stats.legendaryActions.map(action => (
                <Box component="p">
                  <Typography display="inline" variant="subtitle2">{action.name + '. '}</Typography>
                  <span dangerouslySetInnerHTML={{ __html: action.description }} />
                </Box>
              ))}
            </Box>
          </Box>
        }
      </Box>
    </Paper>
  )
}
