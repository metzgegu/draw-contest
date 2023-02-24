import { DataTypes, type Model } from 'sequelize'
import { sequelize } from '.'

export interface ContestAttributes {
  id?: string
  name: string
  email: string
  password: string
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
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
})

export default Contest
