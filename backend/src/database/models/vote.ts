import { DataTypes, type Model } from 'sequelize'
import { sequelize } from '.'

export interface VoteParticipation {
  userId: number
  contestId: number
  drawingUserId: number
  rating: number
}

interface VoteCreationAttributes
  extends VoteParticipation {}

export interface VoteInstance
  extends Model<
      VoteParticipation,
      VoteCreationAttributes
    >,
    VoteParticipation {
  createdAt?: Date
  updatedAt?: Date
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
const Vote = sequelize.define<VoteInstance>(
  'Vote',
  {
    userId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
    },
    contestId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
    },
    drawingUserId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.NUMBER,
    },
  }
)

export default Vote
