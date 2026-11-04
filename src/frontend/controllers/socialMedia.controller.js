import SocialMediaService from '../services/socialMedia.service.js';
import ApiResponse from '../../shared/utils/ApiResponse.js';
import ContentView from '../views/content.view.js';

export default class SocialMediaController {
  static async list(req, res, next) {
    try {
      const records = await SocialMediaService.findAll();
      ApiResponse.success(res, ContentView.many(records));
    } catch (err) {
      next(err);
    }
  }
}
