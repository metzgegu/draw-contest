const DrawingParticipation = `
  type DrawingParticipation {
    id: ID!
    userId: String!
    contestId: String!
    status: String
    s3link: String
    cdnUrl: String
  }

  type DrawingParticipationWithUser {
    id: ID!
    userId: String!
    contestId: String!
    status: String
    s3link: String
    cdnUrl: String
    user: User
  }

  type Query {
    drawingParticipation(contestId: String!): DrawingParticipation
  }
`

export default [DrawingParticipation]
