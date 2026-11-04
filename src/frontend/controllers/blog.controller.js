import BlogService from '../services/blog.service.js';
import ApiResponse from '../../shared/utils/ApiResponse.js';
import ContentView from '../views/content.view.js';

export default class BlogController {
  static async list(req, res, next) {
    try {
      const records = await BlogService.findAll();
      ApiResponse.success(res, ContentView.many(records));
    } catch (err) {
      next(err);
    }
  }

  static async getOne(req, res, next) {
    try {
      const record = await BlogService.findOne(req.params.key);
      ApiResponse.success(res, ContentView.one(record));
    } catch (err) {
      next(err);
    }
  }
}
