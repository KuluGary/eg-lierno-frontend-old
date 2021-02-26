import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Api from 'helpers/api';

const useStyles = makeStyles({
    root: {
        // height: "100%"
        margin: "0 .1rem .2rem .1rem",
    },
    paper: {
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: "stretch"    ,
    },
    stat: {
        margin: "0 1.5rem",
        textAlign: "center"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    },
    resize: {
        fontSize: 8,
        textAlign: 'center'
    },
    textField: {
        textAlign: 'center',
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },

        "& input[type=number]": {
            "-moz-appearance": "textfield"
        }
    }
});

export default function HitDice(props) {
    const classes = useStyles();
    const { strength, maxSlotModifier, inventory, race } = props;
    const [currentSlots, setCurrentSlots] = useState(0);
    const [maxSlots, setMaxSlots] = useState(1);
    const [size, setSize] = useState();

    useEffect(() => {
        Api.fetchInternal('/race/' + race)
            .then(res => setSize("Mediano"))
    }, [race])

    useEffect(() => {
        const strengthModifier = Math.floor((strength - 10) / 2);

        switch (size) {
            case 'tiny':
                setMaxSlots(6 + strengthModifier + maxSlotModifier);
                break;
            case 'small':
                setMaxSlots(14 + strengthModifier + maxSlotModifier);
                break;
            case 'medium':
                setMaxSlots(18 + strengthModifier + maxSlotModifier);
                break;
            case 'large':
                setMaxSlots(22 + ((strengthModifier + maxSlotModifier) * 2))
                break;
            case 'huge':
                setMaxSlots(30 + ((strengthModifier + maxSlotModifier) * 4))
                break;
            default:
                setMaxSlots(46 + (strengthModifier * 8))
                break;
        }
    }, [size, maxSlotModifier, strength])

    useEffect(() => {
        if (inventory && inventory.current > currentSlots) {
            setCurrentSlots(inventory.current);
        } else {
            setCurrentSlots(currentSlots);
        }
    }, [inventory, currentSlots])

    return (
        <div className={classes.root}>
            <Paper variant="outlined" style={{
                width: "100%", padding: "1rem",
                margin: "0 .1rem .2rem 0"
            }}>
                <Box style={{ textAlign: "center" }}>
                    <Typography variant="subtitle2" style={{ fontSize: '11px' }}>{'HUECOS DE INVENTARIO'}</Typography>
                </Box>
                <Box style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>
                    <Box component="span" className={classes.stat} >
                        <TextField
                            type="number"
                            variant="outlined"
                            value={(props.inventory && props.inventory.current) || props.currentSlots}
                            defaultValue={props.currentSlots || 0}
                            onChange={(e) => props.changeStats("inventory", { ...props.inventory, current: e.target.value })}
                            disabled={!props.editable}
                            className={classes.textField}
                            InputProps={{
                                classes: {
                                    input: classes.textField,
                                },
                                inputProps: { min: props.currentSlots }
                            }} />
                        <Typography variant="subtitle2" style={{ fontSize: '8px', opacity: .5 }}>{'ACTUALES'}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" style={{ opacity: .5 }}>{'/'}</Typography>
                    </Box>
                    <Box component="span" className={classes.stat}>
                    <TextField
                            type="number"
                            variant="outlined"
                            value={maxSlots}
                            defaultValue={0}
                            disabled={true}
                            className={classes.textField}
                            InputProps={{
                                classes: {
                                    input: classes.textField,
                                },
                                inputProps: { min: 0 }
                            }} />
                        <Typography variant="subtitle2" style={{ fontSize: '8px', opacity: .5 }}>{'MÁXIMOS'}</Typography>
                    </Box>
                </Box>
            </Paper>
            <Box>
                {currentSlots <= maxSlots ?
                    <Box style={{ backgroundColor: "olive", textAlign: "center", borderRadius: 20, margin: ".5rem" }}>
                        SIN TRABAS
                    </Box> :
                    <Box style={{ backgroundColor: "orange", textAlign: "center", borderRadius: 20, margin: ".5rem" }}>
                        TRABADO
                </Box>
                }
            </Box>
        </div>
    );
}