import config from '../config'

import { Sequelize, type SequelizeOptions } from 'sequelize-typescript'
import User from './user'
import DrawingParticipation from './drawingparticipation'
import Vote from './vote'
import Contest from './contest'

const sequelize = new Sequelize(
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  {
    ...config.development,
  } as SequelizeOptions
)

sequelize.addModels([User, DrawingParticipation, Vote, Contest])

export { Sequelize, sequelize }
