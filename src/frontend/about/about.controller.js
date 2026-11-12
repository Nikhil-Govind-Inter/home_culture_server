import AboutService from "./about.service.js";

export default class AboutController {
  static async get(req, res, next) {
    try {
      const record = await AboutService.get();

      res.status(200).json({ success: true, statusCode: 200, message: "Success", data: record });
    } catch (err) {
      next(err);
    }
  }
}
