import { models } from "../../../shared/models/index.js";
import ApiError from "../../../shared/utils/ApiError.js";
import ProductTrimBuildSection from "./productTrim.build.js";

const { Product, ProductCms, ProductTrim } = models;

export default class ProductTrimService {
  static async get(req) {
    const { slug } = req.params;

    const [cms, product] = await Promise.all([
      ProductCms.findOne({
        attributes: [
          "trim_section_title",
          "trim_section_description",
          "cta_section_status",
          "cta_section_desktop_media_path",
          "cta_section_mobile_media_path",
          "cta_section_media_alt",
          "cta_section_header_title",
          "cta_section_title",
          "cta_section_description",
          "cta_section_button_text",
          "cta_section_button_link",
        ],
      }),
      Product.findOne({
        where: { slug, status: true },
        attributes: ["id"],
        include: [
          {
            model: ProductTrim,
            as: "trims",
            required: false,
            where: { status: true },
            attributes: ["media_path", "slug", "title", "description"],
            through: { attributes: [] },
          },
        ],
        order: [[{ model: ProductTrim, as: "trims" }, "sort_order", "ASC"]],
      }),
    ]);

    if (!product) throw ApiError.notFound("Product not found");

    return {
      cmsSection: ProductTrimBuildSection.buildContentSection(cms),
      trimSection: ProductTrimBuildSection.buildSection(product.trims),
      ctaSection: ProductTrimBuildSection.buildCtaSection(cms),
    };
  }
}
