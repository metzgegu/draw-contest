const Vote = `
  type Vote {
    id: ID!
    userId: ID
    drawingParticipationId: ID
    rating: Int
  }

  type Query {
    votesForOneDrawing(drawingUserId: ID!, contestId: ID!): [Vote]
  }

  type Mutation {
    vote(drawingUserId: ID!, contestId: ID!, rating: Int!): Vote
  }
`

export default [Vote]
