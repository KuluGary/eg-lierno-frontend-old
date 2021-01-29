import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
    root: {
        // height: "100%",
        width: "95%",
        height: "100%"
        // margin: ".1rem",
        // marginBottom: ".5rem",
        // margin: "0 .1rem .2rem .1rem",
    },
    paper: {
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        height: "100%",
        width: "100%"
    },
    stat: {
        // margin: "0 1.5rem",
        textAlign: "center",
        width: "100%",
        // position: "relative"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    textField: {
        fontSize: 11,
        textAlign: 'center',
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },

        "& input[type=number]": {
            "-moz-appearance": "textfield"
        }
    },
    resize: {
        fontSize: 11
    }
});


export default function OtherResources(props) {
    const { otherResource, changeStats } = props;
    const classes = useStyles();
    const [resources, setResources] = useState([])
    const [interacted, setInteracted] = useState(false)

    useEffect(() => {
        if (!Object.is(otherResource, resources) && interacted) {
            changeStats("otherResource", resources)
        }
    }, [resources, otherResource, changeStats, interacted])

    useEffect(() => {
        setResources(otherResource)
    }, [])

    const changeName = (event, index) => {
        let newItems = [...resources];

        newItems[index]["name"] = event.target.value;

        setResources(newItems);
        setInteracted(true);
    }

    const changeValue = (event, index, type) => {
        let newItems = [...resources];

        newItems[index][type] = event.target.value;

        setResources(newItems);
        setInteracted(true);
    }

    const removeItem = (index) => {
        let newItems = [...resources];

        newItems.splice(index, 1);

        setResources(newItems);
        setInteracted(true);
    }

    const addResource = () => {
        setResources([...resources, {
            name: null,
            min: 0,
            max: 0
        }])
        setInteracted(true)
    }

    return (
        <div className={classes.root} style={{ width: "100%" }}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box/>
                        <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'OTROS RECURSOS'}</Typography>
                        {props.editable ?
                            <IconButton size="small" onClick={addResource} style={{}}>
                                <AddIcon />
                            </IconButton> : <Box/>
                        }
                    </Box>
                    <Divider style={{ margin: ".3rem 0" }} />
                    <Box style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", minHeight: "75%" }}>
                        {resources?.map((resource, index) => (
                            <Box>
                                <Box style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                                     <Box style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", margin: ".5rem", width: "100%" }}>
                                        <Box style={{ width: "50%" }}>
                                            <TextField
                                                type="number"
                                                disabled={!props.editable}
                                                className={classes.textField}
                                                style={{ width: "40%", }}
                                                value={resource.min}
                                                InputProps={{
                                                    classes: {
                                                        input: classes.textField,
                                                    },
                                                    inputProps: { min: 0 }
                                                }}
                                                onChange={(event) => changeValue(event, index, "min")} />
                                            {'/'}
                                            <TextField
                                                type="number"
                                                disabled={!props.editable}
                                                className={classes.textField}
                                                style={{ width: "40%" }}
                                                value={resource.max}
                                                InputProps={{
                                                    classes: {
                                                        input: classes.textField,
                                                    },
                                                    inputProps: { min: 0 }
                                                }}
                                                onChange={(event) => changeValue(event, index, "max")} />
                                        </Box>
                                        <TextField
                                            fullWidth
                                            value={resource.name}
                                            disabled={!props.editable}
                                            placeholder={'Recurso'}
                                            InputProps={{
                                                classes: {
                                                    input: classes.resize,
                                                }
                                            }}
                                            onChange={(event) => changeName(event, index)} />
                                    </Box>
                                    {props.editable &&
                                        <IconButton disabled={!props.editable} size="small" onClick={() => removeItem(index)}>
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    }
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Divider style={{ margin: ".3rem 0" }} />
                </Box>
            </Paper>
        </div>
    );
}