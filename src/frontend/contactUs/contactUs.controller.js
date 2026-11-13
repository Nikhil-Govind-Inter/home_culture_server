import ContactUsService from "./contactUs.service.js";

export default class ContactUsController {
  static async get(req, res, next) {
    try {
      const record = await ContactUsService.get();

      res.status(200).json({ success: true, statusCode: 200, message: "Success", data: record });
    } catch (err) {
      next(err);
    }
  }
}
