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
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles({
    root: {
        height: "100%",
        margin: ".1rem",
        paddingBottom: ".2rem"
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

export default function Wounds(props) {
    const classes = useStyles();
    const [wounds, setWounds] = useState([])
    const [interacted, setInteracted] = useState(false)

    useEffect(() => {
        if (!Object.is(props.wounds, wounds) && interacted) {
            props.changeStats("wounds", wounds)
        }

    }, [wounds])

    const changeDescription = (event, index) => {
        let newItems = [...wounds];

        newItems[index]["description"] = event.target.value;

        setWounds(newItems);
        setInteracted(true);
    }

    const changeStatus = (index) => {
        let newItems = [...wounds];

        newItems[index]["isUntreated"] = !newItems[index]["isUntreated"]

        setWounds(newItems);
        setInteracted(true);
    }

    const removeWound = (index) => {
        let newItems = [...wounds];

        newItems.splice(index, 1);

        setWounds(newItems);
        setInteracted(true);
    }

    const addWound = () => {
        setWounds([...wounds, {
            isUntreated: true,
            description: null
        }])
        setInteracted(true);
    }

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Typography variant="subtitle2" style={{ fontSize: "11px" }} >{'HERIDAS'}</Typography>
                    <Divider style={{ margin: "0" }} />
                    <Box style={{ display: "flex", flexDirection: "column", minHeight: "75%" }}>
                        {wounds.map((wound, index) => {
                            return (
                                <Box style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                                    <Box style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", margin: ".5rem" }}>
                                        <Radio
                                            size="small"
                                            disabled={!props.editable}
                                            style={{ padding: 0, marginRight: ".5rem" }}
                                            checked={wound.isUntreated}
                                            onClick={() => changeStatus(index)}
                                            color="default" />
                                        <TextField
                                            value={wound.description}
                                            fullWidth
                                            disabled={!props.editable}
                                            onChange={(event) => changeDescription(event, index)}
                                            placeholder="Descripción de la herida"
                                            InputProps={{
                                                classes: {
                                                    input: classes.resize,
                                                }
                                            }}></TextField>
                                    </Box>
                                    {props.editable &&
                                        <IconButton onClick={() => removeWound(index)}>
                                            <CancelIcon fontSize="small" />
                                        </IconButton>
                                    }
                                </Box>
                            )
                        })}
                    </Box>
                    <Divider style={{ margin: ".3rem 0" }} />
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
            </Paper>
        </div>
    );
}