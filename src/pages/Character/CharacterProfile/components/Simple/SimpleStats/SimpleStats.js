import React, { useState, useEffect } from "react";

import _ from "lodash";
import useStyles from "./SimpleStats.styles";
import Api from "helpers/api";
import { StringUtil } from "helpers/string-util";
import { Stats } from "../../Information/components/Stats/Stats";
import { stats, skills, hitDie } from "assets/json/customizable_stats.json";

import { Typography, Box, Divider, Paper, Tabs, Tab, Grid } from "@material-ui/core";

const fullcaster = {
  1: {
    spellSlots: [2],
  },
  2: {
    spellSlots: [3],
  },
  3: {
    spellSlots: [4, 2],
  },
  4: {
    spellSlots: [4, 3],
  },
  5: {
    spellSlots: [4, 3, 2],
  },
  6: {
    spellSlots: [4, 3, 3],
  },
  7: {
    spellSlots: [4, 3, 3, 1],
  },
  8: {
    spellSlots: [4, 3, 3, 2],
  },
  9: {
    spellSlots: [4, 3, 3, 3, 1],
  },
  10: {
    spellSlots: [4, 3, 3, 3, 2],
  },
  11: {
    spellSlots: [4, 3, 3, 3, 2, 1],
  },
  12: {
    spellSlots: [4, 3, 3, 3, 2, 1],
  },
  13: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1],
  },
  14: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1],
  },
  15: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1, 1],
  },
  16: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1, 1],
  },
  17: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  },
  18: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  },
  19: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  },
  20: {
    spellSlots: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  },
};

