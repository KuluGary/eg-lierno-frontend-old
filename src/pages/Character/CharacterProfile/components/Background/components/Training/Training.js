import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import Box from '@material-ui/core/Box';
import useStyles from './Training.styles';

export default function Training(props) {
    const classes = useStyles();
    const radios = [];

    for (let index = 0; index <= 5; index++) {
        radios.push(
            <Radio
                size="small"
                style={{ padding: 0 }}
                color="default"
                disabled={!props.editable}
            />)
    }

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Typography variant="subtitle2" style={{ fontSize: "11px", marginRight: ".5rem" }} >{'ENTRENAMIENTO'}</Typography>
                    <Box style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        {radios}
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}