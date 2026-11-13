import PrivacyPolicyService from "./privacyPolicy.service.js";

export default class PrivacyPolicyController {
  static async get(req, res, next) {
    try {
      const record = await PrivacyPolicyService.get();
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
