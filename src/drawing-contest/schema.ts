const DrawingContest = `
  type DrawingContest {
    id: ID!
    userId: String!
    contestId: String!
    status: String
    s3link: String
    cdnUrl: String
  }

  type Query {
    drawingContest(id: String!): DrawingContest
  }
`;

export default [DrawingContest];
