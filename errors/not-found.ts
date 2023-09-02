import ApiError from './custom-error.js'
import { StatusCodes } from 'http-status-codes'

class NotFoundError extends ApiError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.NOT_FOUND
  }
}

export default NotFoundError