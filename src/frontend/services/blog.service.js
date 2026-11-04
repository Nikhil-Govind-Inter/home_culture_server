import ApiError from '../../shared/utils/ApiError.js';
import { models } from '../../shared/models/index.js';

const { Blog } = models;

export default class BlogService {
  static findAll() {
    return Blog.findAll({ where: { status: 'published' }, order: [['createdAt', 'DESC']] });
  }

  static async findOne(slug) {
    const record = await Blog.findOne({ where: { slug, status: 'published' } });
    if (!record) throw ApiError.notFound('Blog not found');
    return record;
  }
}
