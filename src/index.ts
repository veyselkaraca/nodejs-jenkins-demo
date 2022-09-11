import { app } from './app';
import { logger } from './services/logger-service';

const start = async () => {
  app.listen(3000, () => {
    logger.info('Initialization successful -> Listening on port 3000!');
  });
};
start();
