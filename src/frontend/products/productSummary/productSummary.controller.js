import ProductSummaryService from "./productSummary.service.js";

export default class ProductSummaryController {
  static async get(req, res, next) {
    try {
      const record = await ProductSummaryService.get(req);
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
