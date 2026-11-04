import { models } from '../../shared/models/index.js';

const { SocialMedia } = models;

export default class SocialMediaService {
  static findAll() {
    return SocialMedia.findAll({
      where: { status: true },
      order: [
        ['sort_order', 'ASC'],
        ['id', 'ASC'],
      ],
    });
  }
}
