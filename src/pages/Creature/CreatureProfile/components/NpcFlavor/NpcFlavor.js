import React from 'react';
import useStyles from './NpcFlavor.styles';
import Image from 'components/Image/Image';

import { useTheme } from '@material-ui/core/styles';
import {
  Typography,
  Box,
  Divider,
  Paper
} from '@material-ui/core';

export default function NpcFlavor({
  creature
}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Paper variant="outlined" className={classes.profileBox}>
      <Typography variant='h6'>
        {'Descripción. '}
      </Typography>
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
        padding: "0 1em 0 0"
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
