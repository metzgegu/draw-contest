import { Table, Model } from 'sequelize-typescript';
import Contest from './contest'
import User from './user'

export interface DrawingParticipationAttributes {
  status?: string
  s3link?: string
  contest: Contest
  user: User
  createdAt?: Date
  updatedAt?: Date
}

interface DrawingParticipationCreationAttributes extends DrawingParticipationAttributes {}

@Table
class DrawingParticipation extends Model<DrawingParticipationAttributes, DrawingParticipationCreationAttributes> {}

export default DrawingParticipation
