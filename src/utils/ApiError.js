class ApiError extends Error {
  constructor(
    statusCode,
    message = 'Somthing went wrong',
    errors = [],
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.stack = stack;
  }
}

export default ApiError;
