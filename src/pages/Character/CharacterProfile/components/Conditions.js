import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
    root: {
        // height: "97%",
        // margin: "0 .1rem 0 .1rem",
        margin: ".1rem",
        height: "100%",
        width: "100%"
    },
    paper: {
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        // alignItems: 'center',
        // alignSelf: "stretch"    ,
        height: "100%",
        width: "100%"
    },
    stat: {
        margin: "0 1.5rem",
        textAlign: "center",
        width: "100%"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    resize: {
        fontSize: 11
    }
});

export default function Conditions(props) {
    const classes = useStyles();
    const [condtitions, setConditions] = useState([])
    const [interacted, setInteracted] = useState(false)

    useEffect(() => {
        if (!Object.is(props.conditions, condtitions) && interacted) {
            props.changeStats("conditions", condtitions)
        }

    }, [condtitions])

    const changeDescription = (event, index) => {
        let newItems = [...condtitions];

        newItems[index]["description"] = event.target.value;

        setConditions(newItems);
        setInteracted(true);
    }

    const changeStatus = (index) => {
        let newItems = [...condtitions];

        newItems[index]["isUntreated"] = !newItems[index]["isUntreated"]

        setConditions(newItems);
        setInteracted(true);
    }

    const removeWound = (index) => {
        let newItems = [...condtitions];

        newItems.splice(index, 1);

        setConditions(newItems);
        setInteracted(true);
    }

    const addWound = () => {
        setConditions([...condtitions, {
            isUntreated: true,
            description: null
        }])
        setInteracted(true);
    }

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    {/* <Typography variant="subtitle2">{'BONO DE'}</Typography> */}
                    <Typography variant="subtitle2" style={{ fontSize: "8px" }} >{'EFECTOS Y CONDICIONES'}</Typography>
                    <Divider style={{ margin: ".3rem 0" }} />
                    <Box style={{ display: "flex", flexDirection: "column", minHeight: "90%" }}>
                        {condtitions.map((condition, index) => {
                            return (
                                <Box style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                                    <Box style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", margin: ".5rem", width: "100%" }}>
                                        <Radio
                                            size="small"
                                            disabled={!props.editable}
                                            style={{ padding: 0, marginRight: ".5rem" }}
                                            checked={condition.isUntreated}
                                            onClick={() => changeStatus(index)}
                                            color="default" />
                                        <TextField
                                            value={condition.description}
                                            fullWidth
                                            disabled={!props.editable}
                                            onChange={(event) => changeDescription(event, index)}
                                            placeholder="Descripción de la condición"
                                            InputProps={{
                                                classes: {
                                                    input: classes.resize,
                                                }
                                            }}></TextField>
                                    </Box>
                                    {props.editable &&
                                        <IconButton size="small" onClick={() => removeWound(index)}>
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    }
                                </Box>
                            )
                        })}
                    </Box>
                    <Divider style={{ margin: ".3rem 0" }} />
                    <Box style={{ float: "left" }}>
                        {/* <Typography variant="subtitle2" style={{ fontSize: "8px", textAlign: "left" }} >{'+ Añadir'}</Typography> */}
                        {props.editable &&
                            <Box style={{ float: "left" }}>
                                <Button
                                    variant="outlined"
                                    onClick={addWound}>
                                    <Typography variant="subtitle2" style={{ fontSize: "8px", textAlign: "left" }} >{'+ Añadir'}</Typography>
                                </Button>
                            </Box>
                        }
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}