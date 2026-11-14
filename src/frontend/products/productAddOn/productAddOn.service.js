import { models } from "../../../shared/models/index.js";
import ApiError from "../../../shared/utils/ApiError.js";
import ProductAddOnBuildSection from "./productAddOn.build.js";

const { Product, ProductCms, ProductAddOn } = models;

export default class ProductAddOnService {
  static async get(req) {
    const { slug } = req.params;

    const [cms, product] = await Promise.all([
      ProductCms.findOne({
        attributes: [
          "add_ons_section_title",
          "add_ons_section_description",
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
            model: ProductAddOn,
            as: "add_ons",
            required: false,
            where: { status: true },
            attributes: ["media_path", "slug", "title", "subtitle"],
            through: { attributes: [] },
          },
        ],
        order: [[{ model: ProductAddOn, as: "add_ons" }, "sort_order", "ASC"]],
      }),
    ]);

    if (!product) throw ApiError.notFound("Product not found");

    return {
      cmsSection: ProductAddOnBuildSection.buildContentSection(cms),
      addOnsSection: ProductAddOnBuildSection.buildSection(product.add_ons),
      ctaSection: ProductAddOnBuildSection.buildCtaSection(cms),
    };
  }
}
