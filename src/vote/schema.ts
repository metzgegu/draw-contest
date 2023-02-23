const Vote = `
  type Vote {
    id: ID!
    userId: String
    drawingContestId: ID
    note: Int
  }

  type Query {
    vote(id: String!): Vote
  }
`;

export default [Vote];
