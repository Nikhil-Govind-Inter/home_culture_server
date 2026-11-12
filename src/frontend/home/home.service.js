import { models } from "../../shared/models/index.js";
import { mediaUtils } from "../utils/mediaUtils.js";

const {
  HomeCms,
  HomeBanner,
  HomeHighlight,
  HomeExperience,
  HomeBrokenProcess,
  HomeProcessStep,
  HomeSimplyChoose,
  Product,
  ProductStyle,
  Blog,
} = models;

const activeList = {
  where: { status: true },
  order: [["sort_order", "ASC"]],
};

export default class homeService {
  // The home page is a single record plus several list sections.
  static async get() {
    const [
      cms,
      banners,
      simplyChoose,
      highlights,
      experiences,
      brokenProcesses,
      processSteps,
      products,
      styles,
      blogs,
    ] = await Promise.all([
      HomeCms.findOne({}),
      HomeBanner.findAll(activeList),
      HomeSimplyChoose.findAll(activeList),
      HomeHighlight.findAll(activeList),
      HomeExperience.findAll(activeList),
      HomeBrokenProcess.findAll(activeList),
      HomeProcessStep.findAll(activeList),
      Product.findAll(activeList),
      ProductStyle.findAll(activeList),
      Blog.findAll({
        ...activeList,
        where: { status: true, show_in_home: true },
      }),
    ]);

    return {
      bannerSection: this.buildBannerSection(banners),
      challengesSection: this.buildChallengesSection(cms, brokenProcesses),
      ownershipSection: this.buildOwnershipSection(cms, simplyChoose),
      welcomeSection: this.buildWelcomeSection(cms, highlights),
      processSection: this.buildProcessSection(processSteps),
      productSection: this.buildProductSection(products),
      styleSection: this.buildStyleSection(cms, styles),
      experienceSection: this.buildExperienceSection(cms, experiences),
      journeySection: this.buildJourneySection(cms),
      insightsSection: this.buildInsightsSection(cms, blogs),
      ctaSection: this.buildCtaSection(cms),
    };
  }

  // status / header_title / title / description columns share a section prefix.
  static heading(cms, prefix) {
    return {
      status: cms?.[`${prefix}status`],
      header_title: cms?.[`${prefix}header_title`],
      title: cms?.[`${prefix}title`],
      description: cms?.[`${prefix}description`],
    };
  }

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
    return {
      ...this.heading(cms, "challenges_section_"),
      right_title: cms?.challenges_section_right_title,
      button: mediaUtils.buttonFromRecord(cms, "challenges_section_button_"),
      items: brokenProcesses.map((item) => ({
        title: item.title,
        media: mediaUtils.mediaFromRecord(item),
      })),
    };
  }

  static buildOwnershipSection(cms, simplyChoose) {
    return {
      ...this.heading(cms, "ownership_"),
      media: mediaUtils.mediaFromRecord(
        cms,
        "ownership_",
        "ownership_mobile_media_alt",
      ),
      choose_title: cms?.ownership_choose_title,
      choose_items: simplyChoose.map((item) => item.title),
      button: mediaUtils.buttonFromRecord(cms, "ownership_button_"),
    };
  }

  static buildWelcomeSection(cms, highlights) {
    return {
      ...this.heading(cms, "welcome_section_"),
      items: highlights.map((item) => ({
        title: item.title,
        media: mediaUtils.singleMedia(item.media_path, item.media_alt),
      })),
    };
  }

  static buildStyleSection(cms, styles) {
    const { status, title } = this.heading(cms, "style_section_");
    return {
      status,
      title,
      items: styles.map((item) => ({
        title: item.title,
        description: item.description,
        media: mediaUtils.singleMedia(item.media_path, item.media_alt),
      })),
    };
  }

  static buildProcessSection(process) {
    return process.map((item) => ({
        title: item.title,
        description: item.description,
      }))
  }

  static buildProductSection(products) {
    return products.map((item) => ({
      title: item.title,
      excerpt: item.excerpt,
      slug: item.slug,
      media: mediaUtils.singleMedia(item.media_path, item.media_alt),
    }));
  }

  static buildExperienceSection(cms, experiences) {
    const { status, header_title, title } = this.heading(
      cms,
      "experience_section_",
    );
    return {
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
        media: mediaUtils.mediaWithTypes(
          item.media_type,
          item.media_path,
          null,
          item.thumbnail,
          item.media_alt,
        ),
      })),
    };
  }

  static buildJourneySection(cms) {
    return {
      ...this.heading(cms, "journey_section_"),
      media: mediaUtils.mediaFromRecord(cms, "journey_section_"),
      button: mediaUtils.buttonFromRecord(cms, "journey_section_button_"),
    };
  }

  static buildInsightsSection(cms, blogs) {
    return {
      ...this.heading(cms, "insights_"),
      button: mediaUtils.buttonFromRecord(cms, "insights_button_"),
      items: blogs.map((item) => ({
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        media: mediaUtils.singleMedia(
          item.thumbnail_media_path,
          item.thumbnail_media_alt,
        ),
      })),
    };
  }

  static buildCtaSection(cms) {
    return {
      ...this.heading(cms, "cta_"),
      media: {
        desktop: mediaUtils.url(cms?.cta_desktop_media_path),
        mobile: mediaUtils.url(cms?.cta_mobile_media_path),
        alt: cms?.cta_media_alt,
      },
      button_one: mediaUtils.buttonFromRecord(cms, "cta_button_one_"),
      button_two: mediaUtils.buttonFromRecord(cms, "cta_button_two_"),
    };
  }
}
