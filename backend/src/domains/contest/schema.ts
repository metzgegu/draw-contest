const Contest = `
  type Contest {
    id: ID!
    name: String
    status: String
    adminUserId: ID
    drawingParticipations: [DrawingParticipationWithUser!]!
  }

  type Query {
    contest(id: String!): Contest
    adminContestList: [Contest]
    joinedContestList: [Contest]
  }

  type Mutation {
    createContest(name: String!): Contest
    advanceContestNextStep(id: String!): Contest
    joinContest(contestId: ID!): Contest
  }
`

export default [Contest]
