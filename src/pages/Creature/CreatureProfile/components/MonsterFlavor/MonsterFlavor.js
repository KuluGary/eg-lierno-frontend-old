import React from 'react';
import useStyles from './MonsterFlavor.styles';
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

export default function MonsterFlavor({
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
      <Image
        className={classes.image}
        mode="modal"
        usage="avatar"
        style={{
          border: `1px solid ${theme.palette.divider}`,
          float: "left",
          /*margin: ".5rem 1rem",*/
          marginLeft: 0,
          marginBottom: "1rem",
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
          <span dangerouslySetInnerHTML={{ __html: creature.flavor.description }} />
      </Box>
    </Paper>
  )
}
