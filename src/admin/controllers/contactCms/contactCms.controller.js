import { validationResult } from 'express-validator';
import sendValidationError from '../../../shared/utils/sendValidationError.js';
import { validationRequestPost } from '../../validations/contactCms.validation.js';
import { models } from '../../../shared/models/index.js';

const { ContactCms } = models;

const FIELDS = [
  'form_section_status',
  'form_section_title',
  'form_section_description',
  'google_map_link',
  'form_title',
  'form_description',
  'faq_section_status',
  'faq_section_title',
  'faq_section_description',
  'faq_section_button_text',
  'faq_section_button_link',
];

const pickFields = (body) =>
  Object.fromEntries(FIELDS.filter((key) => body[key] !== undefined).map((key) => [key, body[key]]));

// Contact CMS is a single record: it can only be fetched and updated.
export default class ContactCmsController {
  static async get(req, res, next) {
    try {
      const record = await ContactCms.findOne();
      res.status(200).json({ success: true, statusCode: 200, message: 'Success', data: record });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await Promise.all(validationRequestPost.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      const data = pickFields(req.body);
      let record = await ContactCms.findOne();
      if (!record) {
        record = await ContactCms.create(data);
        return res.status(201).json({ success: true, statusCode: 201, message: 'Contact CMS created', data: record });
      }
      await record.update(data);
      res.status(200).json({ success: true, statusCode: 200, message: 'Contact CMS updated', data: record });
    } catch (error) {
      next(error);
    }
  }
}
