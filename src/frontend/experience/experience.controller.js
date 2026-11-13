import ExperienceService from "./experience.service.js";

export default class ExperienceController {
  static async get(req, res, next) {
    try {
      const record = await ExperienceService.get();

      res.status(200).json({ success: true, statusCode: 200, message: "Success", data: record });
    } catch (err) {
      next(err);
    }
  }
}
