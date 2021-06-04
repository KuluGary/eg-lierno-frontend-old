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

export default function RegionalAbilities({
  name,
  pronoun,
  nameIsProper,
  regionalAbilities = [],
  setRegionalAbilities
}) {
  const [selectedRegionalAbility, setSelectedRegionalAbility] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [regionalAbilitiesDialogOpen, setRegionalAbilitiesDialogOpen] = React.useState(false)
  const open = Boolean(anchorEl);

  React.useEffect(() => setAnchorEl, [regionalAbilitiesDialogOpen]);

  const handleMenu = (event, index) => {
    setSelectedRegionalAbility(index);
    setAnchorEl(event.currentTarget)
  };

  const handleMenuClose = () => {
    setSelectedRegionalAbility(null);
    setAnchorEl(null);
  };

  const addLegendaryAction = (name, description) => setRegionalAbilities([...regionalAbilities, { name, description }]);

  const modifyLegendaryAction = (name, description) => {
    let newLegendaryActions = [...regionalAbilities];
    newLegendaryActions[selectedRegionalAbility] = { name, description };

    setRegionalAbilities(newLegendaryActions);
    handleMenuClose();
  };

  const removeLegendaryAction = () => {
    const newLegendaryActions = [...regionalAbilities];
    newLegendaryActions.splice(selectedRegionalAbility, 1);

    setRegionalAbilities(newLegendaryActions);
    handleMenuClose();
  }

  return (
    <>
      <Generation
        title="Añadir Acción de Guarida"
        addFunc={addLegendaryAction}
        modifyFunc={modifyLegendaryAction}
        dialogOpen={regionalAbilitiesDialogOpen}
        openDialog={() => setRegionalAbilitiesDialogOpen(false)}
        selectedItem={regionalAbilities && regionalAbilities[selectedRegionalAbility]} />

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">
                Efectos regionales
              </Typography>
            </TableCell>
            <TableCell align="right">
              <IconButton size="small" onClick={() => setRegionalAbilitiesDialogOpen(true)}>
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {regionalAbilities?.length > 0 && (
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
                    `La región que contiene la guarida de ${(!nameIsProper && pronoun?.length > 0) ? StringUtil.generiza("El", "La", "Le", pronoun) + ' ' + name.toLowerCase() : name} es distorsionada por su presencia, lo cual crea uno o más de los siguientes efectos:`
                  } />
              </TableCell>
            </TableRow>
          )}
          {regionalAbilities?.map((legendaryAction, index) => (
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
        <MenuItem onClick={setRegionalAbilitiesDialogOpen}>Editar</MenuItem>
        <MenuItem onClick={removeLegendaryAction}>Eliminar</MenuItem>
      </Menu>
    </>
  )
}
