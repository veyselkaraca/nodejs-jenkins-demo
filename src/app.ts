import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { router } from './routes/index';
import { errorLogger, logger, requestLogger } from './services/logger-service';

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(json());
app.use(requestLogger);
app.use('/api', router);

app.all('*', async (req: Request, res: Response) => {
  logger.error(`The requested path is not found.`);
  throw new Error(`The requested path is not found.`);
});

app.use(errorLogger);

export { app };
