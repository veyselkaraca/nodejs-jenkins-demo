import { Options, Sequelize } from 'sequelize';
import { logger } from './logger-service';

const options = JSON.parse(process.env.DB_OPTIONS || ('{}' as string)) as Options;
if (options === undefined || options === null || Object.keys(options).length === 0) {
  throw new Error('Database options is not set');
} else if (options.host === undefined || options.host === null || options.host === '') {
  throw new Error('Database host is not set');
} else if (options.port === undefined || options.port === null || options.port === 0) {
  throw new Error('Database port is not set');
} else if (options.username === undefined || options.username === null || options.username === '') {
  throw new Error('Database username is not set');
} else if (options.password === undefined || options.password === null || options.password === '') {
  throw new Error('Database password is not set');
} else if (options.database === undefined || options.database === null || options.database === '') {
  throw new Error('Database name is not set');
}
options.logging = (msg) => {
  return logger.info(msg);
};
const sequelize = new Sequelize(options);

export { sequelize };
