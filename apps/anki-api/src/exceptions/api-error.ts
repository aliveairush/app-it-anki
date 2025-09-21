export class ApiError extends Error {
  status;
  errors;

  constructor(status: number, message: string, errors?) {
    super(message);
    this.status = status;
    this.message = message;
  }

  static UnauthorizedError() {
    return new ApiError(401,'User unauthorized');
  }

  static BadRequestError(message: string, errors = []) {
    return new ApiError(400, message, errors);
  }
}
