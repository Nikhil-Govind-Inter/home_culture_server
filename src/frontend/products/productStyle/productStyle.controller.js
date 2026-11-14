import ProductStyleService from "./productStyle.service.js";

export default class ProductStyleController {
  static async get(req, res, next) {
    try {
      const record = await ProductStyleService.get(req);
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
