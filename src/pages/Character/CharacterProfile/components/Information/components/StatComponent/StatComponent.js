import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputAdornment, Divider } from '@material-ui/core';
import useStyles from "./StatComponent.styles";

export function StatComponent({
    headerText,
    subtitle,
    value,
    onChange,
    editable,
    icon
}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box className={classes.header}>
                    <Box className={classes.subtitleContainer}>
                        <Typography
                            variant="subtitle2"
                            className={classes.subtitle}>
                            {headerText}
                        </Typography>
                    </Box>
                    <Divider className={classes.divider} />
                </Box>
                <Box component="span" className={classes.stat}>
                    <TextField
                        type="number"
                        value={value}
                        className={classes.textField}
                        disabled={!editable}
                        onChange={onChange}
                        InputProps={{
                            classes: {
                                input: classes.resize,
                            },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon icon={icon} size="lg" />
                                </InputAdornment>
                            )
                        }}></TextField>
                    <Typography variant="subtitle2" className={classes.subtitle}>{subtitle}</Typography>
                </Box>
            </Paper>
        </div>
    );
}