import { DataTypes, type Model } from 'sequelize'
import { sequelize } from '.'

export interface DrawingParticipationAttributes {
  userId: number
  contestId: number
  status?: string
  s3link?: string
}

interface DrawingParticipationCreationAttributes
  extends DrawingParticipationAttributes {}

export interface DrawingParticipationInstance
  extends Model<
      DrawingParticipationAttributes,
      DrawingParticipationCreationAttributes
    >,
    DrawingParticipationAttributes {
  createdAt?: Date
  updatedAt?: Date
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
const DrawingParticipation = sequelize.define<DrawingParticipationInstance>(
  'DrawingParticipation',
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
    status: {
      type: DataTypes.STRING,
    },
    s3link: {
      type: DataTypes.STRING
    }
  }
)

export default DrawingParticipation