import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
    root: {
        width: "100%",
        paddingLeft: "4px"
    },
    paper: {
        padding: "1rem",
        height: "100%",
        margin: ".1rem 0"
    },
    action: {
        margin: "1rem 0",
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
    fullWidthDivier: {
        margin: ".5rem 0"
    },
    image: {
        maxHeight: "75vh",
        float: "right",
        display: "block",
        margin: "1rem",
        // padding: ".5rem 1rem .5rem .5rem",
        borderRadius: 20
    },
    resize: {
        fontSize: 11
    },
    title: {
        fontSize: 14
    },
    numberInput: {
        textAlign: 'center',
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },

        "& input[type=number]": {
            "-moz-appearance": "textfield"
        }
    }
});

export default function AdditionalAbilities(props) {
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [allowUsage, setAllowUsage] = useState(false);
    const [additionalAbilitiesName, setAdditionalAbilitiesName] = useState();
    const [additionalAbilitiesDescription, setAdditionalAbilitiesDescription] = useState();
    const [usageNum, setUsageNum] = useState(1);
    const [editMode, setEditMode] = useState(false);
    const [editModeIndex, setEditModeIndex] = useState(0);
    const [usageType, setUsageType] = useState('long_rest');

    const openDialog = () => {
        setDialogOpen(!dialogOpen);
    }

    const resetState = () => {
        setAllowUsage(false);
        setAdditionalAbilitiesName();
        setAdditionalAbilitiesDescription();
        setUsageNum(1);
        setUsageType('long_rest');
    }

    const generateAdditionalAbilities = () => {
        const additionalAbility = {
            name: additionalAbilitiesName,            
            description: additionalAbilitiesDescription
        }

        if (allowUsage && (usageNum && usageType)) {
            additionalAbility["usage_num"] = {
                max: usageNum,
                current: 0
            };
            additionalAbility["usage_type"] = usageType;
        }

        const newAdditionalAbilities = [...props.additionalAbilities]
        if (!editMode) {
            newAdditionalAbilities.push(additionalAbility);
            props.addItem("additionalAbilities", newAdditionalAbilities);
        } else {
            // newAdditionalAbilities[editModeIndex] = newAdditionalAbilities;
            props.modifyItem(newAdditionalAbilities, editModeIndex, additionalAbility, "additionalAbilities");
        }
        
        setDialogOpen(!dialogOpen)
        resetState();
    }

    const editFunc = (item, index) => {
        setAdditionalAbilitiesName(item.name);
        setAdditionalAbilitiesDescription(item.description)

        if (item["usage_num"] && item["usage_type"]) {
            setAllowUsage(true);
            setUsageNum(item["usage_num"]["max"]);
            setUsageType(item["usage_type"]);
        }

        setEditMode(true);
        setEditModeIndex(index)
        setDialogOpen(!dialogOpen)
    }

    const dialogue = () => {
        return (
            <Dialog open={dialogOpen} style={{ padding: 10 }}>
                <DialogTitle>Genera una habilidad adicional</DialogTitle>
                <DialogContent >
                    <Grid container spacing={2}>
                        <Grid item sm={12}>
                            <TextField
                                required
                                fullWidth
                                onChange={(e) => setAdditionalAbilitiesName(e.target.value)}
                                value={additionalAbilitiesName}
                                label={'Nombre'}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                required
                                fullWidth
                                onChange={(e) => setAdditionalAbilitiesDescription(e.target.value)}
                                value={additionalAbilitiesDescription}
                                label={'Descripción'}
                                multiline
                            />
                        </Grid>
                        <Grid item sm={12}>
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
                        {allowUsage &&
                            <Grid container item sm={12}>
                                <Grid item sm={3}>
                                    <TextField
                                        className={classes.numberInput}
                                        fullWidth
                                        label={'# de veces'}
                                        type="number"
                                        onChange={(e) => setUsageNum(e.target.value)}
                                        InputProps={{
                                            inputProps: { min: 0 }
                                        }}
                                        value={usageNum}
                                        defaultValue={1}
                                        required />
                                </Grid>
                                <Grid item sm={9}>
                                    <FormControl required>
                                        <InputLabel id="demo-simple-select-label">Tipo de descanso</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={'long_rest'}
                                            fullWidth
                                            value={usageType}
                                            onChange={(e) => setUsageType(e.target.value)}
                                        >
                                            <MenuItem value={'long_rest'}>{'veces por descanso largo'}</MenuItem>
                                            <MenuItem value={'short_rest'}>{'veces por descanso corto'}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={openDialog} color="default">
                        Cerrar
                     </Button>
                    <Button color="default"
                        onClick={generateAdditionalAbilities}
                        autoFocus>
                        Generar
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <>
            {dialogue()}
            <Paper variant="outlined" className={classes.paper}>
                <Box style={{ position: "relative" }}>
                    <Box>
                        {props.additionalAbilities.map((additionalAbilities, index) => props.generateRow(additionalAbilities, index, props.additionalAbilities, "additionalAbilities", editFunc))}
                    </Box>
                    <Typography style={{ fontSize: 11, textAlign: "center" }}>HABILIDADES ADICIONALES</Typography>
                    <Box style={{ position: "absolute", bottom: 3, right: 20 }}>
                        <Button variant="outlined"
                            disabled={!props.editable}
                            onClick={openDialog}
                        >
                            <Typography variant="subtitle2" style={{ fontSize: "8px", textAlign: "left" }} >
                                {'+ Añadir'}
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </>
    )
}
