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

export default function Items({
  items = [],
  setItems
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

  const addReaction = (name, description) => setItems([...items, { name, description }]);

  const modifyItems = (name, description) => {
    let newItems = [...items];
    newItems[selectedReaction] = { name, description };

    setItems(newItems);
    handleMenuClose();
  };

  const removeReaction = () => {
    const newItems = [...items];
    newItems.splice(selectedReaction, 1);

    setItems(newItems);
    handleMenuClose();
  }

  return (
    <>
      <Generation
        title="Añadir Objetos"
        addFunc={addReaction}
        modifyFunc={modifyItems}
        dialogOpen={reactionDialogOpen}
        openDialog={() => setReactionDialogOpen(false)}
        selectedItem={items[selectedReaction]} />

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">
                Objetos
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
          {items.map((reaction, index) => (
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
