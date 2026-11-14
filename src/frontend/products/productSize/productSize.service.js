import { models } from "../../../shared/models/index.js";
import ApiError from "../../../shared/utils/ApiError.js";
import ProductSizeBuildSection from "./productSize.build.js";

const { Product, ProductCms, ProductSize } = models;

export default class ProductSizeService {
  static async get(req) {
    const { slug } = req.params;

    const [cms, product] = await Promise.all([
      ProductCms.findOne({
        attributes: [
          "size_section_title",
          "size_section_description",
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
            model: ProductSize,
            as: "sizes",
            required: false,
            where: { status: true },
            attributes: ["media_path", "slug", "title", "size"],
            through: { attributes: [] },
          },
        ],
        order: [[{ model: ProductSize, as: "sizes" }, "sort_order", "ASC"]],
      }),
    ]);

    if (!product) throw ApiError.notFound("Product not found");

    return {
      cmsSection: ProductSizeBuildSection.buildContentSection(cms),
      sizeSection: ProductSizeBuildSection.buildSection(product.sizes),
      ctaSection: ProductSizeBuildSection.buildCtaSection(cms),
    };
  }
}
