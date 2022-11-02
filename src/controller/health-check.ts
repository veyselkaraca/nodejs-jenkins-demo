import { Request, Response } from 'express';
import { sequelize } from '../services/database-service';

export const healthCheck = async (_req: Request, res: Response) => {
  try {
    await sequelize.authenticate();
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
