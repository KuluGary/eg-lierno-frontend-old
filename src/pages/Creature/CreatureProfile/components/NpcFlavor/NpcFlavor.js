import React from 'react';
import useStyles from './NpcFlavor.styles';
import Image from 'components/Image/Image';

import { useTheme } from '@material-ui/core/styles';
import {
  Typography,
  Box,
  Divider,
  Paper,
  IconButton
} from '@material-ui/core';

import {
  Share as ShareIcon,
  Edit as EditIcon,
  ArrowBackIos as ArrowBackIosIcon
} from '@material-ui/icons';

export default function NpcFlavor({
  creature,
  history,
  editable,
  type,
  openDialog
}) {
  const classes = useStyles();
  const theme = useTheme();

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
              onClick={() => history.push(`/${type}/add/${creature?._id}`)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={openDialog}>
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography variant={'subtitle1'}>
          {[creature.flavor.class, creature.flavor.gender, creature.stats.race, creature.stats.alignment]
            .filter(el => el && el.length > 0)
            .map((el, i) => i > 0 ? el.toLowerCase() : el)
            .join(', ')}
        </Typography>
      </Box>
      <Divider className={classes.divider} />
      <Box component="p">
        {creature.flavor.description}
      </Box>
      <Image
        className={classes.image}
        mode="modal"
        usage="avatar"
        style={{
          border: `1px solid ${theme.palette.divider}`,
          float: "left",
          margin: ".5rem 1rem",
          marginLeft: 0,
          minWidth: "11rem",
          minHeight: "15rem",
          borderRadius: 4
        }}
        src={creature.flavor.imageUrl}
      />
      <Box component="p" style={{
        textAlign: "justify",
        // padding: "0 1em 0 0"
      }}>
        {creature.flavor.personality?.personality && <Box component="p">
          <Typography variant="subtitle1">{'Descripción psicológica'}</Typography>
          <Divider style={{ marginBottom: ".6rem" }} />
          <span dangerouslySetInnerHTML={{ __html: creature.flavor.personality.personality }} />
        </Box>}
        {creature.flavor.personality?.physical && <Box component="p">
          <Typography variant="subtitle1">{'Descripción física'}</Typography>
          <Divider style={{ marginBottom: ".6rem" }} />
          <span dangerouslySetInnerHTML={{ __html: creature.flavor.personality.physical }} />
        </Box>}
        {creature.flavor.personality?.backstory && <Box component="p">
          <Typography variant="subtitle1">{'Historia'}</Typography>
          <Divider style={{ marginBottom: ".6rem" }} />
          <span dangerouslySetInnerHTML={{ __html: creature.flavor.personality.backstory }} />
        </Box>}
      </Box>
    </Paper>
  )
}
