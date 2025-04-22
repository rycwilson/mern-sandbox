import { type RequestHandler } from 'express';
import mongoose from 'mongoose';
import { type ValidationChain, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/custom-errors.ts';

export const validator = (validationChains: ValidationChain[]): [...ValidationChain[], RequestHandler] => ([
  ...validationChains,
  (req, _, next) => {
    const errors = validationResult(req);
    console.error(errors.array());
    if (errors.isEmpty()) {
      return next();
    } else {
      const errorMessages = errors.array().map((error) => error.msg).join(', ');
      if (errorMessages[0].startsWith('No widget')) {
        throw new NotFoundError(errorMessages);
      }
      if (errorMessages[0].startsWith('Not authorized')) {
        throw new UnauthorizedError(errorMessages);
      }
      throw new BadRequestError(errorMessages);
    }
  }
]);

export const validateIdFormat = validator([
  param('id').custom(value => {
    if (mongoose.Types.ObjectId.isValid(value)) {
      return true;
    } else {
      throw new Error('Invalid id format')
    }
  })
]);