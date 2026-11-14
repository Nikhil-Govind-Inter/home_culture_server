import ProductTrimService from "./productTrim.service.js";

export default class ProductTrimController {
  static async get(req, res, next) {
    try {
      const record = await ProductTrimService.get(req);
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
