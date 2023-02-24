const User = `
  type User {
    id: ID!
    name: String
    email: String
    password: String
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    user(id: String!): User
  }

  type Mutation {
    signup(name: String!, password: String!, email: String!): AuthPayload! 
    login(email: String!, password: String!): AuthPayload!
  }
`

export default [User]
