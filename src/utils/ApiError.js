class ApiError extends Error {
  constructor(
    res,
    statusCode,
    message = 'Something went wrong',
    errors = [],
    stack = ''
  ) {
    super(message);
    this.res = res;
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  send(res) {
    return res.status(this.statusCode).json({
      statusCode: this.statusCode,
      message: this.message,
      errors: this.errors,
      stack: process.env.NODE_ENV === 'development' ? this.stack : undefined,
    });
  }
}

const errorResponse = (
  res,
  statusCode,
  message = 'Something went wrong',
  errors = [],
  stack = ''
) => {
  const err = new ApiError(res, statusCode, message, errors, stack);
  return err.send(res);
};

export default errorResponse;
