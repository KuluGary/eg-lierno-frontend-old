import React from 'react'
import Generation from './GenericGeneration';
import { StringUtil } from "helpers/string-util";
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  Box
} from '@material-ui/core';

import {
  MoreHoriz as MoreHorizIcon,
  Add as AddIcon
} from '@material-ui/icons';

export default function LegendaryActions({
  name,
  pronoun,
  nameIsProper,
  legendaryActions,
  setLegendaryActions
}) {
  const [selectedLegendaryAction, setSelectedLegendaryAction] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [legendaryActionsDialogOpen, setLegendaryActionsDialogOpen] = React.useState(false)
  const open = Boolean(anchorEl);

  React.useEffect(() => setAnchorEl, [legendaryActionsDialogOpen]);

  const handleMenu = (event, index) => {
    setSelectedLegendaryAction(index);
    setAnchorEl(event.currentTarget)
  };

  const handleMenuClose = () => {
    setSelectedLegendaryAction(null);
    setAnchorEl(null);
  };

  const addLegendaryAction = (name, description) => setLegendaryActions([...legendaryActions, { name, description }]);

  const modifyLegendaryAction = (name, description) => {
    let newLegendaryActions = [...legendaryActions];
    newLegendaryActions[selectedLegendaryAction] = { name, description };

    setLegendaryActions(newLegendaryActions);
    handleMenuClose();
  };

  const removeLegendaryAction = () => {
    const newLegendaryActions = [...legendaryActions];
    newLegendaryActions.splice(selectedLegendaryAction, 1);

    setLegendaryActions(newLegendaryActions);
    handleMenuClose();
  }

  return (
    <>
      <Generation
        title="Añadir Acción Legendaria"
        addFunc={addLegendaryAction}
        modifyFunc={modifyLegendaryAction}
        dialogOpen={legendaryActionsDialogOpen}
        openDialog={() => setLegendaryActionsDialogOpen(false)}
        selectedItem={legendaryActions[selectedLegendaryAction]} />

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">
                Acciones legendarias
              </Typography>
            </TableCell>
            <TableCell align="right">
              <IconButton size="small" onClick={() => setLegendaryActionsDialogOpen(true)}>
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {legendaryActions.length > 0 && (
            <TableRow>
              <TableCell colSpan="2">
                <TextField
                  fullWidth
                  multiline
                  //variant="outlined"
                  placeholder="Descripción"
                  style={{ margin: ".75rem 0" }}
                  inputProps={{
                    style: { fontSize: ".8rem" },
                  }}
                  defaultValue={
                    `${(!nameIsProper && pronoun?.length > 0) ? StringUtil.generiza("El", "La", "Le", pronoun) + ' ' + name.toLowerCase() : name} puede llevar a cabo 3 acciones legendarias, escogiendo entre las opciones disponibles. Solo se puede utilizar una opción a la vez y solo al final del turno de otra criatura. ${(!nameIsProper && pronoun?.length > 0) ? StringUtil.generiza("El", "La", "Le", pronoun) + ' ' + name.toLowerCase() : name} recupera las acciones legendarias usadas al principio de su turno.`
                  } />
              </TableCell>
            </TableRow>
          )}
          {legendaryActions.map((legendaryAction, index) => (
            <TableRow>
              <TableCell>
                <Box style={{ marginLeft: "2rem" }}>
                  {legendaryAction.name}
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
        <MenuItem onClick={setLegendaryActionsDialogOpen}>Editar</MenuItem>
        <MenuItem onClick={removeLegendaryAction}>Eliminar</MenuItem>
      </Menu>
    </>
  )
}
