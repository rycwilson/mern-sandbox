import CustomApiError from './custom-error.ts';
import { StatusCodes } from 'http-status-codes';

class NotFoundError extends CustomApiError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError