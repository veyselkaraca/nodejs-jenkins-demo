import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validate-request';
import { createEmployee } from '../controller/employee';

const router = express.Router();

router.post(
  '/',
  [
    body('name').not().isEmpty().withMessage('Employee name is required'),
    body('surname').not().isEmpty().withMessage('Employee surname is required'),
    body('job').not().isEmpty().withMessage('Employee job is required'),
  ],
  validateRequest,
  createEmployee
);

export { router as employeeRouter };
