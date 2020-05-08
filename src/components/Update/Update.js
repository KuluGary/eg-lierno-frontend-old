import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Update(props) {
    const [open, setOpen] = React.useState(false);

    return (
        <Dialog
            open={props.update}
            // onClose={!props.update}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Hay una nueva versión disponible"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {!props.download ? 
                    `Lierno App tiene una nueva versión desde la última vez que entraste. ¿Quieres descargar Lierno App versión ${props.version}?` 
                    : `La actualización se ha descargado, y se instalará una vez se reinicie la aplicación. ¿Reiniciar ahora?`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {props.download &&
                    <>
                        <Button color="primary" onClick={this.props.closeNotification}>
                            Cerrar
                        </Button>
                        <Button color="primary" onClick={this.props.restartApp} autoFocus>
                            Reiniciar
                        </Button>
                    </>
                }
            </DialogActions>
        </Dialog>
    );
}