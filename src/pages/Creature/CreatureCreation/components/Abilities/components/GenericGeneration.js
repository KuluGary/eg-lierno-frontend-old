import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button
} from '@material-ui/core';
import HTMLEditor from 'components/HTMLEditor/HTMLEditor';

export default function Generation({
  title,
  addFunc,
  dialogOpen,
  openDialog,
  selectedItem,
  modifyFunc
}) {
  
  const [name, setName] = React.useState("");
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (selectedItem !== undefined) {
      setName(selectedItem.name);
      setValue(selectedItem.description)
    }
  }, [selectedItem])
  
  const save = () => {
    openDialog(false);
    addFunc(name, value);
  };

  const modify = () => {
    openDialog(false);
    modifyFunc(name, value);
  }

  return (
    <Dialog maxWidth={"md"} open={dialogOpen} style={{ padding: 10 }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <TextField
              required
              fullWidth
              onChange={(e) => setName(e.target.value)}
              value={name}
              label={'Nombre'}
            />
          </Grid>
          <Grid item sm={12}>
            <HTMLEditor
              value={value}
              setState={(e) => setValue(e)} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={openDialog} color="default">Cerrar</Button>
        {selectedItem ?
          <Button color="default" onClick={modify} autoFocus>Guardar</Button> :
          <Button color="default" onClick={save} autoFocus>Generar</Button>
        }
      </DialogActions>
    </Dialog>
  )
}
