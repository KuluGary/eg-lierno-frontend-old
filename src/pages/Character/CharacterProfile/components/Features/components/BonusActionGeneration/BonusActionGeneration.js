import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
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
import { FormControl, Table, TableBody, Divider } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import HTMLEditor from 'components/HTMLEditor/HTMLEditor';
import useStyles from './BonusActionGeneration.styles';

export function BonusActionGeneration(props) {
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [allowUsage, setAllowUsage] = useState(false);
    const [bonusActionName, setBonusActionName] = useState();
    const [bonusActionDescription, setBonusActionDescription] = useState();
    const [usageNum, setUsageNum] = useState(1);
    const [editMode, setEditMode] = useState(false);
    const [editModeIndex, setEditModeIndex] = useState(0);
    const [usageType, setUsageType] = useState('long_rest');

    const openDialog = () => {
        setDialogOpen(!dialogOpen);
    }

    const resetState = () => {
        setAllowUsage(false);
        setBonusActionName();
        setBonusActionDescription();
        setUsageNum(1);
        setUsageType('long_rest');
    }

    const generateBonusAction = () => {
        const bonusAction = {
            name: bonusActionName,
            description: bonusActionDescription
        }

        if (allowUsage && (usageNum && usageType)) {
            bonusAction["usage_num"] = {
                max: usageNum,
                current: 0
            };
            bonusAction["usage_type"] = usageType;
        }

        const newBonusActions = [...props.bonusActions]
        if (!editMode) {
            newBonusActions.push(bonusAction);
            props.addItem("bonusActions", newBonusActions)
        } else {
            props.modifyItem(newBonusActions, editModeIndex, bonusAction, "bonusActionss");
        }

        setDialogOpen(!dialogOpen)
        resetState();
    }

    const editFunc = (item, index) => {
        setBonusActionName(item.name);
        setBonusActionDescription(item.description)

        if (item["usage_num"] && item["usage_type"]) {
            setAllowUsage(true);
            setUsageNum(item["usage_num"]["max"]);
            setUsageType(item["usage_type"]);
        }

        setEditMode(true);
        setEditModeIndex(index)
        setDialogOpen(!dialogOpen)
    }

    return (
        <>
            <Dialog open={dialogOpen} style={{ padding: 10 }}>
                <DialogTitle>Genera una acción adicional</DialogTitle>
                <DialogContent >
                    <Grid container spacing={2}>
                        <Grid item sm={12}>
                            <TextField
                                required
                                fullWidth
                                onChange={(e) => setBonusActionName(e.target.value)}
                                value={bonusActionName}
                                label={'Nombre'}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <HTMLEditor
                                setState={setBonusActionDescription}
                                value={bonusActionDescription}
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
                        onClick={generateBonusAction}
                        autoFocus>
                        Generar
                    </Button>
                </DialogActions>
            </Dialog>
            <Paper variant="outlined" className={classes.paper}>
                <Box style={{ position: "relative" }}>
                    <Box className={classes.subtitleContainer}>
                        <Box />
                        <Typography variant="subtitle2" className={classes.subtitle} >{'CLASES'}</Typography>
                        {props.editable ?
                            <IconButton size="small" onClick={openDialog}>
                                <AddIcon />
                            </IconButton> : <Box />
                        }
                    </Box>
                    <Divider />
                    <Table size="small" style={{ width: "100%" }}>
                        <TableBody>
                            {props.bonusActions.map((bonusAction, index) => props.generateRow(bonusAction, index, props.bonusActions, "bonusActions", editFunc))}
                        </TableBody>
                    </Table>
                </Box>
            </Paper>
        </>
    )
}
