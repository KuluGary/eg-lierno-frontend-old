import React, { useState } from 'react';
import { StringUtil } from "helpers/string-util";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

export default function SpellCastingGeneration({
  addFunc,
  dialogOpen,
  openDialog,
  pronoun,
  name,
  proficiencyBonus,
  abilityScoreModifiers
}) {
  const classes = useStyles();
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
  });
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
  const spellCastingTypeList = [
    "Innato",
    StringUtil.generiza("Bardo", "Barda", "Barde", pronoun),
    StringUtil.generiza("Brujo", "Bruja", "Bruje", pronoun),
    StringUtil.generiza("Clérigo", "Clériga", "Clérigue", pronoun),
    "Druida",
    "Montaraz",
    StringUtil.generiza("Hechicero", "Hechicera", "Hechicere", pronoun),
    StringUtil.generiza("Mago", "Maga", "Mague", pronoun),
    StringUtil.generiza("Paladín", "Paladina", "Paladine", pronoun)
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
  const [spellCastingType, setSpellCastingType] = useState(spellCastingTypeList[0]);
  const [spellCastingAbility, setSpellCastingAbility] = useState(spellCastingAbilityList[0].key)
  const [spellCasterLevel, setSpellCasterLevel] = useState(1)
  const [spellComponents, setSpellComponent] = useState({
    material: false,
    somatic: true,
    verbal: true
  });
  const [spellLevelArray] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const spellcasters = {
    "Innato": {
      "components": {
        "material": false,
        "somatic": true,
        "verbal": true
      }
    },
    [StringUtil.generiza("Bardo", "Barda", "Barde", pronoun)]: {
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
    [StringUtil.generiza("Clérigo", "Clériga", "Clérigue", pronoun)]: {
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
    [StringUtil.generiza("Paladín", "Paladina", "Paladine", pronoun)]: {
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
    [StringUtil.generiza("Hechicero", "Hechicera", "Hechicere", pronoun)]: {
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
    [StringUtil.generiza("Brujo", "Bruja", "Bruje", pronoun)]: {
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
    [StringUtil.generiza("Mago", "Maga", "Mague", pronoun)]: {
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

  const generateSpellcasting = () => {
    addFunc(generateTitle(), generateDescription());
    openDialog();
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
    let text = "La habilidad de conjuración de " + name + " es " + spellCastingAbilityList.filter(ability => ability.key === spellCastingAbility)[0].label
      + " " + generateStatsText() + ". " + name + " puede lanzar los siguientes conjuros de forma innata " +
      generateComponentText() + ":" + generateSpellBlock()

    return text;
  }

  const generateClassDescription = () => {
    let levelStr = spellCasterLevel;
    let classStr = spellCastingType.toLowerCase();

    let text = name + " es " + StringUtil.generiza("un", "una", "une", pronoun) + " " + classStr + " de nivel " + levelStr + ". La habilidad de conjuración de " + name +
      " es " + spellCastingAbilityList.filter(ability => ability.key === spellCastingAbility)[0].label + " " + generateStatsText() + ". " + generateComponentText() + name +
      " tiene los siguientes hechizos de " + classStr + " preparados:<ul>" + generateSpellBlock() + "</ul>";
    return text
  }

  const generateStatsText = () => {
    let text = "(salvación de conjuro CD " + getSaveDC() + ", +" +
      getSpellAttackBonus() + " al golpe con ataques de conjuro)"

    return text;
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
        text = name + " requiere ";
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

  const getSaveDC = () => {
    let dc = 8 + parseInt(proficiencyBonus) +
      parseInt(abilityScoreModifiers[spellCastingAbility]);

    return dc;
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

  const getSpellAttackBonus = () => {
    let bonus = parseInt(proficiencyBonus) +
      parseInt(abilityScoreModifiers[spellCastingAbility]);

    return bonus;
  }


  return (
    <Dialog open={dialogOpen} style={{ padding: 10 }}>
      <DialogTitle>Lanzamiento de conjuros</DialogTitle>
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
          {spellLevelArray.length > 0 && spellCastingType !== 'Innato' && spellCastingType !== StringUtil.generiza("Brujo", "Bruja", "Bruje", pronoun) && (
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
          {spellLevelArray.length > 0 && spellCastingType === StringUtil.generiza("Brujo", "Bruja", "Bruje", pronoun) && (
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
        <Button onClick={openDialog} color="default">Cerrar</Button>
        <Button color="default" onClick={generateSpellcasting} autoFocus>Generar</Button>
      </DialogActions>
    </Dialog>
  )
}
