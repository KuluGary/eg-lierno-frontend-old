import { gql } from "@apollo/client";

export const CHAR_LIST_QUERY = gql`
  query Characters {
    get_user_characters {
      characters {
        _id
        name
        type
        flavor {
          traits {
            pronoun
          }
          portrait {
            avatar
          }
          description
          psychologicalDescription
          class
        }
        stats {
          race {
            name
          }
          classes {
            className
            classLevel
          }
          background {
            name
          }
        }
      }
      errors {
        field
        error
      }
    }
    get_dm_characters {
      characters {
        _id
        name
        type
        flavor {
          traits {
            pronoun
          }
          portrait {
            avatar
          }
          psychologicalDescription
          class
        }
        stats {
          race {
            name
          }
          classes {
            className
            classLevel
          }
          background {
            name
          }
        }
      }
      errors {
        field
        error
      }
    }
    get_favorite_npcs {
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
          description
        }
        stats {
          race
          challengeRatingStr
          experiencePoints
        }
      }
      errors {
        field
        error
      }
    }
  }
`;
