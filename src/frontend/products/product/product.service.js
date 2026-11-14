import { models } from "../../../shared/models/index.js";
import { commonBuilder } from "../../utils/commonBuild.js";
import ProductBuildSection from "./product.build.js";

const { Product, ProductCms } = models;

export default class ProductService {
  static async get() {
    const [cms, products] = await Promise.all([
      ProductCms.findOne({
        attributes: [
          "product_section_title",
          "product_section_description",
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
      Product.findAll({
        ...commonBuilder.activeList([
          "title",
          "excerpt",
          "slug",
          "media_path",
          "media_alt",
          "header_title",
        ]),
      }),
    ]);

    const cmsSection = ProductBuildSection.buildContentSection(cms)
    const productSection = ProductBuildSection.buildProductSection(products)
    const ctaSection = ProductBuildSection.buildCtaSection(cms)

    return {
      cmsSection,
      productSection,
      ctaSection
    };
  }
}
