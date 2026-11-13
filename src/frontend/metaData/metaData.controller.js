import MetaDataService from "./metaData.service.js";

export default class MetaDataController {
  static async get(req, res, next) {
    try {
      const record = await MetaDataService.get(req.params.slug);
      res.status(200).json({ success: true, statusCode: 200, message: "Success", data: record });
    } catch (err) { next(err); }
  }
}
