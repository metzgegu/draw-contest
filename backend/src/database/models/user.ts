import { Optional } from 'sequelize'
import { BelongsToMany, Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import DrawingParticipation from './drawingparticipation'
import Contest from './contest';

export interface UserAttributes {
  id: number
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}


@Table
export default class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column(DataType.STRING)
  name: string | undefined

  @Column(DataType.STRING)
  email: string | undefined

  @Column(DataType.STRING)
  password: string | undefined

  @HasMany(() => DrawingParticipation)
  drawingParticipation: DrawingParticipation[] | undefined;
}
