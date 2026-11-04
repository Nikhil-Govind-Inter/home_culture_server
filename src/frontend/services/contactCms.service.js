import ApiError from '../../shared/utils/ApiError.js';
import { models } from '../../shared/models/index.js';

const { ContactCms } = models;

export default class ContactCmsService {
  // The contact page is a single record: return the most recent one.
  static async getLatest() {
    const record = await ContactCms.findOne({ order: [['createdAt', 'DESC']] });
    if (!record) throw ApiError.notFound('Contact CMS not found');
    return record;
  }
}
