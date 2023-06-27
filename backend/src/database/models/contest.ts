import { Optional } from 'sequelize'
import { Table, Model } from 'sequelize-typescript';
import DrawingParticipation from './drawingparticipation'
import User from './user';

export enum Status {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  ONGOING = 'ONGOING',
  VOTING = 'VOTING',
}

export interface ContestAttributes {
  id: string
  name: string
  adminUser: User
  status: string
  drawingParticipations?: DrawingParticipation[]
  createdAt?: Date
  updatedAt?: Date
}

interface ContestCreationAttributes extends Optional<ContestAttributes, 'id'> {}

@Table
export default class Contest extends Model<ContestAttributes, ContestCreationAttributes> {}
