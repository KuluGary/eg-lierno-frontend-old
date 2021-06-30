import { gql } from '@apollo/client';

export const CAMPAIGN_LIST_QUERY = gql`
  query {
    get_user_campaigns {
      campaigns {
        _id
        name
        flavor {
          game
          synopsis
        }
      }
      errors {
        field
        error
      }
    }
  }
`