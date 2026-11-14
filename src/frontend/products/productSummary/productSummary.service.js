import { models } from "../../../shared/models/index.js";
import ApiError from "../../../shared/utils/ApiError.js";
import ProductSummaryBuildSection from "./productSummary.build.js";

const { Product, ProductCms } = models;

export default class ProductSummaryService {
  static async get(req) {
    const { slug } = req.params;

    const product = await Product.findOne({
      where: { slug, status: true },
      attributes: ["id"],
    });
    if (!product) throw ApiError.notFound("Product not found");

    const cms = await ProductCms.findOne({
      attributes: [
        "summary_section_title",
        "summary_section_description",
        "summary_section_media_path",
        "summary_section_media_alt",
        "summary_section_media_header_title",
        "summary_section_media_title",
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
    });

    return {
      summarySection: ProductSummaryBuildSection.buildSummarySection(cms),
      ctaSection: ProductSummaryBuildSection.buildCtaSection(cms),
    };
  }
}
