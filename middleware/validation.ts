import { type RequestHandler } from 'express';
import { type ValidationChain } from 'express-validator';
import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/custom-errors.ts';

const validator = (validateValues: ValidationChain[]): [...ValidationChain[], RequestHandler] => ([
  ...validateValues,
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    } else {
      const errorMessages = errors.array().map((error) => error.msg).join(', ');
      throw new BadRequestError(errorMessages);
    }
  }
]);

const validateTest = validator([
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 10 })
    .withMessage('Name must be at least 10 characters long')
]);

export default validateTest;