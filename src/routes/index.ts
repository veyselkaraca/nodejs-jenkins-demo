import express from 'express';
import { healthRouter } from './health';
import { employeeRouter } from './employee';

const router = express.Router();

router.use('/health', healthRouter);
router.use('/employee', employeeRouter);
export { router };
