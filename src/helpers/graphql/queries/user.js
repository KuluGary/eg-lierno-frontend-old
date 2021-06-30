import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query Me {
    me {
      user {
        _id
        username
        isActive
        metadata {
          avatar
        }
      }
      errors {
        error
        field
      }
    }
  }
`

export const METADATA_QUERY = gql`
  query Metadata {
    me {
      user {
        metadata {
          first_name
          last_name
          email
          avatar
          location
          discordName
          discordId
          friendList
        }
        createdAt
      }
    }
  }
`