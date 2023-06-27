import { Optional } from 'sequelize'
import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import DrawingParticipation from './drawingparticipation'

export interface UserAttributes {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}


@Table
export default class User extends Model<UserAttributes, UserCreationAttributes> {}
