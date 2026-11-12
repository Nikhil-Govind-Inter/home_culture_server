import howItWorksService from './howItWorks.service.js';

export default class howItWorksController {
  static async get(req, res, next) {
    try {
      const record = await howItWorksService.get();

      res.status(200).json({ success: true, statusCode: 200, message: 'Success', data: record });
    } catch (err) {
      next(err);
    }
  }
}
