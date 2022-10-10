import express, { Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';
import { json } from 'body-parser';
import helmet from 'helmet';
import { router } from './routes/index';
import { errorLogger, logger, requestLogger } from './services/logger-service';
import { errorHandler } from './middleware/error-handler';
import { ipCheck } from './middleware/ip-allow-list';

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(json());
app.use(helmet());
app.use(requestLogger);
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(ipCheck);
app.use('/api', router);

app.all('*', async (req: Request, res: Response) => {
  logger.error(`The requested path is not found.`);
  throw new Error(`The requested path is not found.`);
});

app.use(errorLogger);

app.use(errorHandler);

export { app };
