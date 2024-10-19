import gql from 'graphql-tag'

export const authUserQuery = gql`
  query {
    authUser {
      user {
        id
        name
        email
        avatar {
          id
          public_id
          url
          userId
        }
        role
        address
        phone_number
        isGoogleUser
        createdAt
      }
      accessToken
      refreshToken
    }
  }
`
