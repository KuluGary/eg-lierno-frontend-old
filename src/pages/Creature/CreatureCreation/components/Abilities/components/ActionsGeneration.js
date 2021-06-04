import React from 'react';
import GenericGeneration from './GenericGeneration';
import AttackGeneration from './AttackGeneration';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography
} from '@material-ui/core';

import {
  MoreHoriz as MoreHorizIcon,
  Add as AddIcon
} from '@material-ui/icons';

export default function Actions({
  actions = [],
  setActions,
  proficiencyBonus,
  abilityScoreModifiers
}) {
  const [selectedAction, setSelectedAction] = React.useState(null);
  const [actionMenu, setActionMenu] = React.useState(null);
  const [generationMenu, setGenerationMenu] = React.useState(null);
  const [actionDialogOpen, setActionDialogOpen] = React.useState(false)
  const [attackDialogOpen, setAttackDialogOpen] = React.useState(false)
  const openActionMenu = Boolean(actionMenu);
  const openGenerationMenu = Boolean(generationMenu);

  React.useEffect(() => {
    setGenerationMenu(null)
    setActionMenu(null)
  }, [actionDialogOpen, attackDialogOpen])

  const handleActionMenu = (event, index) => {
    setSelectedAction(index);
    setActionMenu(event.currentTarget)
  };

  const handleActionMenuClose = () => {
    setSelectedAction(null);
    setActionMenu(null);
  };

  const handleGenerationMenu = (event) => setGenerationMenu(event.currentTarget)

  const handleGenerationMenuClose = () => setGenerationMenu(null)

  const addAction = (name, description) => setActions([...actions, { name, description }]);

  const modifyActions = (name, description) => {
    let newActions = [...actions];
    newActions[selectedAction] = { name, description };

    setActions(newActions);
    handleActionMenuClose();
  };

  const removeAction = () => {
    const newActions = [...actions];
    newActions.splice(selectedAction, 1);

    setActions(newActions);
    handleActionMenuClose();
  }

  return (
    <>
      <GenericGeneration
        title="Añadir Acción"
        addFunc={addAction}
        modifyFunc={modifyActions}
        dialogOpen={actionDialogOpen}
        openDialog={() => setActionDialogOpen(false)}
        selectedItem={actions[selectedAction]} />

      <AttackGeneration
        addFunc={addAction}
        dialogOpen={attackDialogOpen}
        openDialog={() => setAttackDialogOpen(false)}
        abilityScoreModifiers={abilityScoreModifiers}
        proficiencyBonus={proficiencyBonus} />

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">
                Acciones
              </Typography>
            </TableCell>
            <TableCell align="right">
              <IconButton size="small" onClick={handleGenerationMenu}>
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {actions.map((action, index) => (
            <TableRow>
              <TableCell>
                <Box style={{ marginLeft: "2rem" }}>
                  {action.name}
                </Box>
              </TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={(e) => handleActionMenu(e, index)}>
                  <MoreHorizIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Menu
        open={openGenerationMenu}
        keepMounted
        id="menu-appbar"
        onClose={handleGenerationMenuClose}
        anchorEl={generationMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MenuItem onClick={setActionDialogOpen}>Acción</MenuItem>
        <MenuItem onClick={setAttackDialogOpen}>Ataque</MenuItem>
      </Menu>

      <Menu
        open={openActionMenu}
        keepMounted
        id="menu-appbar"
        onClose={handleActionMenuClose}
        anchorEl={actionMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MenuItem onClick={setActionDialogOpen}>Editar</MenuItem>
        <MenuItem onClick={removeAction}>Eliminar</MenuItem>
      </Menu>
    </>
  )
}
