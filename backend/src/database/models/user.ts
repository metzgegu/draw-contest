import { DataTypes, type Model } from 'sequelize'
import { sequelize } from '.'

export interface UserAttributes {
  id?: number
  name: string
  email: string
  password: string
}

interface UserCreationAttributes extends UserAttributes {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  createdAt?: Date
  updatedAt?: Date
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
const User = sequelize.define<UserInstance>('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
})

export default User
