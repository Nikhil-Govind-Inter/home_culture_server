import HomeService from "./home.service.js";

export default class HomeController {
  static async get(req, res, next) {
    try {
      const record = await HomeService.get()

      res.status(200).json({ success: true, statusCode: 200, message: "Success", data: record});
    } catch (err) {
      next(err);
    }
  }
}
