import homeService from './home.service.js';

export default class homeController {
  static async get(req, res, next) {
    try {
      const record = await homeService.get()

      res.status(200).json({ success: true, statusCode: 200, message: 'Success', data: record});
    } catch (err) {
      next(err);
    }
  }
}
