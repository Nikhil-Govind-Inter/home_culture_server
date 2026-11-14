import { commonBuilder } from "../utils/commonBuild.js";
import { mediaUtils } from "../utils/mediaUtils.js";

export default class FaqBuildSection {
  static buildIntroSection(cms) {
    if (!cms) return null;

    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "section_one_"),
      media: mediaUtils.singleMediaWithoutType(cms.section_one_media_path, cms.section_one_media_alt),
    });
  }

  static buildSidebarSection(cms) {
    if (!cms) return null;

    return commonBuilder.whenActive({
      status: cms.status,
      title: cms.sidebar_title ?? "",
      quotes: cms.sidebar_quotes ?? "",
    });
  }

  static buildCtaSection(cms) {
    if (!cms) return null;

    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "section_two_"),
      button: mediaUtils.buttonFromRecord(cms, "section_two_button_"),
    });
  }

  static buildCategories(categories = []) {
    return categories
      .filter((category) => category.faqs?.length)
      .map((category) => ({
        title: category.title ?? "",
        slug: category.slug ?? "",
        faqs: (category.faqs ?? []).map((faq) => ({
          question: faq.question ?? "",
          answer: faq.answer ?? "",
        })),
      }));
  }
}
