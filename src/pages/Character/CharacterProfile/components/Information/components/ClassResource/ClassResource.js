import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { InputAdornment, Divider } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";
import useStyles from "./ClassResource.styles";

export function ClassResource(props) {
    const classes = useStyles();
    const resource = props.classResource || {};

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper} >
                <Box className={classes.header}>
                    <Box className={classes.subtitleContainer}>
                        <TextField
                            defaultValue="RECURSO DE CLASE"
                            disabled={!props.editable}
                            value={resource.label}
                            onChange={(event) => props.changeStats("classResource", { ...props.classResource, label: event.target.value })}
                            InputProps={{
                                classes: {
                                    input: classes.subtitle,
                                }
                            }} />
                    </Box>
                    <Divider className={classes.divider} />
                </Box>
                <Box className={classes.statContainer}>
                    <Box component="span" className={classes.stat} >
                        <TextField
                            type="number"
                            value={resource.current}
                            disabled={!props.editable}
                            className={classes.textField}
                            onChange={(event) => props.changeStats("classResource", { ...props.classResource, current: event.target.value })}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                                inputProps: { min: 0 },
                                
                            }} />
                        <Typography variant="subtitle2" className={classes.subtitle}>{"DISPONIBLES"}</Typography>
                    </Box>
                    <Box component="span" className={classes.stat}>
                        <TextField
                            type="number"
                            disabled={!props.editable}
                            value={resource.max}
                            className={classes.textField}
                            onChange={(event) => props.changeStats("classResource", { ...props.classResource, max: event.target.value })}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                                inputProps: { min: 0 }
                            }} />
                        <Typography variant="subtitle2" className={classes.subtitle}>{"MÁXIMOS"}</Typography>
                    </Box>
                </Box>
            </Paper>
        </div>
        // <div className={classes.root}>
        //     <Paper variant="outlined" className={classes.paper}>
        //         <Box component="span" className={classes.stat}>
        //             <Box style={{ display: 'flex' }}>
        //                 <TextField
        //                     type="number"
        //                     disabled={!props.editable}
        //                     value={resource.current}
        //                     className={classes.textField}
        //                     InputProps={{
        //                         classes: {
        //                             input: classes.textField,
        //                         },
        //                         inputProps: { min: 0 }
        //                     }}
        //                     onChange={(event) => props.changeStats("classResource", { ...props.classResource, current: event.target.value })} />
        //                 <Typography variant="h6" style={{ margin: "0 .5rem", opacity: .5 }}>{'/'}</Typography>
        //                 <TextField
        //                     type="number"
        //                     disabled={!props.editable}
        //                     value={resource.max}
        //                     className={classes.textField}
        //                     InputProps={{
        //                         classes: {
        //                             input: classes.textField,
        //                         },
        //                         inputProps: { min: 0 }
        //                     }}
        //                     onChange={(event) => props.changeStats("classResource", { ...props.classResource, max: event.target.value })} />
        //             </Box>
        //             <TextField
        //                 defaultValue="RECURSO DE CLASE"
        //                 disabled={!props.editable}
        //                 value={resource.label}
        //                 fullWidth
        //                 onChange={(event) => props.changeStats("classResource", { ...props.classResource, label: event.target.value })}
        //                 InputProps={{
        //                     classes: {
        //                         input: classes.resize,
        //                     }
        //                 }} />
        //         </Box>
        //     </Paper>
        // </div>
    );
}