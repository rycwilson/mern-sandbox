import { type RequestHandler } from 'express';
import { type ValidationChain } from 'express-validator';
import { body, param, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import Widget from '../models/widget.ts';
import { BadRequestError, NotFoundError } from '../errors/custom-errors.ts';

const validator = (validateValues: ValidationChain[]): [...ValidationChain[], RequestHandler] => ([
  ...validateValues,
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    } else {
      const errorMessages = errors.array().map((error) => error.msg).join(', ');
      if (errorMessages[0].startsWith('No widget')) {
        throw new NotFoundError(errorMessages);
      }
      throw new BadRequestError(errorMessages);
    }
  }
]);

export const validateWidgetInput = validator([
  body('name')
    .notEmpty()
    .withMessage('Widget name is required')
    .isLength({ max: 50 })
    .withMessage('Widget name must be at most 50 characters long'),
  body('category')
    .optional()
    .isIn(['A', 'B', 'C'])
    .withMessage('Category must be one of A, B, or C'),
  // body('createdBy')
  //   .notEmpty()
  //   .withMessage('User ID is required')
])

// the errors thrown here can be regular errors, because validationResult() will process them, stop their propagation, and throw a custom error
export const validateIdParam = validator([
  param('id')
    .custom(async (value) => {
      const isValidId = mongoose.Types.ObjectId.isValid(value);
      if (!isValidId) {
        throw new Error('Invalid ID format');
      }
      const widgetExists = await mongoose.models.Widget.exists({ _id: value });
      if (!widgetExists) {
        throw new Error(`No widget with id: ${value}`);
      }
    })

    // synchronous approach
    // .custom(value => mongoose.Types.ObjectId.isValid(value))
    // .withMessage('Invalid ID format')
]);

export const validateRegistration = validator([
  body('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name must be at most 50 characters long'),
  body('lastName')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Last name must be at most 50 characters long'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid email address')
    .custom(async (value) => {
      const userExists = await mongoose.models.User.exists({ email: value });
      if (userExists) {
        throw new Error('Email is already in use');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage("Role must be either 'user' or 'admin'")
]);
