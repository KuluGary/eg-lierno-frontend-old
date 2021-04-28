import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Image from 'components/Image/Image';
import ImageUploader from 'components/ImageUploader/ImageUploader';
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import useStyles from './Portrait.styles';

export default function Portrait(props) {
    const [openUploader, setOpenUploader] = useState();
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.root}>
            <ImageUploader
                open={openUploader}
                setOpen={setOpenUploader}
                setImage={(event) => props.changeFlavor("portrait", event)} />
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Image
                        usage="avatar"
                        errorStyle={{ width: "100%", height: "75%", margin: "1rem 0" }}
                        style={{ width: "100%", borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}
                        mode="modal"
                        src={props.image} />
                    <TextField
                        className={classes.input}
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            },
                            endAdornment: (
                                <IconButton onClick={() => setOpenUploader(true)}>
                                    <AddPhotoAlternateIcon />
                                </IconButton>
                            )
                        }}
                        label="Retrato"
                        fullWidth
                        value={props.image}
                        disabled={!props.editable}
                        onChange={(event) => props.changeFlavor("portrait", event.target.value)}
                        variant="outlined" />
                </Box>
            </Paper>
        </div>
    );
}