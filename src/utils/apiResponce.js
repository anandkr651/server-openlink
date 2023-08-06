class apiResponse {
  constructor(message, statusCode, data) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export { apiResponse };
