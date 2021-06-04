import React from 'react';
import Typography from '@material-ui/core/Typography';

import ActionsGeneration from './components/ActionsGeneration';
import ReactionsGeneration from './components/ReactionsGeneration';
import AbilitiesGeneration from './components/AbilitiesGeneration';
import LegendaryActionsGeneration from './components/LegendaryActionsGeneration';
import LairActionsGeneration from './components/LairActionsGeneration';
import RegionalAbilitiesGeneration from './components/RegionalAbilitiesGeneration';
import ItemsGeneration from './components/ItemsGeneration';

function Abilities(props) {
    return (
        <React.Fragment>                        
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