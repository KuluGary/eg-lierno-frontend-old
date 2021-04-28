import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import useStyles from './OtherItems.style';

export function OtherItems(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'OTROS OBJETOS'}</Typography>
                    <Box>
                        <TextField
                            fullWidth
                            multiline
                            disabled={!props.editable}
                            className={classes.textField}
                            variant={"outlined"}
                            onChange={(e) => props.changeStats("otheritems", e.target.value)}
                            value={props.items}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                }
                            }}
                        />
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}