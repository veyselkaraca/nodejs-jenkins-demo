import 'dotenv/config';
import { app } from './app';
import { sequelize } from './services/database-service';
import { logger } from './services/logger-service';

const databaseConnection = async () => {
  try {
    await sequelize.sync();
    logger.info('Database connection successful');
  } catch (error) {
    logger.error(error);
    setTimeout(databaseConnection, 5000);
  }
};
const start = async () => {
  await databaseConnection();
  const port = process.env.NODE_PORT || 3000;
  app.listen(port, () => {
    logger.info(`Initialization successful -> Listening on port ${port}`);
  });
};
start();
