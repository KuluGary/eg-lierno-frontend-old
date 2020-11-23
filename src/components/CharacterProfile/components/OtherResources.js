import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles({
    root: {
        height: "100%",
        // margin: "0 .1rem .2rem .1rem",
        margin: ".1rem",
        paddingBottom: ".2rem"
        // width: "100%"
    },
    paper: {
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%"
    },
    stat: {
        margin: "0 1.5rem",
        // textAlign: "center",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
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
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Typography variant="subtitle2" style={{ fontSize: "11px", textAlign: "center" }} >{'OTROS RECURSOS'}</Typography>
                    <Divider style={{ margin: ".3rem 0" }} />
                    <Box style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                        {resources.map((resource, index) => (
                            <Box>
                                <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Box style={{ display: "flex", alignItems: "center", width: "50%" }}>
                                        <Box style={{ width: "50%" }}>
                                            <TextField
                                                type="number"
                                                disabled={!props.editable}
                                                className={classes.textField}
                                                style={{ width: "40%" }}
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
                                        <IconButton onClick={() => removeItem(index)}>
                                            <CancelIcon fontSize="small" />
                                        </IconButton>
                                    }
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Divider style={{ margin: ".3rem 0" }} />
                    <Box style={{ float: "left" }}>
                        {props.editable &&
                            <Button
                                variant="outlined"
                                onClick={addResource}>
                                <Typography variant="subtitle2" style={{ fontSize: "8px", textAlign: "left" }} >
                                    {'+ Añadir'}
                                </Typography>
                            </Button>
                        }
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}