const Contest = `
  type Contest {
    id: ID!
    name: String
    status: String
    adminUserId: ID
  }

  type Query {
    contest(id: String!): Contest
  }

  type Mutation {
    createContest(name: String!): Contest 
  }
`

export default [Contest]