export default function SimpleStats(props) {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [categories, setCategories] = useState([]);
  const [character, setCharacter] = useState(props.character);
  const casterType = {
    fullcaster: ["Druida", "Bardo", "Clérigo", "Mago", "Hechicero", "Brujo"],
    halfcaster: ["Paladín", "Montaraz"],
  };

  const getSpellSlots = (spellLevel) => {
    let classLevel = 0;

    character.stats.classes.forEach((charClass) => {
      if (casterType.fullcaster.includes(charClass.className)) {
        classLevel += charClass.classLevel;
      } else if (casterType.halfcaster.includes(charClass.className)) {
        classLevel += Math.floor(charClass.classLevel / 2);
      } else {
        classLevel += Math.floor(charClass.classLevel / 3);
      }
    });

    return fullcaster[classLevel].spellSlots[spellLevel];
  };

  useEffect(() => {
    const cats = [];
    if (character.stats.attacks.length > 0) {
      cats.push({
        label: "Ataques",
        value: "attacks",
      });
    }
    if (character.stats.additionalAbilities.length > 0) {
      cats.push({
        label: "Habilidades",
        value: "additionalAbilities",
      });
    }
    if (character.stats.actions.length > 0) {
      cats.push({
        label: "Acciones",
        value: "actions",
      });
    }
    if (character.stats.reactions.length > 0) {
      cats.push({
        label: "Reacciones",
        value: "reactions",
      });
    }

    if (Object.keys(character.stats.equipment || {}).length > 0) {
      const objects = [];

      for (const key in character.stats.equipment || {}) {
        const element = character.stats.equipment[key];

        if (Array.isArray(element)) {
          objects.push(...element.map((i) => i.id));
        }
      }

      Api.fetchInternal("/items", {
        method: "POST",
        body: JSON.stringify(objects),
      }).then((res) => {
        const newItems = res.map(({ _id, name, description }) => {
          return {
            id: _id,
            name,
            description,
          };
        });

        const newChar = _.cloneDeep(character);
        newChar.stats.equipment = newItems;

        cats.push({
          label: "Objetos",
          value: "equipment",
        });
        setCharacter(newChar);
      });
    }

    if (character.stats.spells.length > 0) {
      Api.fetchInternal("/spells", {
        method: "POST",
        body: JSON.stringify(character.stats.spells.map((spellId) => spellId.spellId)),
      }).then((res) => {
        const spellCastingAbilities = {
          INT: "Inteligencia",
          CAR: "Carisma",
          SAB: "Sabiduría",
        };

        const lookupTable = {
          FUE: "strength",
          DES: "dexterity",
          CONST: "constitution",
          INT: "intelligence",
          SAB: "wisdom",
          CAR: "charisma",
        };

        let spellDC = "N/A";

        const spellByLevel = {};
        let spellBonus = "N/A";

        if (character.stats.spellcastingAbility && character.stats.spellcastingAbility !== "N/A") {
          const abilityScoreModifier = Math.floor(
            (character.stats.abilityScores[lookupTable[character.stats.spellcastingAbility]] - 10) / 2,
          );

          spellDC =
            (character.stats.spellcastingAbility && character.stats.spellcastingAbility) !== "N/A"
              ? 8 + character.stats.proficiencyBonus + abilityScoreModifier
              : "N/A";

          spellBonus =
            (character.stats.spellcastingAbility && character.stats.spellcastingAbility) !== "N/A"
              ? character.stats.proficiencyBonus + abilityScoreModifier
              : "N/A";
        }

        res.forEach((spell) => {
          if (spellByLevel[spell.stats.level]) {
            spellByLevel[spell.stats.level].push(spell.name);
          } else {
            spellByLevel[spell.stats.level] = [spell.name];
          }
        });

        const spells = {
          name: "Lanzamiento de conjuros",
          description: `La habilidad de conjuración de ${character.name} es ${
            spellCastingAbilities[character.stats.spellcastingAbility]
          } (salvación de conjuro CD ${spellDC}, ${
            spellBonus > 0 ? "+" : ""
          }${spellBonus} al golpe con ataques de hechizo). ${
            character.name
          } requiere componentes verbales, somáticos y materiales para lanzar sus hechizos. ${
            character.name
          } tiene los siguientes hechizos preparados:<ul>`,
        };

        Object.keys(spellByLevel).forEach((key) => {
          const spellStr = spellByLevel[key].map((i) => `<em>${i}</em>`).join(", ");

          spells.description += `<li>${
            parseInt(key) === 0 ? "Trucos (a voluntad)" : `Nivel ${key} (${getSpellSlots(parseInt(key) - 1)} huecos)`
          }: ${spellStr}.</li>`;
        });

        const newChar = _.cloneDeep(character);

        newChar.stats.additionalAbilities.push(spells);

        setCharacter(newChar);
      });
    }
    setCategories(cats);
  }, [props.character]);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (_, newValue) => {
    setSelectedCategory(newValue);
  };

  const getAttackDescription = (attack) => {
    let toHitBonus = 0;
    let bonusStat = "strength";
    let type = attack.data.type;
    let range = attack.data.range;
    let indexes = [];

    if (attack.data.properties.includes("Sutil")) {
      if (
        Math.floor(character.stats.abilityScores["dexterity"] - 10 / 2) >
        Math.floor(character.stats.abilityScores["strength"] - 10 / 2)
      ) {
        bonusStat = "dexterity";
      }
    } else if (
      attack.data.properties.some((damage) => damage.properties === "Distancia") ||
      attack.data.damage.some((damage) => damage.properties === "Distancia")
    ) {
      bonusStat = "dexterity";
    }

    toHitBonus =
      Math.floor((character.stats.abilityScores[bonusStat] - 10) / 2) +
      (attack.proficient ? character.stats.proficiencyBonus : 0);

    return `<em>${type}</em> 1d20 ${
      toHitBonus >= 0 ? "+" : ""
    } ${toHitBonus} al golpe, alcance ${range} Daño ${attack.data.damage
      .filter((i) => {
        const isIn = !indexes.includes(i.die);
        indexes.push(i.die);
        return isIn;
      })
      .map((dmg) => {
        let rangeStr;

        if (dmg.properties === "Distancia" || dmg.properties.includes("Melé")) {
          rangeStr = `melé`;
        }

        if (dmg.properties === "Distancia" || dmg.properties.includes("Distancia")) {
          if (rangeStr === "melé") {
            rangeStr += ` o distancia`;
          } else {
            rangeStr = `distancia`;
          }
        }

        if (dmg.properties === "Versátil" || dmg.properties.includes("Versátil")) {
          return `${dmg.die} + ${toHitBonus} ${dmg.type.toLowerCase()} si es usado con dos manos`;
        }

        return `${dmg.die} + ${toHitBonus} ${dmg.type.toLowerCase()}`;
      })
      .join(" o ")}.`;
  };

  const getDataDescription = (ability, category, i) => {
    switch (category) {
      case "attacks":
        return (
          <Box>
            <span
              className={classes.abilityDescription}
              dangerouslySetInnerHTML={{
                __html: `<b>${ability.name}.</b> ${getAttackDescription(ability)}`,
              }}
            />
            {i + 1 < character.stats[categories[selectedCategory]?.value].length && (
              <Divider className={classes.divider} />
            )}{" "}
          </Box>
        );
      case "equipment":
        return (
          <Box>
            <span
              className={classes.abilityDescription}
              dangerouslySetInnerHTML={{ __html: `<b>${ability.name}.</b> ${ability.description}` }}
            />
            {i + 1 < character.stats[categories[selectedCategory]?.value].length && (
              <Divider className={classes.divider} />
            )}{" "}
          </Box>
        );
      case "spells":
        return <Box></Box>;
      default:
        return (
          <Box>
            <span
              className={classes.abilityDescription}
              dangerouslySetInnerHTML={{ __html: `<b>${ability.name}.</b> ${ability.description}` }}
            />
            {i + 1 < character.stats[categories[selectedCategory]?.value].length && (
              <Divider className={classes.divider} />
            )}{" "}
          </Box>
        );
    }
  };

  const returnSavingThrowModifier = (check) => {
    let bonus = 0;
    const savingThrows = character.stats.savingThrows;
    const proficiency = character.stats.proficiencyBonus;
    const abilityScores = character.stats.abilityScores;

    if (savingThrows[check].expertise) {
      bonus = Math.floor((abilityScores[check] - 10) / 2) + proficiency * 2;
    } else if (savingThrows[check].proficient) {
      bonus = Math.floor((abilityScores[check] - 10) / 2) + proficiency;
    } else {
      bonus = Math.floor((abilityScores[check][check] - 10) / 2);
    }

    return bonus > 0 ? "+" + bonus : bonus;
  };

  const returnSkillModifier = (check) => {
    let bonus = 0;
    const skills = character.stats.skills;
    const proficiency = character.stats.proficiencyBonus;
    const abilityScores = character.stats.abilityScores;

    if (skills[check].expertise) {
      bonus = Math.floor((abilityScores[skills[check].modifier] - 10) / 2) + proficiency * 2;
    } else if (skills[check].proficient) {
      bonus = Math.floor((abilityScores[skills[check].modifier] - 10) / 2) + proficiency;
    } else {
      bonus = Math.floor((abilityScores[skills[check].modifier] - 10) / 2);
    }

    return bonus > 0 ? "+" + bonus : bonus;
  };

  const getHitPointsString = (classes, hitPoints) => {
    let str;

    if (!!hitPoints) {
      str = character.stats.hitPoints?.hp_current
        ? character.stats.hitPoints?.hp_current
        : character.stats.hitPoints?.hp_max;
    }

    if (!!classes) {
      let hitDiceArr = [];
      let hitPointBonus = 0;
      const constModifier = Math.floor(((parseInt(character.stats?.abilityScores?.constitution) || 10) - 10) / 2);

      classes.forEach((charClass) => {
        const hitDice = hitDie[StringUtil.generizaClase(charClass.className)] || 10;
        hitPointBonus += parseInt(charClass.classLevel) * constModifier;
        hitDiceArr.push(`${charClass.classLevel}d${hitDice}`);
      });

      str += ` (${hitDiceArr.join(", ")} + ${hitPointBonus})`;
    }
    return str;
  };

  const getAC = (armorClass, equipment) => {
    let str = `${armorClass}`;
    if (Array.isArray(equipment)) {
      if (Array.isArray(props.character?.stats?.equipment?.armor)) {
        const armorIds = props.character?.stats?.equipment?.armor?.filter((i) => i.equipped).map((i) => i.id);
        const armor = armorIds.map((id) => equipment.find((item) => item.id === id).name);

        if (armor.length > 0) {
          str += ` (${armor.join(", ")})`;
        }
      }
    }
    return str;
  };

  return (
    <Paper variant="outlined" className={classes.profileBox}>
      <Box className={classes.content}>
        <Grid container spacing={1}>
          <Stats
            character={true}
            stats={character["stats"]["abilityScores"]}
            modifiers={character["stats"]["abilityScoreModifiers"]}
          />
        </Grid>

        <Divider className={classes.divider} />

        <Box>
          <Typography variant={"subtitle2"} display="inline">
            {"Armadura: "}
          </Typography>
          {/* {`CA ${character.stats.armorClass}.`} */}
          {getAC(character.stats.armorClass, character.stats.equipment)}
        </Box>
        <Box>
          <Typography variant={"subtitle2"} display="inline">
            {"Puntos de vida: "}
          </Typography>
          {getHitPointsString(character.stats?.classes, character.stats?.hitPoints)}
        </Box>
        <Box>
          <Box>
            <Typography variant={"subtitle2"} display="inline">
              {"Velocidad: "}
            </Typography>

            {character.stats.speed + " ft. por turno."}
          </Box>
        </Box>

        <Divider className={classes.divider} />

        <Box>
          <Box>
            <Typography variant={"subtitle2"} display="inline">
              {"Tiradas de salvación: "}
            </Typography>
            {Object.keys(character.stats.savingThrows).length > 0
              ? Object.keys(character.stats.savingThrows)
                  .filter((key) => character.stats.savingThrows[key].proficient)
                  .map((key) => `${stats[key].name} (${returnSavingThrowModifier(key)})`)
                  .join(", ")
              : "—"}
          </Box>
          <Box>
            <Typography variant={"subtitle2"} display="inline">
              {"Habilidades: "}
            </Typography>
            {Object.keys(character.stats.skills)
              .filter((key) => character.stats.skills[key].proficient)
              .map((key) => `${skills[key].name} (${returnSkillModifier(key)})`)
              .join(", ")}
          </Box>
          <Box>
            <Typography variant={"subtitle2"} display="inline">
              {"Sentidos: "}
            </Typography>

            {`Percepción pasiva ${character.stats.passivePerception}.`}
          </Box>
        </Box>

        <Divider className={classes.divider} />

        <Tabs variant="scrollable" value={selectedCategory} onChange={handleChange}>
          {categories.map((category, index) => (
            <Tab key={index} label={category.label} {...a11yProps(category)} />
          ))}
        </Tabs>

        <Divider style={{ marginBottom: "1rem" }} />
        {Array.isArray(character?.stats[categories[selectedCategory]?.value]) &&
          (character?.stats[categories[selectedCategory]?.value] || []).map((ability, i) =>
            getDataDescription(ability, categories[selectedCategory]?.value, i),
          )}
      </Box>
    </Paper>
  );
}
