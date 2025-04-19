import { type ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Error as MongooseError } from 'mongoose';
import { MongoError } from 'mongodb';
import { CustomApiError } from '../errors/custom-errors.ts';

type ErrorType = Error | MongooseError | MongoError | CustomApiError;

const handleError: ErrorRequestHandler = (err: ErrorType, req, res, next) => {
  const customError = {
    statusCode: (err instanceof CustomApiError && err.statusCode) || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: (err instanceof CustomApiError && err.message) || 'Sorry, there was an error'
  };
  if (err instanceof MongooseError.ValidationError) {
    customError.msg = Object.values(err.errors).map(item => item.message).join(', ');
    customError.statusCode = 400;
  }
  if (err instanceof MongooseError.CastError) {
    customError.msg = `No record found with id: ${err.value}`;
    customError.statusCode = 404;
  }
  if (err instanceof MongoError && err.code === 11000) {
    // TODO: keyValue property is not defined on the underlying type? 
    // customError.msg = `That ${Object.keys(err.keyValue)} already exists`;
    customError.msg = 'Duplicate field'
    customError.statusCode = 400;
  }
  res.status(customError.statusCode).json({ msg: customError.msg });
}

export default handleError;