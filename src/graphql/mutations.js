import gql from "graphql-tag";

export const registerMutation = gql`
  mutation register(
    $name: String!
    $password: String!
    $email: String!
    $phone_number: Float!
  ) {
    register(
      registerInput: {
        name: $name
        password: $password
        email: $email
        phone_number: $phone_number
      }
    ) {
      activation_token
    }
  }
`;

export const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        name
        email
        role
        address
        createdAt
        phone_number
        avatar {
          id
          public_id
          url
          userId
        }
      }
      accessToken
      refreshToken
    }
  }
`;

export const activateUserMutation = gql`
  mutation activateUser($activationToken: String!, $activationCode: String!) {
    activateUser(
      activationDto: {
        activationToken: $activationToken
        activationCode: $activationCode
      }
    ) {
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
        createdAt
      }
      accessToken
      refreshToken
    }
  }
`;

export const logoutMutation = gql`
  mutation logout {
    logout {
      message
    }
  }
`;

export const forgotPasswordMutation = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(forgotPasswordInput: { email: $email }) {
      message
    }
  }
`;

export const resetPasswordMutation = gql`
  mutation resetPassword($password: String!, $activationToken: String!) {
    resetPassword(
      resetPasswordInput: {
        password: $password
        activationToken: $activationToken
      }
    ) {
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
        createdAt
      }
    }
  }
`;

export const googleLoginMutation = gql`
  mutation googleLogin($code: String!) {
    googleLogin(googleLoginInput: { code: $code }) {
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
        createdAt
        isGoogleUser
      }
      accessToken
      refreshToken
    }
  }
`;