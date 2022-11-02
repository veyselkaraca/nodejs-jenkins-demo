import 'dotenv/config';
import { sequelize } from '../src/services/database-service';
import { logger } from '../src/services/logger-service';

beforeAll(async () => {
  try {
    await sequelize.sync();
  } catch (error) {
    logger.error(error);
  }
});

beforeEach(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.drop();
});
