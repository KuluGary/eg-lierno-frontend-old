import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import useStyles from './HitPoints.styles';
import { InputAdornment, Divider } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartbeat, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';

export function HitPoints(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper} >
                <Box className={classes.header}>
                    <Box className={classes.subtitleContainer}>
                        <Typography
                            variant="subtitle2"
                            className={classes.subtitle}>
                            {'PUNTOS DE VIDA'}
                        </Typography>
                    </Box>
                    <Divider className={classes.divider} />
                </Box>
                <Box className={classes.statContainer}>
                    <Box component="span" className={classes.stat} >
                        <TextField
                            type="number"
                            value={props.hp.hp_current ?? props.hp.hp_max}
                            disabled={!props.editable}
                            className={classes.textField}
                            onChange={(event) => props.changeStats("hitPoints", { ...props.hp, hp_current: event.target.value })}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                                inputProps: { min: 0, max: props.hp.hp_max },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FontAwesomeIcon icon={faHeartbeat} size="lg" />
                                    </InputAdornment>
                                )
                            }} />
                        <Typography variant="subtitle2" className={classes.subtitle}>{"DISPONIBLES"}</Typography>
                    </Box>
                    <Box component="span" className={classes.stat}>
                        <TextField
                            type="number"
                            value={props.hp.hp_max}
                            disabled={!props.editable}
                            className={classes.textField}
                            onChange={(event) => props.changeStats("hitPoints", { ...props.hp, hp_max: event.target.value })}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FontAwesomeIcon icon={faHeart} size="lg" />
                                    </InputAdornment>
                                )
                            }} />
                        <Typography variant="subtitle2" className={classes.subtitle}>{"MÁXIMOS"}</Typography>
                    </Box>
                    <Box component="span" className={classes.stat}>
                        <TextField
                            value={props.hp.hp_temp ? props.hp.hp_temp : 0}
                            disabled={!props.editable}
                            onChange={(event) => props.changeStats("hitPoints", { ...props.hp, hp_temp: event.target.value })}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FontAwesomeIcon icon={faHandHoldingHeart} size="lg" />
                                    </InputAdornment>
                                )
                            }} />
                        <Typography variant="subtitle2" className={classes.subtitle}>{'TEMPORALES'}</Typography>
                    </Box>
                </Box>
            </Paper>
            {/* <Paper variant="outlined" className={classes.paper}>
                <Box className={classes.header}>
                    <Box className={classes.subtitleContainer}>
                        <Typography
                            variant="subtitle2"
                            className={classes.subtitle}>
                            {'PUNTOS DE VIDA'}
                        </Typography>
                    </Box>
                    <Divider className={classes.divider} />
                </Box>
                <Box className={classes.statContainer}>
                    <Box component="span" className={classes.stat}>
                        <TextField
                            type="number"
                            value={props.hp.hp_max}
                            disabled={!props.editable}
                            className={classes.textField}
                            onChange={(event) => props.changeStats("hitPoints", { ...props.hp, hp_max: event.target.value })}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FontAwesomeIcon icon={faHeart} size="lg" />
                                    </InputAdornment>
                                )
                            }}></TextField>
                        <Typography variant="subtitle2" className={classes.subtitle}>{'MÁXIMOS'}</Typography>
                    </Box>
                    <Box component="span" className={classes.stat}>
                        <TextField
                            value={props.hp.hp_current ? props.hp.hp_current : props.hp.hp_max}
                            disabled={!props.editable}
                            onChange={(event) => props.changeStats("hitPoints", { ...props.hp, hp_current: event.target.value })}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FontAwesomeIcon icon={faHeartbeat} size="lg" />
                                    </InputAdornment>
                                )
                            }}></TextField>
                        <Typography variant="subtitle2" className={classes.subtitle}>{'ACTUALES'}</Typography>
                    </Box>
                    <Box component="span" className={classes.stat}>
                        <TextField
                            value={props.hp.hp_temp ? props.hp.hp_temp : 0}
                            disabled={!props.editable}
                            onChange={(event) => props.changeStats("hitPoints", { ...props.hp, hp_temp: event.target.value })}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FontAwesomeIcon icon={faHandHoldingHeart} size="lg" />
                                    </InputAdornment>
                                )
                            }}></TextField>
                        <Typography variant="subtitle2" className={classes.subtitle}>{'TEMPORALES'}</Typography>
                    </Box>
                </Box>
            </Paper> */}
        </div >
    );
}