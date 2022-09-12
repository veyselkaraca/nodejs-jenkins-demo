import { Request, Response } from 'express';
import { Employee } from '../models/index';

const createEmployee = async (req: Request, res: Response) => {
  const employee = await Employee.create(req.body);
  res.status(201).send(employee);
};

export { createEmployee };
