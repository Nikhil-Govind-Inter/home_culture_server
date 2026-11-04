import ApiError from '../../shared/utils/ApiError.js';
import { models } from '../../shared/models/index.js';

const { Page } = models;

export default class PageService {
  static findAll() {
    return Page.findAll({ where: { status: 'published' }, order: [['createdAt', 'DESC']] });
  }

  static async findOne(slug) {
    const record = await Page.findOne({ where: { slug, status: 'published' } });
    if (!record) throw ApiError.notFound('Page not found');
    return record;
  }
}
