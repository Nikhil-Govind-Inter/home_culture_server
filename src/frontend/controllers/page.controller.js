import PageService from '../services/page.service.js';
import ApiResponse from '../../shared/utils/ApiResponse.js';
import ContentView from '../views/content.view.js';

export default class PageController {
  static async list(req, res, next) {
    try {
      const records = await PageService.findAll();
      ApiResponse.success(res, ContentView.many(records));
    } catch (err) {
      next(err);
    }
  }

  static async getOne(req, res, next) {
    try {
      const record = await PageService.findOne(req.params.key);
      ApiResponse.success(res, ContentView.one(record));
    } catch (err) {
      next(err);
    }
  }
}
