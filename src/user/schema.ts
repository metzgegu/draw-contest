const User = `
  type User {
    id: ID!
    name: String
  }

  type Query {
    user(id: String!): User
  }
`

export default [User]
