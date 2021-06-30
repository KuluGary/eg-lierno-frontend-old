import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { StringUtil } from "helpers/string-util";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    title: {
        marginTop: theme.spacing(2),
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    formControl: {
        minWidth: "100%",
    },
}));

export default function Abilities(props) {
    const classes = useStyles()
    const [actions, setActions] = useState(props.creature.stats.actions || []);
    const [reactions, setReactions] = useState(props.creature.stats.reactions || []);
    const [abilities, setAbilities] = useState(props.creature.stats.additionalAbilities || []);
    const [legendaryActions, setLegendaryActions] = useState(props.creature.stats.legendaryActions || []);

    const [attackName, setAttackName] = useState('');
    const [attackRange, setAttackRange] = useState([]);
    const [attackReach, setAttackReach] = useState(5);
    const [attackShortReach, setAttackShortReach] = useState(80);
    const [attackLongReach, setAttackLongReach] = useState(320);

    const [meleeAttackType, setMeleeAttackType] = useState('Cortante');
    const [rangedAttackType, setRangedAttackType] = useState('Perforante');
    const [twoHandedAttackType, setTwoHandedAttackType] = useState('Cortante');
    const [bonusAttackType, setBonusAttackType] = useState('Fuego');

    const [meleeAttackDieNum, setMeleeAttackDieNum] = useState(1);
    const [distanceAttackDieNum, setDistanceAttackDieNum] = useState(1);
    const [twoHandedAttackDieNum, setTwoHandedAttackDieNum] = useState(1);
    const [bonusAttackDieNum, setBonusAttackDieNum] = useState(1);

    const [meleeAttackDieSize, setMeleeAttackDieSize] = useState(6);
    const [distanceAttackDieSize, setDistanceAttackDieSize] = useState(6);
    const [twoHandedAttackDieSize, setTwoHandedAttackDieSize] = useState(8);
    const [bonusAttackDieSize, setBonusAttackDieSize] = useState(4);

    const spellCastingTypeList = [
        "Innato",
        StringUtil.generiza("Bardo", "Barda", "Barde", props.pronoun),
        StringUtil.generiza("Brujo", "Bruja", "Bruje", props.pronoun),
        StringUtil.generiza("Clérigo", "Clériga", "Clérigue", props.pronoun),
        "Druida",
        // StringUtil.generiza("Explorador", "Exploradora", "Exploradore", props.pronoun),
        "Montaraz",
        StringUtil.generiza("Hechicero", "Hechicera", "Hechicere", props.pronoun),
        StringUtil.generiza("Mago", "Maga", "Mague", props.pronoun),
        StringUtil.generiza("Paladín", "Paladina", "Paladine", props.pronoun)
    ]

    const spellCastingAbilityList = [
        {
            key: 'intelligence',
            label: 'Inteligencia'
        },
        {
            key: 'wisdom',
            label: 'Sabiduría'
        },
        {
            key: 'charisma',
            label: 'Carisma'
        }
    ]

    const spellcasters = {
        "Innato": {
            "components": {
                "material": false,
                "somatic": true,
                "verbal": true
            }
        },
        [StringUtil.generiza("Bardo", "Barda", "Barde", props.pronoun)]: {
            "components": {
                "material": true,
                "somatic": true,
                "verbal": true
            },
            "ability": "charisma",
            "level": {
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
        },
        [StringUtil.generiza("Clérigo", "Clériga", "Clérigue", props.pronoun)]: {
            "components": {
                "material": true,
                "somatic": true,
                "verbal": true
            },
            "ability": "wisdom",
            "level": {
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
        },
        "Montaraze": {
            "components": {
                "material": true,
                "somatic": true,
                "verbal": true
            },
            "ability": "wisdom",
            "level": {
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
        },
        [StringUtil.generiza("Paladín", "Paladina", "Paladine", props.pronoun)]: {
            "components": {
                "material": true,
                "somatic": true,
                "verbal": true
            },
            "ability": "charisma",
            "level": {
                "1": {
                    "spellSlots": []
                },
                "2": {
                    "spellSlots": [2]
                },
                "3": {
                    "spellSlots": [3]
                },
                "4": {
                    "spellSlots": [3]
                },
                "5": {
                    "spellSlots": [4, 2]
                },
                "6": {
                    "spellSlots": [4, 2]
                },
                "7": {
                    "spellSlots": [4, 3]
                },
                "8": {
                    "spellSlots": [4, 3]
                },
                "9": {
                    "spellSlots": [4, 3, 2]
                },
                "10": {
                    "spellSlots": [4, 3, 2]
                },
                "11": {
                    "spellSlots": [4, 3, 3]
                },
                "12": {
                    "spellSlots": [4, 3, 3]
                },
                "13": {
                    "spellSlots": [4, 3, 3, 1]
                },
                "14": {
                    "spellSlots": [4, 3, 3, 1]
                },
                "15": {
                    "spellSlots": [4, 3, 3, 2]
                },
                "16": {
                    "spellSlots": [4, 3, 3, 2]
                },
                "17": {
                    "spellSlots": [4, 3, 3, 3, 1]
                },
                "18": {
                    "spellSlots": [4, 3, 3, 3, 1]
                },
                "19": {
                    "spellSlots": [4, 3, 3, 3, 2]
                },
                "20": {
                    "spellSlots": [4, 3, 3, 3, 2]
                }
            }
        },
        "Montaraz": {
            "components": {
                "material": true,
                "somatic": true,
                "verbal": true
            },
            "ability": "wisdom",
            "level": {
                "1": {
                    "spellSlots": []
                },
                "2": {
                    "spellSlots": [2]
                },
                "3": {
                    "spellSlots": [3]
                },
                "4": {
                    "spellSlots": [3]
                },
                "5": {
                    "spellSlots": [4, 2]
                },
                "6": {
                    "spellSlots": [4, 2]
                },
                "7": {
                    "spellSlots": [4, 3]
                },
                "8": {
                    "spellSlots": [4, 3]
                },
                "9": {
                    "spellSlots": [4, 3, 2]
                },
                "10": {
                    "spellSlots": [4, 3, 2]
                },
                "11": {
                    "spellSlots": [4, 3, 3]
                },
                "12": {
                    "spellSlots": [4, 3, 3]
                },
                "13": {
                    "spellSlots": [4, 3, 3, 1]
                },
                "14": {
                    "spellSlots": [4, 3, 3, 1]
                },
                "15": {
                    "spellSlots": [4, 3, 3, 2]
                },
                "16": {
                    "spellSlots": [4, 3, 3, 2]
                },
                "17": {
                    "spellSlots": [4, 3, 3, 3, 1]
                },
                "18": {
                    "spellSlots": [4, 3, 3, 3, 1]
                },
                "19": {
                    "spellSlots": [4, 3, 3, 3, 2]
                },
                "20": {
                    "spellSlots": [4, 3, 3, 3, 2]
                }
            }
        },
        [StringUtil.generiza("Hechicero", "Hechicera", "Hechicere", props.pronoun)]: {
            "components": {
                "material": true,
                "somatic": true,
                "verbal": true
            },
            "ability": "charisma",
            "level": {
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
        },
        [StringUtil.generiza("Brujo", "Bruja", "Bruje", props.pronoun)]: {
            "components": {
                "material": true,
                "somatic": true,
                "verbal": true
            },
            "ability": "charisma",
            "level": {
                "1": {
                    "spellSlots": [1]
                },
                "2": {
                    "spellSlots": [2]
                },
                "3": {
                    "spellSlots": [0, 2]
                },
                "4": {
                    "spellSlots": [0, 2]
                },
                "5": {
                    "spellSlots": [0, 0, 2]
                },
                "6": {
                    "spellSlots": [0, 0, 2]
                },
                "7": {
                    "spellSlots": [0, 0, 0, 2]
                },
                "8": {
                    "spellSlots": [0, 0, 0, 2]
                },
                "9": {
                    "spellSlots": [0, 0, 0, 0, 2]
                },
                "10": {
                    "spellSlots": [0, 0, 0, 0, 2]
                },
                "11": {
                    "spellSlots": [0, 0, 0, 0, 3]
                },
                "12": {
                    "spellSlots": [0, 0, 0, 0, 3]
                },
                "13": {
                    "spellSlots": [0, 0, 0, 0, 3]
                },
                "14": {
                    "spellSlots": [0, 0, 0, 0, 3]
                },
                "15": {
                    "spellSlots": [0, 0, 0, 0, 3]
                },
                "16": {
                    "spellSlots": [0, 0, 0, 0, 3]
                },
                "17": {
                    "spellSlots": [0, 0, 0, 0, 4]
                },
                "18": {
                    "spellSlots": [0, 0, 0, 0, 4]
                },
                "19": {
                    "spellSlots": [0, 0, 0, 0, 4]
                },
                "20": {
                    "spellSlots": [0, 0, 0, 0, 4]
                }
            }
        },
        [StringUtil.generiza("Mago", "Maga", "Mague", props.pronoun)]: {
            "components": {
                "material": true,
                "somatic": true,
                "verbal": true
            },
            "ability": "intelligence",
            "level": {
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
        }
    }

    const [spellCastingType, setSpellCastingType] = useState(spellCastingTypeList[0]);
    const [spellCastingAbility, setSpellCastingAbility] = useState(spellCastingAbilityList[0].key)
    const [spellCasterLevel, setSpellCasterLevel] = useState(1)
    const [spellComponents, setSpellComponent] = useState({
        material: false,
        somatic: true,
        verbal: true
    });
    const [spells, setSpells] = useState({
        level0: [],
        level1: [],
        level2: [],
        level3: [],
        level4: [],
        level5: [],
        level6: [],
        level7: [],
        level8: [],
        level9: [],
        atWill: [],
        perDay3: [],
        perDay2: [],
        perDay1: []
    })
    const [spellLevelArray] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    const [spellName, setSpellName] = useState({
        level0: '',
        level1: '',
        level2: '',
        level3: '',
        level4: '',
        level5: '',
        level6: '',
        level7: '',
        level8: '',
        level9: '',
        atWill: '',
        perDay3: '',
        perDay2: '',
        perDay1: ''
    });

    const [attackProperties, setAttackProperties] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [spellDialogOpen, setSpellDialogOpen] = useState(false);

    useEffect(() => {
        // initializeSpellLevelArray();
        props.addToCreatureStats(StringUtil.replaceDescriptionLineBreaks(actions), "actions");
        props.addToCreatureStats(StringUtil.replaceDescriptionLineBreaks(reactions), "reactions");
        props.addToCreatureStats(StringUtil.replaceDescriptionLineBreaks(abilities), "additionalAbilities");
        props.addToCreatureStats(StringUtil.replaceDescriptionLineBreaks(legendaryActions), "legendaryActions");
        props.addToCreatureStats(`${(!props.creature.flavor.nameIsProper && props.pronoun && props.pronoun.length > 0) ? props.pronoun + ' ' + props.creature.name.toLowerCase() : props.creature.name} puede llevar a cabo 3 acciones legendarias, escogiendo entre las opciones disponibles. Solo se puede utilizar una opción a la vez y solo al final del turno de otra criatura. ${props.creature.name} recupera las acciones legendarias usadas al principio de su turno.`, "legendaryActionsDescription")
    }, [actions, reactions, abilities, legendaryActions])

    const createDescription = () => {
        let type;
        let ability = "strength";
        //  if ((finesse || (attackReach.includes('Distancia') && !attackReach.includes('Melé'))    ))
        if (attackProperties.includes('Sutil') || (attackRange.includes('Distancia') && !attackRange.includes('Melé'))) {
            ability = "dexterity"
        }

        if (attackRange.includes('Melé') && attackRange.includes('Distancia')) {
            type = "Ataque de arma melé o distancia:";
        } else if (attackRange.includes('Melé')) {
            type = 'Ataque de arma melé:'
        } else if (attackRange.includes('Distancia')) {
            type = 'Ataque de arma distancia:'
        } else {
            type = 'Ataque de arma:'
        }

        let toHit = parseInt(props.creature.stats.abilityScoreModifiers[ability]) + parseInt(props.creature.stats.proficiencyBonus);
        let rangeStr;

        if (attackRange.includes('Melé') && attackRange.includes('Distancia')) {
            rangeStr = "alcance " + attackReach + " ft. o alcance " + attackShortReach + "/" + attackLongReach + " ft."
        } else if (attackRange.includes('Melé')) {
            rangeStr = "alcance " + attackReach + "ft.";
        } else if (attackRange.includes('Distancia')) {
            rangeStr = "alcance " + attackShortReach + "/" + attackLongReach + " ft.";
        }

        let damageMod = props.creature.stats.abilityScoreModifiers[ability];
        let meleeDamageStr;
        let rangedDamageStr;
        let twoHandedDamageStr;
        let bonusDamageStr;

        if (attackRange.includes('Melé')) {
            meleeDamageStr = createDamageStr(meleeAttackType, meleeAttackDieSize, meleeAttackDieNum, damageMod);
        }
        if (attackRange.includes('Distancia')) {
            rangedDamageStr = createDamageStr(rangedAttackType, distanceAttackDieSize, distanceAttackDieNum, damageMod)
        }
        if (attackProperties.includes('Versátil')) {
            twoHandedDamageStr = createDamageStr(twoHandedAttackType, twoHandedAttackDieSize, twoHandedAttackDieNum, damageMod)
        }
        if (attackProperties.includes('Daño extra')) {
            bonusDamageStr = createDamageStr(bonusAttackType, bonusAttackDieSize, bonusAttackDieNum, 0)
        }
        let hitStr;
        let needsCommaBeforeBonusDamage;

        if (attackRange.includes('Melé')) {
            hitStr = meleeDamageStr;
            if (attackRange.includes('Distance')) {
                hitStr = hitStr + " en melé, o " + rangedDamageStr + " a distancia";
                needsCommaBeforeBonusDamage = true;
            }
        } else if (attackRange.includes('Distancia')) {
            hitStr = rangedDamageStr;
        }

        if (attackProperties.includes('Versátil')) {
            hitStr = hitStr + " o " + twoHandedDamageStr + " si es usado con dos manos para hacer un ataque melé.";
            needsCommaBeforeBonusDamage = true;
        }

        if (attackProperties.includes('Daño extra')) {
            if (needsCommaBeforeBonusDamage) {
                hitStr = hitStr + ",";
                needsCommaBeforeBonusDamage = false;
            }
            hitStr = hitStr + " más " + bonusDamageStr;
        }

        let description = "<em>" + type + "</em>" + toHit + " al golpe, " + rangeStr
            + ", un objetivo. <em>Daño:</em> " + hitStr + ".";

        if (attackProperties && attackProperties.length > 0) {
            description = description + ' <small><em>Propiedades: ' + attackProperties + '</em></small>'
        }
        return (description);
    }

    const createDamageStr = (damageType, diceSize, numDice, modifier) => {
        let diceAvg = (diceSize / 2.0) + 0.5;
        let avgDamage = Math.floor(numDice * diceAvg) + modifier;
        let damageStr = avgDamage + "(" + numDice + "d" + diceSize;
        if (modifier !== 0) {
            damageStr = damageStr + (modifier >= 0 ? " + " : "") + modifier;
        }
        damageStr = damageStr + ") daño " + damageType.toLowerCase();
        return damageStr;
    }

    const addAction = () => {
        setActions([...actions, {
            name: "",
            description: ""
        }])
    }

    const modifyActions = (key, value, index) => {
        let newActions = [...actions];
        newActions[index][key] = value;
        setActions(newActions);
    }

    const generateAttack = () => {
        setActions([...actions, {
            name: attackName,
            description: createDescription()
        }])
        setDialogOpen(!dialogOpen);
        resetAttackGeneration();
    }

    const resetAttackGeneration = () => {
        setAttackName('');
        setAttackRange([]);
        setAttackReach(5);
        setAttackShortReach(80);
        setAttackLongReach(320);
        setMeleeAttackType('Cortante');
        setRangedAttackType('Perforante');
        setTwoHandedAttackType('Cortante');
        setBonusAttackType('Fuego');
        setMeleeAttackDieNum(1);
        setDistanceAttackDieNum(1);
        setTwoHandedAttackDieNum(1);
        setBonusAttackDieNum(1);
        setMeleeAttackDieSize(6);
        setDistanceAttackDieSize(6);
        setTwoHandedAttackDieSize(8);
        setBonusAttackDieSize(4);
        setAttackProperties([])
    }

    const addReaction = () => {
        setReactions([...reactions, {
            name: "",
            description: ""
        }])
    }

    const modifyReactions = (key, value, index) => {
        let newReactions = [...reactions];
        newReactions[index][key] = value;
        setReactions(newReactions);
    }

    const addAbility = () => {
        setAbilities([...abilities, {
            name: "",
            description: ""
        }])
    }

    const modifyAbilities = (key, value, index) => {
        let newAbilities = [...abilities];
        newAbilities[index][key] = value;
        setAbilities(newAbilities);
    }

    const addLegendaryAction = () => {
        setLegendaryActions([...legendaryActions, {
            name: "",
            description: ""
        }])
    }

    const modifyLegendaryActions = (key, value, index) => {
        let newLegendaryActions = [...legendaryActions];
        newLegendaryActions[index][key] = value;
        setLegendaryActions(newLegendaryActions);
    }

    const removeAction = (actionToRemove) => {
        const newActions = [...actions].filter(action => action.name !== actionToRemove.name);

        setActions(newActions);
    }

    const removeReaction = (reactionToRemove) => {
        const newReactions = [...reactions].filter(reaction => reaction.name !== reactionToRemove.name);

        setReactions(newReactions);
    }

    const removeAbility = (abilityToRemove) => {
        const newAbilities = [...abilities].filter(ability => ability.name !== abilityToRemove.name);

        setAbilities(newAbilities);
    }

    const removeLegendaryAction = (actionToRemove) => {
        const newActions = [...legendaryActions].filter(action => action.name !== actionToRemove.name);

        setLegendaryActions(newActions)
    }

    const openDialog = () => {
        setDialogOpen(!dialogOpen);
    }

    const generateSpellcasting = () => {
        setAbilities([...abilities, {
            name: generateTitle(),
            description: generateDescription()
        }])
        setSpellDialogOpen(!spellDialogOpen)
        resetSpellcastingGeneration();
    }

    const resetSpellcastingGeneration = () => {
        setSpellCastingType(spellCastingTypeList[0]);
        setSpellCastingAbility(spellCastingAbilityList[0].key);
        setSpellCasterLevel(1);
        setSpellComponent({
            material: false,
            somatic: true,
            verbal: true
        })
        setSpells({
            level0: [],
            level1: [],
            level2: [],
            level3: [],
            level4: [],
            level5: [],
            level6: [],
            level7: [],
            level8: [],
            level9: [],
            atWill: [],
            perDay3: [],
            perDay2: [],
            perDay1: []
        })
        setSpellName({
            level0: '',
            level1: '',
            level2: '',
            level3: '',
            level4: '',
            level5: '',
            level6: '',
            level7: '',
            level8: '',
            level9: '',
            atWill: '',
            perDay3: '',
            perDay2: '',
            perDay1: ''
        })
        setAttackProperties([]);
    }

    const generateTitle = () => {
        if (spellCastingType === 'Innato') {
            return ('Lanzamiento de conjuros innato')
        } else {
            return ('Lanzamiento de conjuros')
        }
    }

    const generateDescription = () => {
        if (spellCastingType === 'Innato') {
            return (generateInnateDescription())
        } else {
            return (generateClassDescription())
        }
    }

    const generateInnateDescription = () => {
        let text = "La habilidad de conjuración de " + props.creature.name + " es " + spellCastingAbilityList.filter(ability => ability.key === spellCastingAbility)[0].label
            + " " + generateStatsText() + ". " + props.creature.name + " puede lanzar los siguientes conjuros de forma innata " +
            generateComponentText() + ":" + generateSpellBlock()

        return text;
    }

    const generateStatsText = () => {
        let text = "(salvación de conjuro CD " + getSaveDC(props.creature) + ", +" +
            getSpellAttackBonus(props.creature) + " al golpe con ataques de conjuro)"

        return text;
    }

    const getSaveDC = (creature) => {
        let dc = 8 + parseInt(creature.stats.proficiencyBonus) +
            parseInt(creature.stats.abilityScoreModifiers[spellCastingAbility]);

        return dc;
    }

    const getSpellAttackBonus = (creature) => {
        let bonus = parseInt(creature.stats.proficiencyBonus) +
            parseInt(creature.stats.abilityScoreModifiers[spellCastingAbility]);

        return bonus;
    }

    const generateComponentText = () => {
        let text = "";
        let requiredComponents = [];
        let notRequiredComponents = [];

        for (let key in spellComponents) {
            if (spellComponents.hasOwnProperty(key)) {
                let componentType = spellComponents[key];
                if (componentType) {
                    requiredComponents.push(key)
                } else {
                    notRequiredComponents.push(key)
                }
            }
        }
        if (requiredComponents.length < 3) {
            if (spellCastingType === "Innato") {
                text = text + ", requiriendo ";
                if (notRequiredComponents.length === 1) {
                    text = text + "ningún componente " +
                        notRequiredComponents[0];
                } else if (notRequiredComponents.length === 2) {
                    text = text + "solo componentes " + requiredComponents[0];
                } else {
                    text = text + " ningún componente";
                }
            } else {
                text = props.creature.name + " requiere ";
                if (notRequiredComponents.length === 1) {
                    text = text + "ningún componente " + notRequiredComponents[0] +
                        " para lanzar sus hechizos";
                } else if (notRequiredComponents.length === 2) {
                    text = text + "solo componentes " +
                        requiredComponents[0] +
                        " para lanzar sus hechizos"
                } else {
                    text = text + "ningún componente para lanzar sus hechizos";
                }
                text = text + ". "
            }
        }
        return (text);
    }

    const generateSpellBlock = () => {
        let text = "";
        const tryAddLine = (title, levelStr, level) => {
            let spellcasterData = spellcasters[spellCastingType];
            let slots = undefined;
            if (level && spellcasterData.hasOwnProperty("level")) {
                let dataByLevel = spellcasterData["level"];
                if (dataByLevel.hasOwnProperty(spellCasterLevel)) {
                    let slotsByLevel = dataByLevel[spellCasterLevel].spellSlots;
                    if (slotsByLevel) {
                        slots = slotsByLevel[level - 1];
                    }
                }
            }
            if (spells[levelStr.toString()].length > 0 && (slots === undefined || slots > 0)) {
                if (slots > 0) {
                    title = title + " (" + slots + " huecos)";
                }
                text = text + generateSpellLine(title, spells[levelStr]) + "</li>"
            }
        }
        if (spellCastingType === "Innato") {
            tryAddLine("A voluntad", "atWill");
            tryAddLine("3/día", "perDay3");
            tryAddLine("2/día", "perDay2");
            tryAddLine("1/día", "perDay1");
        } else {
            tryAddLine("Trucos (a voluntad)", "level0");
            for (let i = 1; i < 9; i++) {
                // let title = getOrdinal(1);
                tryAddLine("Nivel " + i + "", "level" + i, i)
            }
        }
        if (text[text.length - 1] === '\n') {
            text = text.substring(0, text.length - 1);
        }
        return text
    }

    const generateClassDescription = () => {
        let levelStr = spellCasterLevel;
        let classStr = spellCastingType.toLowerCase();
        // let possessiveCreatureName = props.creature.name;

        let text = props.creature.name + " es " + StringUtil.generiza("un", "una", "une", props.pronoun) + " " + classStr + " de nivel " + levelStr + ". La habilidad de conjuración de " + props.creature.name +
            " es " + spellCastingAbilityList.filter(ability => ability.key === spellCastingAbility)[0].label + " " + generateStatsText() + ". " + generateComponentText() + props.creature.name +
            " tiene los siguientes hechizos de " + classStr + " preparados:<ul>" + generateSpellBlock() + "</ul>";
        return text
    }

    const generateSpellLine = (type, spells) => {
        let text = "<li>" + type + ": ";
        for (let i = 0; i < spells.length; i++) {
            let spell = spells[i];
            text = text + "<em>" + spell + "</em>";
            if (i < (spells.length - 1)) {
                text = text + ", ";
            }
        }
        return (text);
    }

    const hasSpellSlotsOfLevel = (level) => {
        if (spellCastingType) {
            let spellcaster = spellcasters[spellCastingType];
            if (level === 0) {
                return true;
            } else if (spellCasterLevel) {
                let spellSlots = spellcaster.level[spellCasterLevel].spellSlots;
                if (spellSlots.hasOwnProperty(level - 1) && spellSlots[level - 1] !== 0) {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    const getSpellLevelText = (level) => {
        if (level === 0) {
            return ('Trucos');
        } else {
            return ('Hechizos de nivel ' + level)
        }
    }

    const getHighestSpellSlotLevel = () => {
        if (spellCastingType) {
            let spellcaster = spellcasters[spellCastingType];
            if (spellCasterLevel) {
                let spellSlots = spellcaster.level[spellCasterLevel].spellSlots
                return (spellSlots.length);
            } else {
                return 0;
            }
        } else {
            return 0
        }
    }

    return (
        <React.Fragment>
            <Dialog open={dialogOpen} style={{ padding: 10 }}>
                <DialogTitle>Genera un ataque</DialogTitle>
                <DialogContent >
                    <Grid container spacing={2}>
                        <Grid item sm={6}>
                            <TextField
                                required
                                fullWidth
                                onChange={(e) => setAttackName(e.target.value)}
                                value={attackName}
                                label={'Nombre'}
                            />
                        </Grid>
                        <Grid item sm={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attackRange.includes('Melé')}
                                        onChange={() => attackRange.includes('Melé') ? setAttackRange(attackRange.filter(attack => attack !== 'Melé')) : setAttackRange([...attackRange, 'Melé'])}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Melé"
                            />
                        </Grid>
                        <Grid item sm={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attackRange.includes('Distancia')}
                                        onChange={() => attackRange.includes('Distancia') ? setAttackRange(attackRange.filter(attack => attack !== 'Distancia')) : setAttackRange([...attackRange, 'Distancia'])}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Distancia"
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attackProperties.includes('Sutil')}
                                        onChange={() => attackProperties.includes('Sutil') ? setAttackProperties(attackRange.filter(attack => attack !== 'Sutil')) : setAttackProperties([...attackProperties, 'Sutil'])}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Sutil"
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attackProperties.includes('Versátil')}
                                        onChange={() => attackProperties.includes('Versátil') ? setAttackProperties(attackRange.filter(attack => attack !== 'Versátil')) : setAttackProperties([...attackProperties, 'Versátil'])}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Versátil"
                            />
                        </Grid>
                        <Grid item sm={4}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={attackProperties.includes('Daño extra')}
                                        onChange={() => attackProperties.includes('Daño extra') ? setAttackProperties(attackRange.filter(attack => attack !== 'Daño extra')) : setAttackProperties([...attackProperties, 'Daño extra'])}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Daño extra"
                            />
                        </Grid>
                        {attackRange.includes('Melé') &&
                            <>
                                <Grid item sm={12}>
                                    <TextField
                                        fullWidth
                                        label={'Alcance'}
                                        type="number"
                                        onChange={(e) => setAttackReach(e.target.value)}
                                        value={attackReach}
                                        defaultValue={5} />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        label={'Tipo de daño melé'}
                                        onChange={(e) => setMeleeAttackType(e.target.value)}
                                        value={meleeAttackType}
                                        defaultValue="Cortante" />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        onChange={(e) => setMeleeAttackDieNum(e.target.value)}
                                        label={'Num. dados de daño'}
                                        value={meleeAttackDieNum}
                                        defaultValue={1} />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        onChange={(e) => setMeleeAttackDieSize(e.target.value)}
                                        label={'Tamaño de dado'}
                                        value={meleeAttackDieSize}
                                        defaultValue={6} />
                                </Grid>
                            </>
                        }
                        {attackRange.includes('Distancia') &&
                            <>
                                <Grid item sm={6}>
                                    <TextField
                                        fullWidth
                                        label={'Alcance corto'}
                                        type="number"
                                        onChange={(e) => setAttackShortReach(e.target.value)}
                                        value={attackShortReach}
                                        defaultValue={80} />
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField
                                        fullWidth
                                        label={'Alcance largo'}
                                        type="number"
                                        onChange={(e) => setAttackLongReach(e.target.value)}
                                        value={attackLongReach}
                                        defaultValue={320} />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        label={'Tipo de daño melé'}
                                        onChange={(e) => setRangedAttackType(e.target.value)}
                                        value={rangedAttackType}
                                        defaultValue="Cortante" />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        onChange={(e) => setDistanceAttackDieNum(e.target.value)}
                                        label={'Num. dados de daño'}
                                        value={distanceAttackDieNum}
                                        defaultValue={1} />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        onChange={(e) => setDistanceAttackDieSize(e.target.value)}
                                        label={'Tamaño de dado'}
                                        value={distanceAttackDieSize}
                                        defaultValue={6} />
                                </Grid>
                            </>}
                        {attackProperties.includes('Versátil') &&
                            <>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        label={'Tipo de daño a dos manos'}
                                        onChange={(e) => setTwoHandedAttackType(e.target.value)}
                                        value={twoHandedAttackType}
                                        defaultValue="Cortante" />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        onChange={(e) => setTwoHandedAttackDieNum(e.target.value)}
                                        label={'Num. dados de daño a dos manos'}
                                        value={twoHandedAttackDieNum}
                                        defaultValue={1} />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        onChange={(e) => setTwoHandedAttackDieSize(e.target.value)}
                                        label={'Tamaño de dado a dos manos'}
                                        value={twoHandedAttackDieSize}
                                        defaultValue={6} />
                                </Grid>
                            </>
                        }
                        {attackProperties.includes('Daño extra') &&
                            <>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        label={'Tipo de daño extra'}
                                        onChange={(e) => setBonusAttackType(e.target.value)}
                                        value={bonusAttackType}
                                        defaultValue="Cortante" />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        onChange={(e) => setBonusAttackDieNum(e.target.value)}
                                        label={'Num. dados de daño extra'}
                                        value={bonusAttackDieNum}
                                        defaultValue={1} />
                                </Grid>
                                <Grid item sm={4}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        onChange={(e) => setBonusAttackDieSize(e.target.value)}
                                        label={'Tamaño de dado extra'}
                                        value={bonusAttackDieSize}
                                        defaultValue={6} />
                                </Grid>
                            </>
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={openDialog} color="default">
                        Cerrar
                     </Button>
                    <Button color="default" onClick={generateAttack} autoFocus>
                        Generar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={spellDialogOpen} style={{ padding: 10 }}>
                <DialogTitle>Genera hechicería</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item sm={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Tipo de hechicero</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={spellCastingType}
                                    onChange={(e) => setSpellCastingType(e.target.value)}
                                >
                                    {spellCastingTypeList.map((type, index) =>
                                        <MenuItem key={index} value={type}>{type}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Habilidad de hechicería</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={spellCastingAbility}
                                    onChange={(e) => setSpellCastingAbility(e.target.value)}
                                >
                                    {spellCastingAbilityList.map((ability, index) =>
                                        <MenuItem key={index} value={ability.key}>{ability.label}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                fullWidth
                                type="number"
                                InputProps={{ inputProps: { min: 0, max: 20 } }}
                                value={spellCasterLevel}
                                onChange={(e) => setSpellCasterLevel(e.target.value)}
                                placeholder="Nivel de hechicería" />
                        </Grid>
                        <Grid item sm={12}>
                            <FormControl className={classes.formControl}>
                                {/* <InputLabel>Componentes</InputLabel> */}
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={spellComponents.material}
                                            onChange={() => setSpellComponent({ ...spellComponents, material: !spellComponents.material })}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Material"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={spellComponents.somatic}
                                            onChange={() => setSpellComponent({ ...spellComponents, somatic: !spellComponents.somatic })}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Somático"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={spellComponents.verbal}
                                            onChange={() => setSpellComponent({ ...spellComponents, verbal: !spellComponents.verbal })}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Verbal"
                                />
                            </FormControl>
                        </Grid>
                        {spellLevelArray.length > 0 && spellCastingType !== 'Innato' && spellCastingType !== StringUtil.generiza("Brujo", "Bruja", "Bruje", props.pronoun) && (
                            spellLevelArray.map(level => (
                                hasSpellSlotsOfLevel(level) &&
                                <Grid item sm={12}>
                                    {spells['level' + level].length > 0 && spells['level' + level].map(spell => (
                                        <Chip
                                            label={spell}
                                            className={classes.chip}
                                            onDelete={() => {
                                                const levelToChange = 'level' + level;
                                                setSpells({ ...spells, [levelToChange]: spells['level' + level].filter(spellItem => spellItem !== spell) })
                                            }}
                                        />
                                    ))}
                                    <TextField
                                        fullWidth
                                        id="spellname"
                                        name="spellname"
                                        label={'Hechizos de nivel ' + getSpellLevelText(level)}
                                        value={spellName['level' + level]}
                                        onChange={(e) => setSpellName({ ...spellName, ['level' + level]: e.target.value })}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && spellName['level' + level].length > 0) {
                                                setSpellName({ ...spellName, ['level' + level]: '' })
                                                if (!spells['level' + level].includes(spellName['level' + level])) {
                                                    setSpells({ ...spells, ['level' + level]: [...spells['level' + level], spellName['level' + level]] })
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                            )
                            ))}
                        {spellLevelArray.length > 0 && spellCastingType === StringUtil.generiza("Brujo", "Bruja", "Bruje", props.pronoun) && (
                            <>
                                <Grid item sm={12}>
                                    {spells['level0'].map(spell => (
                                        <Chip
                                            label={spell}
                                            className={classes.chip}
                                            onDelete={() => setSpells({ ...spells, 'level0': spells['level0'].filter(spellItem => spellItem !== spell) })}
                                        />
                                    ))}
                                    <TextField
                                        fullWidth
                                        id="spellname"
                                        name="spellname"
                                        label={'Trucos'}
                                        value={spellName['level0']}
                                        onChange={(e) => setSpellName({ ...spellName, level0: e.target.value })}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && spellName['level0'].length > 0) {
                                                setSpellName({ ...spellName, level0: '' })
                                                if (!spells['level0'].includes(spellName['level0'])) {
                                                    setSpells({ ...spells, 'level0': [...spells['level0'], spellName['level0']] })
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item sm={12}>
                                    {spells['level' + getHighestSpellSlotLevel()].map(spell => (
                                        <Chip
                                            label={spell}
                                            className={classes.chip}
                                        />
                                    ))}
                                    <TextField
                                        fullWidth
                                        id="spellname"
                                        name="spellname"
                                        label={'Hechizos'}
                                        value={spellName['level' + getHighestSpellSlotLevel()]}
                                        onChange={(e) => setSpellName({ ...spellName, ['level' + getHighestSpellSlotLevel()]: e.target.value })}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && spellName['level' + getHighestSpellSlotLevel()].length > 0) {
                                                setSpellName({ ...spellName, ['level' + getHighestSpellSlotLevel()]: '' })
                                                if (!spells['level' + getHighestSpellSlotLevel()].includes(spellName['level' + getHighestSpellSlotLevel()])) {
                                                    setSpells({ ...spells, ['level' + getHighestSpellSlotLevel()]: [...spells['level' + getHighestSpellSlotLevel()], spellName['level' + getHighestSpellSlotLevel()]] })
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                            </>
                        )}
                        {spellLevelArray.length > 0 && spellCastingType === 'Innato' && (
                            <>
                                <Grid item sm={12}>
                                    {spells['atWill'].map(spell => (
                                        <Chip
                                            label={spell}
                                            className={classes.chip}
                                            onDelete={() => setSpells({ ...spells, 'atWill': spells['atWill'].filter(spellItem => spellItem !== spell) })}
                                        />
                                    ))}
                                    <TextField
                                        fullWidth
                                        id="spellname"
                                        name="spellname"
                                        label={'A voluntad'}
                                        value={spellName['atWill']}
                                        onChange={(e) => setSpellName({ ...spellName, atWill: e.target.value })}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && spellName['atWill'].length > 0) {
                                                setSpellName({ ...spellName, atWill: '' })
                                                if (!spells['atWill'].includes(spellName['atWill'])) {
                                                    setSpells({ ...spells, 'atWill': [...spells['atWill'], spellName['atWill']] })
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item sm={12}>
                                    {spells['perDay3'].map(spell => (
                                        <Chip
                                            label={spell}
                                            className={classes.chip}
                                            onDelete={() => setSpells({ ...spells, 'perDay3': spells['perDay3'].filter(spellItem => spellItem !== spell) })}
                                        />
                                    ))}
                                    <TextField
                                        fullWidth
                                        id="spellname"
                                        name="spellname"
                                        label={'3/día'}
                                        value={spellName['perDay3']}
                                        onChange={(e) => setSpellName({ ...spellName, 'perDay3': e.target.value })}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && spellName['perDay3'].length > 0) {
                                                setSpellName({ ...spellName, 'perDay3': '' })
                                                if (!spells['perDay3'].includes(spellName['perDay3'])) {
                                                    setSpells({ ...spells, 'perDay3': [...spells['perDay3'], spellName['perDay3']] })
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item sm={12}>
                                    {spells['perDay2'].map(spell => (
                                        <Chip
                                            label={spell}
                                            className={classes.chip}
                                            onDelete={() => setSpells({ ...spells, 'perDay2': spells['perDay2'].filter(spellItem => spellItem !== spell) })}
                                        />
                                    ))}
                                    <TextField
                                        fullWidth
                                        id="spellname"
                                        name="spellname"
                                        label={'2/día'}
                                        value={spellName['perDay2']}
                                        onChange={(e) => setSpellName({ ...spellName, 'perDay2': e.target.value })}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && spellName['perDay2'].length > 0) {
                                                setSpellName({ ...spellName, 'perDay2': '' })
                                                if (!spells['perDay2'].includes(spellName['perDay2'])) {
                                                    setSpells({ ...spells, 'perDay2': [...spells['perDay2'], spellName['perDay2']] })
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item sm={12}>
                                    {spells['perDay1'].map(spell => (
                                        <Chip
                                            label={spell}
                                            className={classes.chip}
                                            onDelete={() => setSpells({ ...spells, 'perDay1': spells['perDay1'].filter(spellItem => spellItem !== spell) })}
                                        />
                                    ))}
                                    <TextField
                                        fullWidth
                                        id="spellname"
                                        name="spellname"
                                        label={'1/día'}
                                        value={spellName['perDay1']}
                                        onChange={(e) => setSpellName({ ...spellName, 'perDay1': e.target.value })}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && spellName['perDay1'].length > 0) {
                                                setSpellName({ ...spellName, 'perDay1': '' })
                                                if (!spells['perDay1'].includes(spellName['perDay1'])) {
                                                    setSpells({ ...spells, 'perDay1': [...spells['perDay1'], spellName['perDay1']] })
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSpellDialogOpen(!spellDialogOpen)} color="default">
                        Cerrar
                     </Button>
                    <Button color="default" onClick={generateSpellcasting} autoFocus>
                        Generar
                    </Button>
                </DialogActions>
            </Dialog>
            <Typography variant="h6" gutterBottom>
                Habilidades
            </Typography>
            <Grid container spacing={2}>
                <Grid item sm={12}>
                    <Button onClick={addAction}>
                        AÑADIR ACCIÓN
                    </Button>
                    <Button onClick={openDialog}>
                        GENERAR ATAQUE
                    </Button>
                </Grid>
                {actions.map((action, index) => (
                    <>
                        <Grid container spacing={2} item sm={12}>
                            <Grid item sm={2}>
                                <TextField
                                    fullWidth
                                    value={action.name}
                                    onChange={(e) => modifyActions("name", e.target.value, index)}
                                    placeholder="Nombre" />
                            </Grid>
                            <Grid item sm={9}>
                                <TextField
                                    fullWidth
                                    multiline
                                    value={action.description}
                                    onChange={(e) => modifyActions("description", e.target.value, index)}
                                    placeholder="Descripción" />
                            </Grid>
                            <Grid item sm={1}>
                                <IconButton onClick={() => removeAction(action)}>
                                    <ClearIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </>
                ))}
                <Grid item sm={12}>
                    <Button onClick={addReaction}>
                        AÑADIR REACCIÓN
                    </Button>
                </Grid>
                {reactions.map((reaction, index) => (
                    <>
                        <Grid container spacing={2} item sm={12}>
                            <Grid item sm={2}>
                                <TextField
                                    fullWidth
                                    value={reaction.name}
                                    onChange={(e) => modifyReactions("name", e.target.value, index)}
                                    placeholder="Nombre" />
                            </Grid>
                            <Grid item sm={9}>
                                <TextField
                                    fullWidth
                                    multiline
                                    value={reaction.description}
                                    onChange={(e) => modifyReactions("description", e.target.value, index)}
                                    placeholder="Descripción" />
                            </Grid>
                            <Grid item sm={1}>
                                <IconButton onClick={() => removeReaction(reaction)}>
                                    <ClearIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </>
                ))}
                <Grid item sm={12}>
                    <Button onClick={addAbility}>
                        AÑADIR HABILIDAD
                    </Button>
                    <Button onClick={() => setSpellDialogOpen(!spellDialogOpen)}>
                        GENERAR LANZAMIENTO DE CONJUROS
                    </Button>
                </Grid>
                {abilities.map((ability, index) => (
                    <>
                        <Grid container spacing={2} item sm={12}>
                            <Grid item sm={2}>
                                <TextField
                                    fullWidth
                                    value={ability.name}
                                    onChange={(e) => modifyAbilities("name", e.target.value, index)}
                                    placeholder="Nombre" />
                            </Grid>
                            <Grid item sm={9}>
                                <TextField
                                    fullWidth
                                    multiline
                                    value={ability.description}
                                    onChange={(e) => modifyAbilities("description", e.target.value, index)}
                                    placeholder="Descripción" />
                            </Grid>
                            <Grid item sm={1}>
                                <IconButton onClick={() => removeAbility(ability)}>
                                    <ClearIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </>
                ))}
                <Grid item sm={12}>
                    <Button onClick={addLegendaryAction}>
                        AÑADIR ACCIÓN LEGENDARIA
                    </Button>
                </Grid>
                {legendaryActions.length > 0 && (
                    <TextField
                        fullWidth
                        multiline
                        placeholder="Descripción"
                        defaultValue={
                            `${(!props.creature.flavor.nameIsProper && props.pronoun && props.pronoun.length > 0) ? StringUtil.generiza("El", "La", "Le", props.pronoun) + ' ' + props.creature.name.toLowerCase() : props.creature.name} puede llevar a cabo 3 acciones legendarias, escogiendo entre las opciones disponibles. Solo se puede utilizar una opción a la vez y solo al final del turno de otra criatura. ${(!props.creature.flavor.nameIsProper && props.pronoun && props.pronoun.length > 0) ? StringUtil.generiza("El", "La", "Le", props.pronoun) + ' ' + props.creature.name.toLowerCase() : props.creature.name} recupera las acciones legendarias usadas al principio de su turno.`
                        } />
                )}
                {legendaryActions.map((legendaryAction, index) => (
                    <>
                        <Grid container spacing={2} item sm={12}>
                            <Grid item sm={2}>
                                <TextField
                                    fullWidth
                                    value={legendaryAction.name}
                                    onChange={(e) => modifyLegendaryActions("name", e.target.value, index)}
                                    placeholder="Nombre" />
                            </Grid>
                            <Grid item sm={9}>
                                <TextField
                                    fullWidth
                                    multiline
                                    value={legendaryAction.description}
                                    onChange={(e) => modifyLegendaryActions("description", e.target.value, index)}
                                    placeholder="Descripción" />
                            </Grid>
                            <Grid item sm={1}>
                                <IconButton onClick={() => removeLegendaryAction(legendaryAction)}>
                                    <ClearIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </>
                ))}
            </Grid>
        </React.Fragment>
    );
}