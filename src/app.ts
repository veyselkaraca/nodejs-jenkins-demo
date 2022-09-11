import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { router } from './routes/index';

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(json());

app.use('/api', router);

app.all('*', async (req: Request, res: Response) => {
  console.error(`The requested path is not found.`, { req, res });
  throw new Error(`The requested path is not found.`);
});

export { app };
