import { Table, Model, Column, DataType, HasOne, BelongsTo } from 'sequelize-typescript';
import DrawingParticipation from './drawingparticipation'
import User from './user'
import Contest from './contest'
import { Optional } from 'sequelize';

export interface VoteAttributes {
  id: string
  rating: number
  user: User
  drawingParticipation: DrawingParticipation
  createdAt?: Date
  updatedAt?: Date
}

interface VoteCreationAttributes extends Optional<VoteAttributes, 'id'> {}

@Table
export default class Vote extends Model<VoteAttributes, VoteCreationAttributes> {
  @Column(DataType.NUMBER)
  rating: number | undefined

  @BelongsTo(() => User, 'userId')
  user: User | undefined

  @BelongsTo(() => DrawingParticipation, 'drawingUserId')
  drawingParticipation: DrawingParticipation | undefined
}
