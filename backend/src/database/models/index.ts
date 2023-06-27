import config from '../config'

import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import User from './user';
import DrawingParticipation from './drawingparticipation';
import Vote from './vote';
import Contest from './contest';

const sequelize = new Sequelize(
  {
    ...config.development,
  } as SequelizeOptions
);

sequelize.addModels([User, DrawingParticipation, Vote, Contest])

export { Sequelize, sequelize }
