import React from 'react';
import GenericGeneration from './GenericGeneration';
import SpellCastingGeneration from './SpellCastingGeneration';
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
  Box
} from '@material-ui/core';

import {
  MoreHoriz as MoreHorizIcon,
  Add as AddIcon
} from '@material-ui/icons';

export default function Abilities({
  abilities = [],
  setAbilities,
  pronoun,
  name,
  proficiencyBonus,
  abilityScoreModifiers
}) {
  const [selectedAbility, setSelectedAbility] = React.useState(null);
  const [abilityMenu, setAbilityMenu] = React.useState(null);
  const [generationMenu, setGenerationMenu] = React.useState(null);
  const [abilityDialogOpen, setAbilityDialogOpen] = React.useState(false)
  const [spellcastingDialogOpen, setSpellcastingDialogOpen] = React.useState(false)
  const openAbilityMenu = Boolean(abilityMenu);
  const openGenerationMenu = Boolean(generationMenu);

  React.useEffect(() => {
    setGenerationMenu(null)
    setAbilityMenu(null)
  }, [abilityDialogOpen, spellcastingDialogOpen])

  const handleAbilityMenu = (event, index) => {
    setSelectedAbility(index);
    setAbilityMenu(event.currentTarget)
  };

  const handleAbilityMenuClose = () => {
    setSelectedAbility(null);
    setAbilityMenu(null);
  };

  const handleGenerationMenu = (event) => setGenerationMenu(event.currentTarget)

  const handleGenerationMenuClose = () => setGenerationMenu(null)

  const addAbility = (name, description) => setAbilities([...abilities, { name, description }]);

  const modifyAbilities = (name, description) => {
    let newAbilities = [...abilities];
    newAbilities[selectedAbility] = { name, description };

    setAbilities(newAbilities);
    handleAbilityMenuClose();
  };

  const removeAbility = () => {
    const newAbilities = [...abilities];
    newAbilities.splice(selectedAbility, 1);

    setAbilities(newAbilities);
    handleAbilityMenuClose();
  }

  return (
    <>
      <GenericGeneration
        title="Añadir Habilidad"
        addFunc={addAbility}
        modifyFunc={modifyAbilities}
        dialogOpen={abilityDialogOpen}
        openDialog={() => setAbilityDialogOpen(false)}
        selectedItem={abilities[selectedAbility]} />

      <SpellCastingGeneration
        pronoun={pronoun}
        name={name}
        addFunc={addAbility}
        dialogOpen={spellcastingDialogOpen}
        proficiencyBonus={proficiencyBonus}
        abilityScoreModifiers={abilityScoreModifiers}
        openDialog={() => setSpellcastingDialogOpen(false)} />

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">
                Habilidades
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
          {abilities.map((ability, index) => (
            <TableRow>
              <TableCell>
                <Box style={{ marginLeft: "2rem" }}>
                  {ability.name}
                </Box>
              </TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={(e) => handleAbilityMenu(e, index)}>
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
        <MenuItem onClick={setAbilityDialogOpen}>Habilidad</MenuItem>
        <MenuItem onClick={setSpellcastingDialogOpen}>Lanzamiento de conjuros</MenuItem>
      </Menu>

      <Menu
        open={openAbilityMenu}
        keepMounted
        id="menu-appbar"
        onClose={handleAbilityMenuClose}
        anchorEl={abilityMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MenuItem onClick={setAbilityDialogOpen}>Editar</MenuItem>
        <MenuItem onClick={removeAbility}>Eliminar</MenuItem>
      </Menu>
    </>
  )
}
