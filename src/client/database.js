import { Sequelize } from 'sequelize-typescript'
import config from '../database/config'

// Option 1: Passing a connection URI
const sequelize = new Sequelize(config.development) // Example for postgres

export default sequelize
