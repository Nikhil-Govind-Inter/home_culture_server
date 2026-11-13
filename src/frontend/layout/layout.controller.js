import LayoutService from "./layout.service.js";

export default class LayoutController {
  static async get(req, res, next) {
    try {
      const record = await LayoutService.get();
      res.status(200).json({ success: true, statusCode: 200, message: "Success", data: record });
    } catch (err) { next(err); }
  }
}
