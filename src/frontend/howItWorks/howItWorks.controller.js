import HowItWorksService from "./howItWorks.service.js";

export default class HowItWorksController {
  static async get(req, res, next) {
    try {
      const record = await HowItWorksService.get();

      res.status(200).json({ success: true, statusCode: 200, message: "Success", data: record });
    } catch (err) {
      next(err);
    }
  }
}
