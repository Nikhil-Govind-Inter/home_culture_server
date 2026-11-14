import { mediaUtils } from "../utils/mediaUtils.js";
import { commonBuilder } from "../utils/commonBuild.js";

export default class HowItWorksBuildSection {
  static buildVisionSection(cms) {
    return commonBuilder.mediaSection(cms, "vision_section_");
  }

  static buildWorkshopSection(cms, materials) {
    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "workshop_section_"),
      media: mediaUtils.singleMediaWithoutType(
        cms?.workshop_section_media_path,
        cms?.workshop_section_media_alt,
      ),
      items: (materials ?? []).map((item) => ({
        title: item.title ?? "",
        media: mediaUtils.singleMediaWithoutType(item.media_path, item.title),
      })),
    });
  }

  static buildArtisansSection(cms, testimonials) {
    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "artisans_section_"),
      items: (testimonials ?? []).map((item) => ({
        name: item.name ?? "",
        designation: item.designation ?? "",
        quotes: item.quotes ?? "",
        image: mediaUtils.singleMediaWithoutType(item.media_path, item.name),
      })),
    });
  }

  static buildJourneySection(cms, steps) {
    return commonBuilder.whenActive({
      status: cms?.journey_section_status,
      title: cms?.journey_section_title ?? "",
      media: mediaUtils.singleMediaWithoutType(
        cms?.journey_section_media_path,
        cms?.journey_section_media_alt,
      ),
      items: (steps ?? []).map((item) => ({
        title: item.title ?? "",
        description: item.description ?? "",
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
      button: mediaUtils.buttonFromRecord(cms, "cta_button_"),
    });
  }
}
