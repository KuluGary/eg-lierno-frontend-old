import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import HTMLEditor from "components/HTMLEditor/HTMLEditor";
import useStyles from "./ReactionGeneration.styles";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
    Paper,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField,
    Box,
    MenuItem,
    Select,
    InputLabel,
    FormControlLabel,
    Checkbox,
    FormControl,
    Table,
    TableBody,
    Divider,
    IconButton,
} from "@material-ui/core";

export function ReactionGeneration(props) {
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [allowUsage, setAllowUsage] = useState(false);
    const [reactionName, setReactionName] = useState();
    const [reactionDescription, setReactionDescription] = useState();
    const [usageNum, setUsageNum] = useState(1);
    const [editMode, setEditMode] = useState(false);
    const [editModeIndex, setEditModeIndex] = useState(0);
    const [usageType, setUsageType] = useState("long_rest");
    const { DraggableRow } = props;

    const openDialog = () => {
        setDialogOpen(!dialogOpen);
    };

    const resetState = () => {
        setAllowUsage(false);
        setReactionName();
        setReactionDescription();
        setUsageNum(1);
        setUsageType("long_rest");
    };

    const generateReaction = () => {
        const reaction = {
            name: reactionName,
            description: reactionDescription,
        };

        if (allowUsage && usageNum && usageType) {
            reaction["usage_num"] = {
                max: usageNum,
                current: 0,
            };
            reaction["usage_type"] = usageType;
        }

        const newReactions = [...props.reactions];
        if (!editMode) {
            newReactions.push(reaction);
            props.addItem("reactions", newReactions);
        } else {
            props.modifyItem(newReactions, editModeIndex, reaction, "reactions");
        }

        setDialogOpen(!dialogOpen);
        resetState();
    };

    const editFunc = (item, index) => {
        setReactionName(item.name);
        setReactionDescription(item.description);

        if (item["usage_num"] && item["usage_type"]) {
            setAllowUsage(true);
            setUsageNum(item["usage_num"]["max"]);
            setUsageType(item["usage_type"]);
        }

        setEditMode(true);
        setEditModeIndex(index);
        setDialogOpen(!dialogOpen);
    };

    const onDragEnd = (result) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const moveElement = (array, from, to) => {
            const copy = [...array];
            const valueToMove = copy.splice(from, 1)[0];
            copy.splice(to, 0, valueToMove);
            return copy;
        };

        const newReactions = moveElement(props.reactions, source.index, destination.index);

        console.log(props.reactions, newReactions)

        props.addItem(source.droppableId, newReactions);
    };

    return (
        <>
            <Dialog maxWidth={"lg"} fullWidth open={dialogOpen} style={{ padding: 10, height: "100%" }}>
                <DialogTitle>Genera una reacción</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item sm={12}>
                            <TextField
                                required
                                fullWidth
                                onChange={(e) => setReactionName(e.target.value)}
                                value={reactionName}
                                label={"Nombre"}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <HTMLEditor setState={setReactionDescription} multiline />
                        </Grid>
                        <Grid item sm={12} style={{ margin: "1.1rem 0" }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={allowUsage}
                                        onChange={() => setAllowUsage(!allowUsage)}
                                        name="checkedB"
                                        color="default"
                                    />
                                }
                                label="¿Añadir límite de usabilidad?"
                            />
                        </Grid>
                        {allowUsage && (
                            <Grid container item sm={12}>
                                <Grid item sm={3}>
                                    <TextField
                                        className={classes.numberInput}
                                        fullWidth
                                        label={"# de veces"}
                                        type="number"
                                        onChange={(e) => setUsageNum(e.target.value)}
                                        InputProps={{
                                            inputProps: { min: 0 },
                                        }}
                                        value={usageNum}
                                        defaultValue={1}
                                        required
                                    />
                                </Grid>
                                <Grid item sm={9}>
                                    <FormControl required>
                                        <InputLabel id="demo-simple-select-label">Tipo de descanso</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={"long_rest"}
                                            fullWidth
                                            value={usageType}
                                            onChange={(e) => setUsageType(e.target.value)}
                                        >
                                            <MenuItem value={"long_rest"}>{"veces por descanso largo"}</MenuItem>
                                            <MenuItem value={"short_rest"}>{"veces por descanso corto"}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={openDialog} color="default">
                        Cerrar
                    </Button>
                    <Button color="default" onClick={generateReaction} autoFocus>
                        Generar
                    </Button>
                </DialogActions>
            </Dialog>
            <Paper variant="outlined" className={classes.paper}>
                <Box style={{ position: "relative" }}>
                    <Box className={classes.subtitleContainer}>
                        <Box />
                        <Typography variant="subtitle2" className={classes.subtitle}>
                            {"REACCIONES"}
                        </Typography>
                        {props.editable ? (
                            <IconButton size="small" onClick={openDialog}>
                                <AddIcon />
                            </IconButton>
                        ) : (
                            <Box />
                        )}
                    </Box>
                    <Divider />
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Table size="small" style={{ width: "100%" }}>
                            <Droppable droppableId={"reactions"}>
                                {(provided) => (
                                    <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                                        {props.reactions.map((reactions, index) => (
                                            <DraggableRow
                                                key={index}
                                                item={reactions}
                                                index={index}
                                                array={props.reactions}
                                                type={"reactions"}
                                                editFunc={editFunc}
                                                {...props}
                                            />
                                        ))}
                                        {provided.placeholder}
                                    </TableBody>
                                )}
                            </Droppable>
                        </Table>
                    </DragDropContext>
                </Box>
            </Paper>
        </>
    );
}
