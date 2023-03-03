import { DataTypes, type Model } from 'sequelize'
import { sequelize } from '.'

export enum Status {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  ONGOING = 'ONGOING',
  VOTING = 'VOTING',
}

export interface ContestAttributes {
  id?: string
  name: string
  status: string
  adminUserId: string
}

interface ContestCreationAttributes extends ContestAttributes {}

export interface ContestInstance
  extends Model<ContestAttributes, ContestCreationAttributes>,
    ContestAttributes {
  createdAt?: Date
  updatedAt?: Date
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
const Contest = sequelize.define<ContestInstance>('Contest', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
  },
  adminUserId: {
    type: DataTypes.STRING,
  },
})

export default Contest
