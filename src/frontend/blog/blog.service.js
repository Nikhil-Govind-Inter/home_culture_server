import { Op } from "sequelize";
import { models } from "../../shared/models/index.js";
import ApiError from "../../shared/utils/ApiError.js";
import paginate from "../../shared/utils/paginate.js";
import { commonBuilder } from "../utils/commonBuild.js";
import BlogBuildSection from "./blog.build.js";

const { Blog, BlogCategory, BlogCms, Banner } = models;

const PAGE_SIZE = 6;

const LIST_ATTRIBUTES = ["id", "title", "slug", "excerpt", "thumbnail_media_path", "thumbnail_media_alt"];
const LIST_INCLUDE = [
  {
    model: BlogCategory,
    as: "category",
    attributes: ["id", "title", "slug"],
    where: { status: true },
    required: true,
  },
];
const LIST_ORDER = [
  ["sort_order", "ASC"],
  ["id", "DESC"],
];

export default class BlogService {
  static async get() {
    const [banner, cms, featured] = await Promise.all([
      Banner.findOne({ where: { page_slug: "blogs" } }),
      BlogCms.findOne({ order: [["id", "DESC"]] }),
      Blog.findAll({
        where: { status: true, is_featured: true },
        attributes: LIST_ATTRIBUTES,
        include: LIST_INCLUDE,
        order: LIST_ORDER,
      }),
    ]);

    return {
      bannerSection: commonBuilder.banner(banner),
      featuredBlogs: BlogBuildSection.buildBlogs(featured),
      ctaSection: BlogBuildSection.buildCtaSection(cms),
    };
  }

  static async getList({ page, limit } = {}) {
    const { rows, pagination } = await paginate(Blog, {
      page,
      limit: limit || PAGE_SIZE,
      where: { status: true },
      attributes: LIST_ATTRIBUTES,
      include: LIST_INCLUDE,
      order: LIST_ORDER,
    });

    return { blogs: BlogBuildSection.buildBlogs(rows), pagination };
  }

  static async getDetail(slug) {
    const [blog, cms] = await Promise.all([
      Blog.findOne({ where: { slug: String(slug), status: true }, include: LIST_INCLUDE }),
      BlogCms.findOne({ order: [["id", "DESC"]] }),
    ]);

    if (!blog) throw new ApiError(404, "Blog not found");

    const neighbour = (where, order) =>
      Blog.findOne({
        where: { status: true, ...where },
        attributes: ["id", "title", "slug"],
        include: LIST_INCLUDE,
        order,
      });

    const [prev, next, related] = await Promise.all([
      // Order: sort_order ASC, createdAt DESC (id DESC only as a tie-breaker).
      neighbour(
        {
          [Op.or]: [
            { sort_order: { [Op.lt]: blog.sort_order } },
            { sort_order: blog.sort_order, createdAt: { [Op.gt]: blog.createdAt } },
            { sort_order: blog.sort_order, createdAt: blog.createdAt, id: { [Op.gt]: blog.id } },
          ],
        },
        [
          ["sort_order", "DESC"],
          ["createdAt", "ASC"],
          ["id", "ASC"],
        ],
      ),
      neighbour(
        {
          [Op.or]: [
            { sort_order: { [Op.gt]: blog.sort_order } },
            { sort_order: blog.sort_order, createdAt: { [Op.lt]: blog.createdAt } },
            { sort_order: blog.sort_order, createdAt: blog.createdAt, id: { [Op.lt]: blog.id } },
          ],
        },
        [
          ["sort_order", "ASC"],
          ["createdAt", "DESC"],
          ["id", "DESC"],
        ],
      ),
      Blog.findAll({
        where: { status: true, category_id: blog.category_id, id: { [Op.ne]: blog.id } },
        attributes: [...LIST_ATTRIBUTES, "reading_time"],
        include: LIST_INCLUDE,
        order: LIST_ORDER,
      }),
    ]);

    return {
      blogSection: BlogBuildSection.buildBlogSection(blog, prev, next),
      exploreSection: BlogBuildSection.buildExploreSection(cms, related),
      ctaSection: BlogBuildSection.buildCtaSection(cms),
    };
  }
}
