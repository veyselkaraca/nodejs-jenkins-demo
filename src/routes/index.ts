import express from 'express';
import { employeeRouter } from './employee';
import { healthCheck } from '../controller/health-check';

const router = express.Router();

router.use('/health', healthCheck);
router.use('/employee', employeeRouter);

export { router };
