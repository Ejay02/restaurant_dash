import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { getCookie } from '@/utils/cookie'
import { createApolloProvider } from '@vue/apollo-option'

// Retrieve tokens from cookies
const accessToken = getCookie('access_token')
const refreshToken = getCookie('refresh_token')

// Middleware for attaching tokens to headers
const authMiddleware = new ApolloLink((operation, forward) => {
  const headers = {
    'access-token': accessToken ? `${accessToken}` : '',
    'refresh-token': refreshToken || ''
  }

  operation.setContext({ headers })

  return forward(operation)
})

// HTTP link to the GraphQL server
const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_APP_SERVER_URI}/graphql`,
  credentials: 'include'
})

// Apollo Client setup
const apolloClient = new ApolloClient({
  link: ApolloLink.from([authMiddleware, httpLink]),
  cache: new InMemoryCache()
})

// Apollo Provider for Vue
const apolloProvider = createApolloProvider({
  defaultClient: apolloClient
})

export { apolloClient, apolloProvider }
