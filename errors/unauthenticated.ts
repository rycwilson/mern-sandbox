import CustomApiError from './custom-error.js';
import { StatusCodes } from 'http-status-codes';

class UnauthenticatedError extends CustomApiError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
