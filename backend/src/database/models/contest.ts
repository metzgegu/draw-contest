import { type Optional } from 'sequelize'
import {
  Table,
  Model,
  DataType,
  Column,
  HasMany,
  HasOne,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript'
import DrawingParticipation from './drawingparticipation'
import User from './user'

export enum Status {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  ONGOING = 'ONGOING',
  VOTING = 'VOTING',
}

export interface ContestAttributes {
  id: string
  name: string
  adminUser?: User
  adminUserId: number
  status: string
  drawingParticipations?: DrawingParticipation[]
  createdAt?: Date
  updatedAt?: Date
}

interface ContestCreationAttributes extends Optional<ContestAttributes, 'id'> {}

@Table
export default class Contest extends Model<
  ContestAttributes,
  ContestCreationAttributes
> {
  @Column(DataType.STRING)
  name: number | undefined

  @Column(DataType.STRING)
  status: string | undefined

  @ForeignKey(() => User)
  adminUserId: number | undefined

  @BelongsTo(() => User, 'adminUserId')
  adminUser: User | undefined

  @HasMany(() => DrawingParticipation)
  drawingParticipations: DrawingParticipation[] | undefined
}
