import { mediaUtils } from "../utils/mediaUtils.js";
import { commonBuilder } from "../utils/commonBuild.js";

export default class HomeBuildSection {
  static buildBannerSection(banners) {
    return banners.map((item) => ({
      header_title: item.header_title,
      title: item.title,
      description: item.description,
      media: mediaUtils.mediaFromRecord(item),
      button_one: mediaUtils.buttonFromRecord(item, "button_one_"),
      button_two: mediaUtils.buttonFromRecord(item, "button_two_"),
    }));
  }

  static buildChallengesSection(cms, brokenProcesses) {
    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "challenges_section_"),
      right_title: cms?.challenges_section_right_title,
      button: mediaUtils.buttonFromRecord(cms, "challenges_section_button_"),
      items: brokenProcesses.map((item) => ({
        title: item.title,
        media: mediaUtils.singleMediaWithType(
          item?.media_type,
          item?.media_path,
          item?.thumbnail,
          item?.media_alt,
        ),
      })),
    });
  }

  static buildOwnershipSection(cms, simplyChoose) {
    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "ownership_"),
      media: mediaUtils.mediaFromRecord(
        cms,
        "ownership_",
        "ownership_mobile_media_alt",
      ),
      choose_title: cms?.ownership_choose_title,
      choose_items: simplyChoose.map((item) => item.title),
      button: mediaUtils.buttonFromRecord(cms, "ownership_button_"),
    });
  }

  static buildWelcomeSection(cms, highlights) {
    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "welcome_section_"),
      items: highlights.map((item) => ({
        title: item.title,
        media: mediaUtils.singleMediaWithoutType(
          item.media_path,
          item.media_alt,
        ),
      })),
    });
  }

  static buildStyleSection(cms, styles) {
    const { status, title } = commonBuilder.heading(cms, "style_section_");
    return commonBuilder.whenActive({
      status,
      title,
      items: styles.map((item) => ({
        title: item.title,
        description: item.description,
        media: mediaUtils.singleMediaWithoutType(item.media_path, item.title),
      })),
    });
  }

  static buildProcessSection(process) {
    return process.map((item) => ({
      title: item.title,
      description: item.description,
    }));
  }

  static buildProductSection(products) {
    return products.map((item) => ({
      title: item.title,
      excerpt: item.excerpt,
      slug: item.slug,
      media: mediaUtils.singleMediaWithoutType(item.media_path, item.media_alt),
    }));
  }

  static buildExperienceSection(cms, experiences) {
    const { status, header_title, title } = commonBuilder.heading(
      cms,
      "experience_section_",
    );
    return commonBuilder.whenActive({
      status,
      header_title,
      title,
      modal: {
        title: cms?.modal_title,
        description: cms?.modal_description,
        button_one: mediaUtils.buttonFromRecord(cms, "button_one_"),
        button_two_text: cms?.button_two_text,
        phone: cms?.phone,
        whatsapp_number: cms?.whatsapp_number,
      },
      titles: experiences.map((item) => item.title),
      items: experiences.map((item) => ({
        title: item.title,
        media: mediaUtils.singleMediaWithType(
          item.media_type,
          item.media_path,
          item.thumbnail,
          item.media_alt,
        ),
      })),
    });
  }

  static buildJourneySection(cms) {
    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "journey_section_"),
      media: mediaUtils.mediaFromRecord(cms, "journey_section_"),
      button: mediaUtils.buttonFromRecord(cms, "journey_section_button_"),
    });
  }

  static buildInsightsSection(cms, blogs) {
    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "insights_"),
      button: mediaUtils.buttonFromRecord(cms, "insights_button_"),
      items: blogs.map((item) => ({
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        media: mediaUtils.singleMediaWithoutType(
          item.media_path,
          item.media_alt,
        ),
      })),
    });
  }

  static buildCtaSection(cms) {
    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "cta_"),
      media: mediaUtils.mediaWithoutTypes(
        cms?.cta_desktop_media_path,
        cms?.cta_mobile_media_path,
        cms?.cta_media_alt,
      ),
      button_one: mediaUtils.buttonFromRecord(cms, "cta_button_one_"),
      button_two: mediaUtils.buttonFromRecord(cms, "cta_button_two_"),
    });
  }
}
