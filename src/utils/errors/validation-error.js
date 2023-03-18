const { StatusCodes } = require("http-status-codes");

class ValidationError extends Error {
  constructor(error) {
    super();
    let description = [];
    error.errors.forEach((err) => {
      description.push(err.message);
    });
    this.name = "ValidationError";
    this.message = "Unable to validate the data sent in the request body";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = ValidationError;
