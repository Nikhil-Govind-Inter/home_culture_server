import ContactCmsService from '../services/contactCms.service.js';
import ContentView from '../views/content.view.js';

export default class ContactCmsController {
  static async get(req, res, next) {
    try {
      const record = await ContactCmsService.getLatest();
      res.status(200).json({ success: true, statusCode: 200, message: 'Success', data: ContentView.one(record) });
    } catch (err) {
      next(err);
    }
  }
}
