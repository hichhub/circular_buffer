import * as pino from 'pino';
import constants from './constants';

export const logger = pino({
  level: constants.LOG_LEVEL,
  name: constants.APP_ID,
});
