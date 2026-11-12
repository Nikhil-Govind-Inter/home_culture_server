import aboutService from './about.service.js';

export default class aboutController {
  static async get(req, res, next) {
    try {
      const record = await aboutService.get();

      res.status(200).json({ success: true, statusCode: 200, message: 'Success', data: record });
    } catch (err) {
      next(err);
    }
  }
}
