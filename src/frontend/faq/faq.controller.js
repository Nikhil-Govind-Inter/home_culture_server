import FaqService from "./faq.service.js";

export default class FaqController {
  static async get(req, res, next) {
    try {
      const record = await FaqService.get();
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Success",
        data: record,
      });
    } catch (err) {
      next(err);
    }
  }
}
