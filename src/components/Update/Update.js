import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';


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
                {!props.downloaded ?
                    <DialogContentText id="alert-dialog-description">
                        <Box component="div">
                            <CircularProgress style={{
                                display: "block",
                                margin: "0 auto",
                                marginBottom: "1rem"
                            }} />
                        </Box>
                        <Box component="p">Lierno App está descargando una nueva versión. Por favor espera unos segundos y podrá instalarla.</Box>
                        <Box component="p">{props.status && props.status}</Box>
                    </DialogContentText>
                    :
                    <DialogContentText id="alert-dialog-description">
                        La actualización se ha descargado, y se instalará una vez se reinicie la aplicación. ¿Reiniciar ahora?
                </DialogContentText>}
            </DialogContent>
            <DialogActions>
                {props.downloaded &&
                    <>
                        <Button color="primary" onClick={props.closeNotification}>
                            Cerrar
                        </Button>
                        <Button color="primary" onClick={props.restartApp} autoFocus>
                            Reiniciar
                        </Button>
                    </>
                }
            </DialogActions>
        </Dialog>
    );
}