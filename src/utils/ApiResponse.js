class ApiResponse {
  constructor(res, statusCode, message = 'Success', data) {
    this.res = res;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  send(res) {
    return res.status(this.statusCode).json({
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
    });
  }
}
const response = (res, statusCode, message = 'Success', data) => {
  const response = new ApiResponse(res, statusCode, message, data);
  return response.send(res);
};
export default response;
