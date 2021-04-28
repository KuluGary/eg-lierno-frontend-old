import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './Wounds.styles';

export function Wounds(props) {
    const classes = useStyles();
    const [wounds, setWounds] = useState([])
    const [interacted, setInteracted] = useState(false)

    useEffect(() => {
        if (!Object.is(props.wounds, wounds) && interacted) {
            props.changeStats("wounds", wounds)
        }
    }, [wounds])

    useEffect(() => {
        setWounds(props.wounds);
    }, [])

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
        <div className={classes.root} style={{ width: "100%" }}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    <Box className={classes.subtitleContainer}>
                        <Box />
                        <Typography variant="subtitle2" className={classes.subtitle} >{'HERIDAS'}</Typography>
                        {props.editable ?
                            <IconButton size="small"onClick={addWound}>
                                <AddIcon />
                            </IconButton> : <Box />
                        }
                    </Box>
                    <Divider />
                    <Box className={classes.contentContainer}>
                        {wounds.map((wound, index) => {
                            return (
                                <Box className={classes.contentItem}>
                                    <Box className={classes.contentText}>
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
                                        <IconButton disabled={!props.editable} onClick={() => removeWound(index)}>
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    }
                                </Box>
                            )
                        })}
                    </Box>
                    <Divider />
                </Box>
            </Paper>
        </div>
    );
}