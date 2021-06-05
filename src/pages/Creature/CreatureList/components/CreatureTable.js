import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Link,
  TableFooter,
  TablePagination,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useHistoryState } from 'hooks/useHistoryState';
import Image from 'components/Image/Image';
import { useWidth } from 'hooks/media-query';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyles from './CreatureTable.styles';

export default function CreatureTable({
  creaturesToDisplay,
  campaign,
  profile,
  dm,
  type,
  history,
  deleteCreature
}) {
  const classes = useStyles();
  const [page, setPage] = useHistoryState(`${type}`, 0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedData, setSelectedData] = useState();
  const theme = useTheme();
  const width = useWidth();
  const open = Boolean(anchorEl);

  useEffect(() => {
    console.log(creaturesToDisplay)
    if (creaturesToDisplay.length > 0) {

      const charsToShow = creaturesToDisplay.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

      if (charsToShow.length === 0) {
        setPage(0);
      }
    }
  }, [type]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const downloadJson = () => {
    const jsonToDownload = creaturesToDisplay.find(creature => creature._id === selectedData);

    return encodeURIComponent(JSON.stringify(jsonToDownload));
  }
  
  const handleDelete = () => {
    deleteCreature(selectedData);
    handleClose();
  }

  return (
    <Table className={classes.table}>
      <TableBody>
        {creaturesToDisplay
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map(creature => (
            <TableRow key={creature._id} hover              
              className={classes.link}
              style={{
                opacity: creature.flavor.campaign[creature.flavor.campaign.findIndex(c => campaign === c.campaignId)].unlocked ? 1 : .5
              }}>
              {(width !== "xs") &&
                <>
                <TableCell style={{ padding: "1.5rem" }} onClick={() => history.push(`/${type}/${creature._id}`)}>
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <Image
                        mode="background"
                        usage="avatar"
                        src={creature.flavor.imageUrl}
                        containerStyle={{
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: "100%",
                          width: "4vw",
                          height: "4vw",
                        }}
                        style={{
                          backgroundImage: `url(${creature.flavor.imageUrl})`,
                          width: "4vw",
                          height: "4vw",
                          backgroundSize: "cover",
                          borderRadius: "100%"
                        }} />
                      <Box style={{ margin: "0 1rem" }}>
                        <Box component="div" >
                          <Typography variant="body" style={{ fontWeight: "500", fontSize: "1rem" }}>
                            {creature.name}
                          </Typography>
                        </Box>
                        <Box component="div">
                          <Typography variant="caption">
                            {[creature.stats.race, creature.flavor.class].filter(item => item).join(", ")}
                          </Typography>
                        </Box>
                        <Box component="div">
                          <Typography variant="caption">
                            {"Dificultad " + creature.stats.challengeRatingStr + (creature.stats.experiencePoints && ' (' + creature.stats.experiencePoints + ' XP)')}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box style={{ marginTop: "1rem", maxHeight: "4em", overflow: "hidden", }}>
                      <span dangerouslySetInnerHTML={{ __html: creature.flavor.description }} />
                    </Box>
                  </TableCell>
                </>}
              {(profile && dm) && profile._id === dm && <TableCell>
                <Link>
                  <IconButton onClick={(e) => {
                    setSelectedData(creature._id)
                    return handleMenu(e)
                  }}>
                    <MoreVertIcon />
                  </IconButton>
                </Link>
              </TableCell>}
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            colSpan={12}
            labelRowsPerPage={'Filas por página: '}
            labelDisplayedRows={
              ({ from, to, count }) => {
                return '' + from + '-' + to + ' de ' + count
              }
            }
            count={creaturesToDisplay.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage} />
        </TableRow>
      </TableFooter>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => history.push(`/${type}/add/${selectedData}`)}>Editar</MenuItem>
        <MenuItem onClick={handleClose}>
          <a className={classes.link} href={`data:text/json;charset=utf-8,${downloadJson()}`} download={`${selectedData}.json`}>
            Descargar
          </a>
        </MenuItem>
        <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
      </Menu>
    </Table>
  )
}
