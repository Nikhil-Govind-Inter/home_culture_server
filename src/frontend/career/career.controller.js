import CareerService from "./career.service.js";

export default class CareerController {
  static async get(req, res, next) {
    try {
      const record = await CareerService.get();

      res.status(200).json({ success: true, statusCode: 200, message: "Success", data: record });
    } catch (err) {
      next(err);
    }
  }
}
