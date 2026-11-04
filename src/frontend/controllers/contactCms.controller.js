import ContactCmsService from '../services/contactCms.service.js';
import ApiResponse from '../../shared/utils/ApiResponse.js';
import ContentView from '../views/content.view.js';

export default class ContactCmsController {
  static async get(req, res, next) {
    try {
      const record = await ContactCmsService.getLatest();
      ApiResponse.success(res, ContentView.one(record));
    } catch (err) {
      next(err);
    }
  }
}
