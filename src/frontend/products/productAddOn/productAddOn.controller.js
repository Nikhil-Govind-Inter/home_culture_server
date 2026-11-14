import ProductAddOnService from "./productAddOn.service.js";

export default class ProductAddOnController {
  static async get(req, res, next) {
    try {
      const record = await ProductAddOnService.get(req);
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
