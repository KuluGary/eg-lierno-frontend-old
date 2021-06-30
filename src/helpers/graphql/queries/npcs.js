import { gql } from "@apollo/client";

export const NPC_LIST_ID = gql`
    query Npcs {
        _id
        name
        flavor {
            imageUrl
            class
            campaign {
                campaignId
                unlocked
            }
        }
        stats {
            race
            challengeRatingStr
            experiencePoints
        }
        createdBy
    }
`;
