export default class ApiResponse {
  static success(res, data = null, message = 'Success', statusCode = 200, meta) {
    const body = { success: true, statusCode, message, data };
    if (meta) body.meta = meta;
    return res.status(statusCode).json(body);
  }

  static created(res, data, message = 'Created') {
    return ApiResponse.success(res, data, message, 201);
  }
}
