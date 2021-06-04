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

export default function LairActions({
  name,
  pronoun,
  nameIsProper,
  lairActions = [],
  setLairActions
}) {
  const [selectedLegendaryAction, setSelectedLegendaryAction] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [lairActionsDialogOpen, setLairActionsDialogOpen] = React.useState(false)
  const open = Boolean(anchorEl);

  React.useEffect(() => setAnchorEl, [lairActionsDialogOpen]);

  const handleMenu = (event, index) => {
    setSelectedLegendaryAction(index);
    setAnchorEl(event.currentTarget)
  };

  const handleMenuClose = () => {
    setSelectedLegendaryAction(null);
    setAnchorEl(null);
  };

  const addLegendaryAction = (name, description) => setLairActions([...lairActions, { name, description }]);

  const modifyLairAction = (name, description) => {
    let newLegendaryActions = [...lairActions];
    newLegendaryActions[selectedLegendaryAction] = { name, description };

    setLairActions(newLegendaryActions);
    handleMenuClose();
  };

  const removeLairAction = () => {
    const newLegendaryActions = [...lairActions];
    newLegendaryActions.splice(selectedLegendaryAction, 1);

    setLairActions(newLegendaryActions);
    handleMenuClose();
  }

  return (
    <>
      <Generation
        title="Añadir Acción de Guarida"
        addFunc={addLegendaryAction}
        modifyFunc={modifyLairAction}
        dialogOpen={lairActionsDialogOpen}
        openDialog={() => setLairActionsDialogOpen(false)}
        selectedItem={lairActions && lairActions[selectedLegendaryAction]} />

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">
                Acciones de guarida
              </Typography>
            </TableCell>
            <TableCell align="right">
              <IconButton size="small" onClick={() => setLairActionsDialogOpen(true)}>
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lairActions?.length > 0 && (
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
                    `Mientras esté en su guarida, ${(!nameIsProper && pronoun?.length > 0) ? StringUtil.generiza("El", "La", "Le", pronoun) + ' ' + name.toLowerCase() : name} puede invocar el poder de su entorno para llevar a cabo acciones de guarida. Con una resultado de iniciativa 20, ${(!nameIsProper && pronoun?.length > 0) ? StringUtil.generiza("El", "La", "Le", pronoun) + ' ' + name.toLowerCase() : name} puede usar uno de los siguientes efectos; no puede usar el mismo efecto dos veces seguidas:`
                  } />
              </TableCell>
            </TableRow>
          )}
          {lairActions?.map((legendaryAction, index) => (
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
        <MenuItem onClick={setLairActionsDialogOpen}>Editar</MenuItem>
        <MenuItem onClick={removeLairAction}>Eliminar</MenuItem>
      </Menu>
    </>
  )
}
