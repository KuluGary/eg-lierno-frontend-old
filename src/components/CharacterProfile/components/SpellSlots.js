import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    root: {
        margin: "0 .1rem .2rem .1rem",
        width: "100%"
    },
    paper: {
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: "stretch"    ,
        height: "100%"
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
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },
    }
});

export default function SpellSlots(props) {
    const classes = useStyles();
    const fullcaster = {
        "1": {
            "spellSlots": [2]
        },
        "2": {
            "spellSlots": [3]
        },
        "3": {
            "spellSlots": [4, 2]
        },
        "4": {
            "spellSlots": [4, 3]
        },
        "5": {
            "spellSlots": [4, 3, 2]
        },
        "6": {
            "spellSlots": [4, 3, 3]
        },
        "7": {
            "spellSlots": [4, 3, 3, 1]
        },
        "8": {
            "spellSlots": [4, 3, 3, 2]
        },
        "9": {
            "spellSlots": [4, 3, 3, 3, 1]
        },
        "10": {
            "spellSlots": [4, 3, 3, 3, 2]
        },
        "11": {
            "spellSlots": [4, 3, 3, 3, 2, 1]
        },
        "12": {
            "spellSlots": [4, 3, 3, 3, 2, 1]
        },
        "13": {
            "spellSlots": [4, 3, 3, 3, 2, 1, 1]
        },
        "14": {
            "spellSlots": [4, 3, 3, 3, 2, 1, 1]
        },
        "15": {
            "spellSlots": [4, 3, 3, 3, 2, 1, 1, 1]
        },
        "16": {
            "spellSlots": [4, 3, 3, 3, 2, 1, 1, 1]
        },
        "17": {
            "spellSlots": [4, 3, 3, 3, 2, 1, 1, 1, 1]
        },
        "18": {
            "spellSlots": [4, 3, 3, 3, 2, 1, 1, 1, 1]
        },
        "19": {
            "spellSlots": [4, 3, 3, 3, 2, 1, 1, 1, 1]
        },
        "20": {
            "spellSlots": [4, 3, 3, 3, 2, 1, 1, 1, 1]
        }
    }
    const [maxSpellSlots, setMaxSpellSlots] = useState(0)

    console.log(props)
    useEffect(() => {
        let classLevel = 0;
        const casterType = {
            fullcaster: ["Druida", "Bardo", "Clérigo", "Mago", "Hechicero", "Brujo"],
            halfcaster: ["Paladín", "Explorador"]
        }
        const spellLevel = props.spellLevel - 1;

        if (spellLevel >= 0) {
            props.classes.forEach(charClass => {
                if (casterType.fullcaster.includes(charClass.className)) {
                    classLevel += charClass.classLevel;
                } else if (casterType.halfcaster.includes(charClass.className)) {
                    classLevel += Math.floor(charClass.classLevel / 2);
                } else {
                    classLevel += Math.floor(charClass.classLevel / 3)
                }
            })
            setMaxSpellSlots(fullcaster[classLevel].spellSlots[spellLevel])
        }
    }, [props.classes, props.spellLevel])

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Box component="span" className={classes.stat}>
                    {props.spellLevel > 0 ?
                        <Box style={{ display: "flex", alignItems: "center" }}>
                            <TextField
                                type="number"
                                className={classes.textField}
                                disabled={!props.editable}
                                defaultValue={0}
                                value={props.spellSlots && props.spellSlots[props.spellLevel]}
                                onChange={(event) => props.changeStats("spellSlots", { ...props.spellSlots, [props.spellLevel]: event.target.value })}
                                InputProps={{
                                    classes: {
                                        input: classes.textField,
                                    }
                                }}
                            />
                            <Typography variant="h6" style={{ margin: "0 .5rem", opacity: .5 }}>{'/'}</Typography>
                            <TextField
                                type="number"
                                className={classes.textField}
                                disabled={false}
                                value={maxSpellSlots}
                                InputProps={{
                                    classes: {
                                        input: classes.textField,
                                    }
                                }}
                            />
                        </Box>
                        : <Typography variant="h6">
                            {'N/A'}
                        </Typography>
                    }                    
                    <Typography variant="subtitle2" style={{ marginTop: ".5rem", fontSize: 8, textAlign: "center" }}>{'HUECOS DE HECHIZO'}</Typography>
                </Box>
            </Paper>
        </div>
    );
}