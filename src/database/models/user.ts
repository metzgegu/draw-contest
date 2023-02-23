import { DataTypes, type Model, type Optional } from "sequelize";
import { sequelize } from ".";

interface UserAttributes {
  name: string;
  email: string;
  password: string;
}

interface UserCreationAttributes extends UserAttributes {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
const User = sequelize.define<UserInstance>("User", {
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
});

export default User;
