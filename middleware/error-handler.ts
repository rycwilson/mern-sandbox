import { StatusCodes } from 'http-status-codes';

const errorHandler = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Sorry, there was an error'
  }
  if (err.name === 'ValidationError') {
    console.log(Object.values(err.errors).map(item => item.message).join(','))
    customError.msg = Object.values(err.errors).map(item => item.message).join(', ');
    customError.statusCode = 400;
  }
  if (err.name === 'CastError') {
    customError.msg = `No record found with id: ${err.value}`;
    customError.statusCode = 404;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `That ${Object.keys(err.keyValue)} already exists`;
    customError.statusCode = 400;
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  res.status(customError.statusCode).json({ msg: customError.msg });
}

export default errorHandler;