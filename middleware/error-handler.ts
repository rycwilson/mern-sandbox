import type { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import { MongoError } from 'mongodb';
import { StatusCodes } from 'http-status-codes';
import { CustomApiError } from '../errors/index.js';

type ErrorType = Error | MongooseError | MongoError | CustomApiError;

const errorHandler = (err: ErrorType, req: Request, res: Response, next: NextFunction) => {
  const customError = {
    statusCode: (err instanceof CustomApiError && err.statusCode) || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: (err instanceof CustomApiError && err.message) || 'Sorry, there was an error'
  }
  if (err instanceof MongooseError.ValidationError) {
    console.log(Object.values(err.errors).map(item => item.message).join(','))
    customError.msg = Object.values(err.errors).map(item => item.message).join(', ');
    customError.statusCode = 400;
  }
  if (err instanceof MongooseError.CastError) {
    customError.msg = `No record found with id: ${err.value}`;
    customError.statusCode = 404;
  }
  if (err instanceof MongoError && err.code === 11000) {
    // customError.msg = `That ${Object.keys(err.keyValue)} already exists`;
    customError.msg = 'Duplicate field'
    customError.statusCode = 400;
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  res.status(customError.statusCode).json({ msg: customError.msg });
}

export default errorHandler;