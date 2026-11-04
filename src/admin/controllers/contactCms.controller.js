import { validationResult } from 'express-validator';
import ApiResponse from '../../shared/utils/ApiResponse.js';
import sendValidationError from '../../shared/utils/sendValidationError.js';
import { validateFields } from '../validations/contactCms.validation.js';
import { models } from '../../shared/models/index.js';

const { ContactCms } = models;

// Contact CMS is a single record: it can only be fetched and updated.
export default class ContactCmsController {
  static async get(req, res, next) {
    try {
      const record = await ContactCms.findOne();
      ApiResponse.success(res, record);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      await Promise.all(validateFields.map((v) => v.run(req)));
      const errors = validationResult(req);
      if (!errors.isEmpty()) return sendValidationError(res, errors);

      let record = await ContactCms.findOne();
      if (!record) {
        record = await ContactCms.create(req.body);
        return ApiResponse.created(res, record, 'Contact CMS created');
      }
      await record.update(req.body);
      ApiResponse.success(res, record, 'Contact CMS updated');
    } catch (error) {
      next(error);
    }
  }
}
