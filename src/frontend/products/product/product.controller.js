import ProductService from "./product.service.js";

export default class ProductController {
  static async get(req, res, next) {
    try {
      const record = await ProductService.get();
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
