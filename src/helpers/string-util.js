import character_template from 'assets/json/character_template';
import customizable_stats from 'assets/json/customizable_stats';

export const StringUtil = {
    abilityMatrix: [
        {
            "name": "Acrobacias",
            "modifier": "dexterity"
        },
        {
            "name": "T.con Animales",
            "modifier": "wisdom"
        },
        {
            "name": "C.Arcano",
            "modifier": "intelligence"
        },
        {
            "name": "Atletismo",
            "modifier": "strength"
        },
        {
            "name": "Engaño",
            "modifier": "charisma"
        },
        {
            "name": "Historia",
            "modifier": "intelligence"
        },
        {
            "name": "Perspicacia",
            "modifier": "wisdom"
        },
        {
            "name": "Intimidación",
            "modifier": "charisma"
        },
        {
            "name": "Investigación",
            "modifier": "intelligence"
        },
        {
            "name": "Medicina",
            "modifier": "wisdom"
        },
        {
            "name": "Naturaleza",
            "modifier": "intelligence"
        },
        {
            "name": "Percepción",
            "modifier": "wisdom"
        },
        {
            "name": "Interpretación",
            "modifier": "charisma"
        },
        {
            "name": "Persuasión",
            "modifier": "charisma"
        },
        {
            "name": "Religión",
            "modifier": "intelligence"
        },
        {
            "name": "Juego de Manos",
            "modifier": "dexterity"
        },
        {
            "name": "Sigilo",
            "modifier": "dexterity"
        },
        {
            "name": "Supervivencia",
            "modifier": "wisdom"
        }
    ],
    classMatrix: [],
    getRandomInt(min = 1, max = 20) {
        return Math.floor(Math.random() * max) + min
    },

    swapArrayItems(arr, a, b) {
        var temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;

        return temp;
    },

    getDateFromISODate(ISOdate) {
        const date = new Date(ISOdate);

        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    },

    parseRole(role) {
        role = role.toLowerCase().replace("_", " ");
        role = role[0].toUpperCase() + role.substring(1)

        return role
    },

    replaceDescriptionLineBreaks(array) {
        const newArray = array.map(item => {
            const description = item.description;
            return {
                ...item,
                description: description.replace(/\n/g, "<br />")
            }
        })
        return newArray;
    },

    generiza(masculino, femenino, neutro, pronombre) {
        if (pronombre) {
            if (pronombre.toLowerCase() === 'el') {
                return masculino
            } else if (pronombre.toLowerCase() === 'ella' || pronombre.toLowerCase() === 'la') {
                return femenino
            } else {
                return neutro
            }
        } else {
            return masculino
        }
    },

    generizaClase(clase, pronoun = "el") {
        let claseToReturn = clase;
        let replaceVowel = pronoun.toLowerCase() === 'la' ? 'a' : pronoun.toLowerCase() === 'le' ? 'e' : null;       

        if (replaceVowel && clase) {
            if (clase.charAt(clase.length - 1) === 'o') {
                if (clase.charAt(clase.length - 2) === 'g' && replaceVowel === 'e') {
                    replaceVowel = "u" + replaceVowel;
                }
                claseToReturn = claseToReturn.replace(/.$/, replaceVowel);
            } else {
                if (replaceVowel !== clase.charAt(clase.length - 1)) {
                    claseToReturn = claseToReturn + replaceVowel;
                }
            }
        }

        return claseToReturn;
    },

    returnStringFromObjectArray(arr, key) {
        const newArray = [];
        arr.forEach(item => newArray.push(item[key]));

        return newArray.join(", ");
    },

    returnModifierStr(arr, creature) {
        const newArray = arr.map(item => {
            const modifierType = item.modifier ?? 
                character_template.stats.skills[Object.keys(character_template.stats.skills).findIndex(el => el === item.id)].modifier

            const proficiencyToAdd = parseInt(creature.stats.proficiencyBonus);

            const modifier = parseInt(creature.stats.abilityScoreModifiers[modifierType]) + (item.expertise ? proficiencyToAdd * 2 : (item.proficient ? proficiencyToAdd : 0));
            const modifierName = customizable_stats.stats[modifierType].name
            const name = customizable_stats.skills[item.id].name;

            return `${name} (${modifierName}) ${(modifier >= 0 && '+') + modifier}`
            

            // if (item.modifierStr) {
            //     return item
            // } else {
            //     const typeIndex = this.abilityMatrix.findIndex(el => el.name === item.name)
            //     if (typeIndex >= 0) {
            //         const type = this.abilityMatrix[typeIndex].modifier
                    
            //         const modifier = parseInt(creature.stats.abilityScoreModifiers[type]) + parseInt(creature.stats.proficiencyBonus);
            //         return {
            //             name: item.name,
            //             profient: true,
            //             modifier,
            //             modifierStr: `${item.name} ${(modifier >= 0 && '+') + modifier}`
            //         }
            //     } else {
            //         return item
            //     }
            // }
        })

        return newArray.join(", ");
    },

    parseHTML(str) {
        return str.replaceAll("\n", "<br/>")
    }
}