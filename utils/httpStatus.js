export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const HttpMessage = {
  [HttpStatus.OK]: "Success",
  [HttpStatus.CREATED]: "Resource created successfully",
  [HttpStatus.BAD_REQUEST]: "Invalid request",
  [HttpStatus.UNAUTHORIZED]: "Unauthorized access",
  [HttpStatus.NOT_FOUND]: "Resource not found",
  [HttpStatus.CONFLICT]: "Conflict occurred",
  [HttpStatus.INTERNAL_SERVER_ERROR]: "Internal server error",
};
