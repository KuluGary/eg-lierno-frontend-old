import { gql } from '@apollo/client';

export const getUserCharactersForTable = gql`
    query {
        characters {
            _id,
            player,
            flavor {
            traits {
                name
            }
            }
        }
    }
`