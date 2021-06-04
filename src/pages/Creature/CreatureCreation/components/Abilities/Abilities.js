import React, { useState, useEffect } from 'react';
import { StringUtil } from "helpers/string-util";
import Typography from '@material-ui/core/Typography';

import ActionsGeneration from './components/ActionsGeneration';
import ReactionsGeneration from './components/ReactionsGeneration';
import AbilitiesGeneration from './components/AbilitiesGeneration';
import LegendaryActionsGeneration from './components/LegendaryActionsGeneration';
import LairActionsGeneration from './components/LairActionsGeneration';
import RegionalAbilitiesGeneration from './components/RegionalAbilitiesGeneration';
import ItemsGeneration from './components/ItemsGeneration';

function Abilities(props) {
    const spellCastingTypeList = [
        "Innato",
        StringUtil.generiza("Bardo", "Barda", "Barde", props.pronoun),
        StringUtil.generiza("Brujo", "Bruja", "Bruje", props.pronoun),
        StringUtil.generiza("Clérigo", "Clériga", "Clérigue", props.pronoun),
        "Druida",
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

    // useEffect(() => {
    //     // initializeSpellLevelArray();
    //     props.addToCreatureStats(StringUtil.replaceDescriptionLineBreaks(actions), "actions");
    //     props.addToCreatureStats(StringUtil.replaceDescriptionLineBreaks(reactions), "reactions");
    //     props.addToCreatureStats(StringUtil.replaceDescriptionLineBreaks(abilities), "additionalAbilities");
    //     props.addToCreatureStats(StringUtil.replaceDescriptionLineBreaks(legendaryActions), "legendaryActions");
    //     props.addToCreatureStats(`${(!props.creature.flavor.nameIsProper && props.pronoun && props.pronoun.length > 0) ? props.pronoun + ' ' + props.creature.name.toLowerCase() : props.creature.name} puede llevar a cabo 3 acciones legendarias, escogiendo entre las opciones disponibles. Solo se puede utilizar una opción a la vez y solo al final del turno de otra criatura. ${props.creature.name} recupera las acciones legendarias usadas al principio de su turno.`, "legendaryActionsDescription")
    // }, [actions, reactions, abilities, legendaryActions])

    const generateSpellcasting = () => {
        // setAbilities([...abilities, {
        //     name: generateTitle(),
        //     description: generateDescription()
        // }])
        // setSpellDialogOpen(!spellDialogOpen)
        // resetSpellcastingGeneration();
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
                tryAddLine("Nivel " + i + "", "level" + i, i)
            }
        }
        if (text[text.length - 1] === '\n') {
            text = text.substring(0, text.length - 1);
        }

        return text
    }

    const generateSpellLine = (type, spells) => {
        let text = "<li>" + type + ": ";
        for (let i = 0; i < spells.length; i++) {
            let spell = spells[i];
            text = text + "<i>" + spell + "</i>";
            if (i < (spells.length - 1)) {
                text = text + ", ";
            }
        }
        return (text);
    }    

    return (
        <React.Fragment>            
            {/* <Dialog open={spellDialogOpen} style={{ padding: 10 }}>
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
            </Dialog> */}

            <Typography variant="h5" gutterBottom>
                Habilidades
            </Typography>
            <ActionsGeneration
                actions={props.creature.stats.actions}
                proficiencyBonus={props.creature.stats.proficiencyBonus}
                abilityScoreModifiers={props.creature.stats.abilityScoreModifiers}
                setActions={(actions) => props.addToCreatureStats(actions, "actions")}
            />

            <ReactionsGeneration
                reactions={props.creature.stats.reactions}
                setReactions={(reactions) => props.addToCreatureStats(reactions, "reactions")}
            />

            <AbilitiesGeneration
                pronoun={props.pronoun}
                name={props.creature.name}
                abilities={props.creature.stats.additionalAbilities}
                proficiencyBonus={props.creature.stats.proficiencyBonus}
                abilityScoreModifiers={props.creature.stats.abilityScoreModifiers}
                setAbilities={(abilities) => props.addToCreatureStats(abilities, "additionalAbilities")}
            />

            <ItemsGeneration
                items={props.creature.stats.items || []}
                setItems={(items) => props.addToCreatureStats(items, "items")}
            />

            <LegendaryActionsGeneration
                pronoun={props.pronoun}
                nameIsProper={props.creature.flavor.nameIsProper}
                name={props.creature.name}
                legendaryActions={props.creature.stats.legendaryActions}
                setLegendaryActions={(legendaryActions) => props.addToCreatureStats(legendaryActions, "legendaryActions")}
            />

            <LairActionsGeneration
                pronoun={props.pronoun}
                nameIsProper={props.creature.flavor.nameIsProper}
                name={props.creature.name}
                lairActions={props.creature.stats.lairActions || []}
                setLairActions={(lairActions) => props.addToCreatureStats(lairActions, "lairActions")}
            />

            <RegionalAbilitiesGeneration
                pronoun={props.pronoun}
                nameIsProper={props.creature.flavor.nameIsProper}
                name={props.creature.name}
                regionalAbilities={props.creature.stats.regionalAbilities || []}
                setRegionalAbilities={(regionalAbilities) => props.addToCreatureStats(regionalAbilities, "regionalAbilities")}
            />

        </React.Fragment>
    );
}

export { Abilities };