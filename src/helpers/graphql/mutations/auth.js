import { gql } from "@apollo/client";

export const LOGIN_MUT = gql`
  mutation Login($username:String!, $password:String!){
    login(options: { username:$username, password:$password }) {
      errors {
        error
        field
      }
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
}`

export const LOGOUT_MUT = gql`
  mutation Logout {
    logout
  }
`