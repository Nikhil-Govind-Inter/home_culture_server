import ApiError from '../../shared/utils/ApiError.js';
import { models } from '../../shared/models/index.js';

const { Banner } = models;

export default class BannerService {
  static findAll() {
    return Banner.findAll({ where: { status: 'published' }, order: [['sortOrder', 'ASC']] });
  }

  static async findOne(id) {
    const record = await Banner.findOne({ where: { id, status: 'published' } });
    if (!record) throw ApiError.notFound('Banner not found');
    return record;
  }
}
