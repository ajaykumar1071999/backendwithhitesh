class ApiResponse {
  constructor(statusCode, message = 'Success', data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
const response = (statusCode, message = 'Success', data) => {
  return new ApiResponse(statusCode, message, data);
};
export default response;
