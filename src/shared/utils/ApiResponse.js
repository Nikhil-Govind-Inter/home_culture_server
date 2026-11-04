export default class ApiResponse {
  static success(res, data = null, message = 'Success', statusCode = 200, pagination) {
    const body = { success: true, statusCode, message, data };
    if (pagination) body.pagination = pagination;
    return res.status(statusCode).json(body);
  }

  static created(res, data, message = 'Created') {
    return ApiResponse.success(res, data, message, 201);
  }
}
