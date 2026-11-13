import BlogService from "./blog.service.js";

export default class BlogController {
  static async get(req, res, next) {
    try {
      const record = await BlogService.get();

      res.status(200).json({ success: true, statusCode: 200, message: "Success", data: record });
    } catch (err) {
      next(err);
    }
  }

  static async list(req, res, next) {
    try {
      const { blogs, pagination } = await BlogService.getList(req.query);

      res.status(200).json({ success: true, statusCode: 200, message: "Success", data: blogs, pagination });
    } catch (err) {
      next(err);
    }
  }

  static async detail(req, res, next) {
    try {
      const record = await BlogService.getDetail(req.params.slug);

      res.status(200).json({ success: true, statusCode: 200, message: "Success", data: record });
    } catch (err) {
      next(err);
    }
  }
}
