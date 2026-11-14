import { mediaUtils } from "../utils/mediaUtils.js";
import { commonBuilder } from "../utils/commonBuild.js";

export default class ExperienceBuildSection {
  static buildIntroSection(cms) {
    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "intro_section_"),
      media: mediaUtils.singleMediaWithoutType(
        cms?.intro_section_media_path,
        cms?.intro_section_media_alt,
      ),
      quote: cms?.intro_section_quote ?? "",
    });
  }

  static buildJourneySection(cms, items) {
    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "journey_section_"),
      items: (items ?? []).map((item) => ({
        title: item.title ?? "",
        description: item.description ?? "",
      })),
    });
  }

  static buildLifestyleSection(cms, items, highlights) {
    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "lifestyle_"),
      items: (items ?? []).map((item) => ({
        title: item.title ?? "",
        subtitle: item.subtitle ?? "",
        media: mediaUtils.singleMediaWithoutType(
          item.media_path,
          item.media_alt,
        ),
      })),
      highlights: (highlights ?? []).map((item) => ({
        title: item.title ?? "",
        description: item.description ?? "",
      })),
    });
  }

  static buildVisitSection(cms, locations) {
    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "visit_section_"),
      media: mediaUtils.singleMediaWithType(
        cms?.visit_section_media_type,
        cms?.visit_section_media_path,
        cms?.visit_section_thumbnail,
        cms?.visit_section_media_alt,
      ),
      items: (locations ?? []).map((item) => ({
        location: item.location ?? "",
        location_link: item.location_link ?? "",
      })),
    });
  }

  static buildFeatureSection(cms, features) {
    const { status, header_title, title } = commonBuilder.heading(
      cms,
      "feature_section_",
    );
    return commonBuilder.whenActive({
      status,
      header_title,
      title,
      items: (features ?? []).map((item) => ({
        title: item.title ?? "",
        media: mediaUtils.singleMediaWithoutType(item.media_path, item.title),
      })),
    });
  }

  static buildBookingProcessSection(cms, items) {
    const { status, header_title, title } = commonBuilder.heading(
      cms,
      "booking_process_",
    );
    return commonBuilder.whenActive({
      status,
      header_title,
      title,
      items: (items ?? []).map((item) => ({
        title: item.title ?? "",
        description: item.description ?? "",
      })),
    });
  }

  static buildFaqSection(cms, items) {
    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "faq_section_"),
      items: (items ?? []).map((item) => ({
        question: item.question ?? "",
        answer: item.answer ?? "",
      })),
    });
  }

  static buildEnquirySection(cms) {
    return commonBuilder.whenActive(
      commonBuilder.heading(cms, "enquiry_section_"),
    );
  }
}
