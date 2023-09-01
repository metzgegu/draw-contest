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
    drawingParticipation(id: String!): DrawingParticipation
  }
`

export default [DrawingParticipation]
