import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import HTMLEditor from "components/HTMLEditor/HTMLEditor";
import useStyles from "./AbilityGeneration.styles";
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

export function AbilityGeneration(props) {
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [allowUsage, setAllowUsage] = useState(false);
    const [additionalAbilitiesName, setAdditionalAbilitiesName] = useState("");
    const [additionalAbilitiesDescription, setAdditionalAbilitiesDescription] = useState("");
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
        setAdditionalAbilitiesName();
        setAdditionalAbilitiesDescription();
        setUsageNum(1);
        setUsageType("long_rest");
    };

    const generateAdditionalAbilities = () => {
        const additionalAbility = {
            name: additionalAbilitiesName,
            description: additionalAbilitiesDescription,
        };

        if (allowUsage && usageNum && usageType) {
            additionalAbility["usage_num"] = {
                max: usageNum,
                current: 0,
            };
            additionalAbility["usage_type"] = usageType;
        }

        const newAdditionalAbilities = [...props.additionalAbilities];
        if (!editMode) {
            newAdditionalAbilities.push(additionalAbility);
            props.addItem("additionalAbilities", newAdditionalAbilities);
        } else {
            props.modifyItem(newAdditionalAbilities, editModeIndex, additionalAbility, "additionalAbilities");
        }

        setDialogOpen(!dialogOpen);
        resetState();
    };

    const editFunc = (item, index) => {
        setAdditionalAbilitiesName(item.name);
        setAdditionalAbilitiesDescription(item.description);

        if (item["usage_num"] && item["usage_type"]) {
            setAllowUsage(true);
            setUsageNum(item["usage_num"]["max"]);
            setUsageType(item["usage_type"]);
        }

        setEditMode(true);
        setEditModeIndex(index);
        setDialogOpen(!dialogOpen);
    };

    const dialogue = () => {
        return (
            <Dialog maxWidth={"lg"} fullWidth open={dialogOpen} style={{ padding: 10, height: "100%" }}>
                <DialogTitle>Genera una habilidad o rasgo</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item sm={12}>
                            <TextField
                                required
                                fullWidth
                                onChange={(e) => setAdditionalAbilitiesName(e.target.value)}
                                value={additionalAbilitiesName}
                                label={"Nombre"}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <HTMLEditor
                                setState={setAdditionalAbilitiesDescription}
                                value={additionalAbilitiesDescription}
                            />
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
                    <Button color="default" onClick={generateAdditionalAbilities} autoFocus>
                        Generar
                    </Button>
                </DialogActions>
            </Dialog>
        );
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

        const newAdditionalAbilities = moveElement(props.additionalAbilities, source.index, destination.index);

        props.addItem(source.droppableId, newAdditionalAbilities);
    };

    return (
        <>
            {dialogue()}
            <Paper variant="outlined" className={classes.paper}>
                <Box style={{ position: "relative" }}>
                    <Box className={classes.subtitleContainer}>
                        <Box />
                        <Typography variant="subtitle2" className={classes.subtitle}>
                            {"HABILIDADES Y RASGOS"}
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
                            <Droppable droppableId={"additionalAbilities"}>
                                {(provided) => (
                                    <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                                        {props.additionalAbilities.map((additionalAbilities, index) => (
                                            <DraggableRow
                                                key={index}
                                                item={additionalAbilities}
                                                index={index}
                                                array={props.additionalAbilities}
                                                type={"additionalAbilities"}
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
