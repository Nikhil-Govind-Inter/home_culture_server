import { models } from "../../../shared/models/index.js";
import ApiError from "../../../shared/utils/ApiError.js";
import ProductStyleBuildSection from "./productStyle.build.js";

const { Product, ProductCms, ProductStyle } = models;

export default class ProductStyleService {
  static async get(req) {
    const { slug } = req.params;

    const [cms, productStyles] = await Promise.all([
      ProductCms.findOne({
        attributes: [
          "style_section_title",
          "style_section_description",
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
            model: ProductStyle,
            as: "styles",
            required: false,
            where: { status: true },
            attributes: ["media_path", "slug", "title", "description"],
            through: {
              attributes: [],
            },
          },
        ],
        order: [[{ model: ProductStyle, as: "styles" }, "sort_order", "ASC"]],
      }),
    ]);

    if (!productStyles) throw ApiError.notFound("Product not found");

    const cmsSection = ProductStyleBuildSection.buildContentSection(cms);
    const styleSection = ProductStyleBuildSection.buildProductStyleSection(productStyles.styles)
    const ctaSection = ProductStyleBuildSection.buildCtaSection(cms);

    return {
      cmsSection,
      styleSection,
      ctaSection,
    };
  }
}
