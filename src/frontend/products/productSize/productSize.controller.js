import ProductSizeService from "./productSize.service.js";

export default class ProductSizeController {
  static async get(req, res, next) {
    try {
      const record = await ProductSizeService.get(req);
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
