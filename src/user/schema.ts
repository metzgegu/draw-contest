const User = `
  type User {
    id: ID!
    name: String
  }

  type Query {
    user(id: String!): User
  }

  type Mutation {
    createUser(name: String!): User! 
  }
`

export default [User]
