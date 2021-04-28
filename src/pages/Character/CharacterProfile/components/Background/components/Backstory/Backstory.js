import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import useStyles from './Backstory.styles';

export default function Backstory(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    {/* <Typography variant="subtitle2" className={classes.subtitle} >{'TRASFONDO'}</Typography> */}
                    <TextField
                        style={{ height: "100%" }}
                        fullWidth
                        multiline
                        rowsMax={1}
                        disabled={!props.editable}
                        label={'Trasfondo'}
                        onChange={(event) => props.changeFlavor("backstory", event.target.value)}
                        value={props.story?.replace(/<br \/>|<br\/>/gi, '\n')}
                        inputProps={{
                            style: { minHeight: "92.5%", fontSize: "11px" },
                        }}
                        InputProps={{
                            style: { minHeight: "100%", alignItems: "center" }
                        }}
                        variant="outlined" />
                </Box>
            </Paper>
        </div>
    );
}