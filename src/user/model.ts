import { DataTypes } from 'sequelize'
import sequelize from '../client/database'

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}
// {
//   hooks: {
//    beforeCreate: async (user) => {
//     if (user.password) {
//      const salt = await bcrypt.genSaltSync(10, 'a');
//      user.password = bcrypt.hashSync(user.password, salt);
//     }
//    },
//    beforeUpdate:async (user) => {
//     if (user.password) {
//      const salt = await bcrypt.genSaltSync(10, 'a');
//      user.password = bcrypt.hashSync(user.password, salt);
//     }
//    }
//   },
//   instanceMethods: {
//    validPassword: (password) => {
//     return bcrypt.compareSync(password, this.password);
//    }
//   }
//  }
)

export default User
