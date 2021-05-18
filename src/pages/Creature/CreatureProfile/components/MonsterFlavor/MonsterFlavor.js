import React from 'react';
import useStyles from './MonsterFlavor.styles';
import Image from 'components/Image/Image';

import { useTheme } from '@material-ui/core/styles';
import {
  Typography,
  Box,
  Divider,
  Paper
} from '@material-ui/core';

export default function MonsterFlavor({
  creature
}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Paper variant="outlined" className={classes.profileBox}>
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
        containerStyle={{
          maxWidth: "80vw"
        }}
        src={creature.flavor.imageUrl}
      />
      <Box component="p" style={{
        textAlign: "justify",
        padding: "0 1em 0 0"
      }}>
        <Box component="p">
          <Typography variant='h6'>
            {'Descripción'}
          </Typography>
          <Divider style={{ marginBottom: ".6rem" }} />
          {/* {creature.flavor.description} */}
          <span dangerouslySetInnerHTML={{ __html: creature.flavor.description }} />
        </Box>
      </Box>
    </Paper>
  )
}
