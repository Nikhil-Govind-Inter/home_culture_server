import { mediaUtils } from "../utils/mediaUtils.js";
import { commonBuilder } from "../utils/commonBuild.js";

export default class HowItWorksBuildSection {
  static buildVisionSection(cms) {
    return commonBuilder.mediaSection(cms, "vision_section_");
  }

  static buildWorkshopSection(cms, materials) {
    const section = commonBuilder.mediaSection(cms, "workshop_section_");
    if (!section) return null;
    return {
      ...section,
      items: materials.map((item) => ({
        title: item.title,
        media: mediaUtils.singleMedia(item.media_path, item.title),
      })),
    };
  }

  static buildArtisansSection(cms, testimonials) {
    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "artisans_section_"),
      items: testimonials.map((item) => ({
        name: item.name,
        designation: item.designation,
        quotes: item.quotes,
        image: mediaUtils.url(item.media_path),
      })),
    });
  }

  static buildJourneySection(cms, steps) {
    return commonBuilder.whenActive({
      status: cms?.journey_section_status,
      title: cms?.journey_section_title,
      media: mediaUtils.singleMedia(
        cms?.journey_section_media_path,
        cms?.journey_section_media_alt,
      ),
      items: steps.map((item) => ({
        title: item.title,
        description: item.description,
      })),
    });
  }

  static buildCtaSection(cms) {
    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "cta_"),
      media: commonBuilder.desktopMobileMedia(
        cms,
        "cta_desktop_media_path",
        "cta_mobile_media_path",
        "cta_media_alt",
      ),
      button: mediaUtils.buttonFromRecord(cms, "cta_button_"),
    });
  }
}
