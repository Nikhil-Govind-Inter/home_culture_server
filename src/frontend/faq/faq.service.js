import { models } from "../../shared/models/index.js";
import { commonBuilder } from "../utils/commonBuild.js";
import FaqBuildSection from "./faq.build.js";

const { Faq, FaqCategory, FaqCms, Banner } = models;

export default class FaqService {
  static async get() {
    const [cms, categories] = await Promise.all([
      FaqCms.findOne({ order: [["id", "DESC"]] }),
      FaqCategory.findAll({
        where: { status: true },
        attributes: ["id", "title", "slug"],
        include: [
          {
            model: Faq,
            as: "faqs",
            where: { status: true },
            required: false,
            attributes: ["id", "question", "answer", "sort_order"],
          },
        ],
        order: [
          ["sort_order", "ASC"],
          ["id", "ASC"],
          [{ model: Faq, as: "faqs" }, "sort_order", "ASC"],
          [{ model: Faq, as: "faqs" }, "id", "ASC"],
        ],
      }),
    ]);

    return {
      introSection: FaqBuildSection.buildIntroSection(cms),
      sidebarSection: FaqBuildSection.buildSidebarSection(cms),
      categories: FaqBuildSection.buildCategories(categories),
      ctaSection: FaqBuildSection.buildCtaSection(cms),
    };
  }
}
