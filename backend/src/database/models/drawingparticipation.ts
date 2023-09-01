import {
  Table,
  Model,
  Column,
  DataType,
  HasOne,
  BelongsTo,
  PrimaryKey,
  ForeignKey,
} from 'sequelize-typescript'
import Contest from './contest'
import User from './user'

export interface DrawingParticipationAttributes {
  status?: string
  s3link?: string
  contestId: number
  userId: number
  createdAt?: Date
  updatedAt?: Date
}

interface DrawingParticipationCreationAttributes
  extends DrawingParticipationAttributes {}

@Table
class DrawingParticipation extends Model<
  DrawingParticipationAttributes,
  DrawingParticipationCreationAttributes
> {
  @Column(DataType.STRING)
  status: string | undefined

  @Column(DataType.STRING)
  s3link: string | undefined

  @ForeignKey(() => User)
  userId: number | undefined

  @BelongsTo(() => User, 'userId')
  user: User | undefined

  @ForeignKey(() => Contest)
  contestId: number | undefined

  @BelongsTo(() => Contest, 'contestId')
  contest: Contest | undefined
}

export default DrawingParticipation
