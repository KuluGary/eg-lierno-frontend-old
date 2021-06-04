import React from 'react';
import Generation from './GenericGeneration';
import {
  IconButton,
  Box,
  Menu,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@material-ui/core';

import {
  MoreHoriz as MoreHorizIcon,
  Add as AddIcon
} from '@material-ui/icons';

export default function Reactions({
  reactions = [],
  setReactions
}) {
  const [selectedReaction, setSelectedReaction] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [reactionDialogOpen, setReactionDialogOpen] = React.useState(false)
  const open = Boolean(anchorEl);

  React.useEffect(() => setAnchorEl, [reactionDialogOpen])

  const handleMenu = (event, index) => {
    setSelectedReaction(index);
    setAnchorEl(event.currentTarget)
  };

  const handleMenuClose = () => {
    setSelectedReaction(null);
    setAnchorEl(null);
  };

  const addReaction = (name, description) => setReactions([...reactions, { name, description }]);

  const modifyReactions = (name, description) => {
    let newReactions = [...reactions];
    newReactions[selectedReaction] = { name, description };

    setReactions(newReactions);
    handleMenuClose();
  };

  const removeReaction = () => {
    const newReactions = [...reactions];
    newReactions.splice(selectedReaction, 1);

    setReactions(newReactions);
    handleMenuClose();
  }

  return (
    <>
      <Generation
        title="Añadir Reacciones"
        addFunc={addReaction}
        modifyFunc={modifyReactions}
        dialogOpen={reactionDialogOpen}
        openDialog={() => setReactionDialogOpen(false)}
        selectedItem={reactions[selectedReaction]} />

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">
                Reacciones
              </Typography>
            </TableCell>
            <TableCell align="right">
              <IconButton size="small" onClick={() => setReactionDialogOpen(true)}>
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reactions.map((reaction, index) => (
            <TableRow>
              <TableCell>
                <Box style={{ marginLeft: "2rem" }}>
                  {reaction.name}
                </Box>
              </TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={(e) => handleMenu(e, index)}>
                  <MoreHorizIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Menu
        open={open}
        keepMounted
        id="menu-appbar"
        onClose={handleMenuClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MenuItem onClick={setReactionDialogOpen}>Editar</MenuItem>
        <MenuItem onClick={removeReaction}>Eliminar</MenuItem>
      </Menu>
    </>
  )
}
