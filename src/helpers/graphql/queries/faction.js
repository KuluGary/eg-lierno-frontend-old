import { gql } from "@apollo/client";

export const MEMBER_LIST = gql`
    query FactionMembers($characterIds: [String!], $npcIds: [String!], $monsterIds: [String!]) {
        get_npcs_by_id(npcIds: $npcIds) {
            npcs {
                _id
                name
                flavor {
                    portrait {
                        avatar
                    }
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
        }
        get_characters_by_id(characterIds: $characterIds) {
            characters {
                _id
                flavor {
                    traits {
                        name
                    }
                    portrait {
                        avatar
                    }
                }
                stats {
                    race {
                        name
                    }
                    classes {
                        className
                        classLevel
                    }
                }
            }
        }
        get_monsters_by_id(monsterIds: $monsterIds) {
            monsters {
                _id
                name
                flavor {
                    portrait {
                        avatar
                    }
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
        }
    }
`;
