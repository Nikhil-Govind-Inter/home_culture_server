import { mediaUtils } from "../utils/mediaUtils.js";
import { commonBuilder } from "../utils/commonBuild.js";

export default class AboutBuildSection {
  static buildPhilosophySection(cms) {
    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "philosophy_section_"),
      media: mediaUtils.singleMediaWithoutType(
        cms?.philosophy_section_media_path,
        cms?.philosophy_section_media_alt,
      ),
      vision: AboutBuildSection.buildPoint(cms, "vision_"),
      mission: AboutBuildSection.buildPoint(cms, "mission_"),
    });
  }

  static buildPoint(cms, prefix) {
    return {
      title: cms?.[`${prefix}title`] ?? "",
      description: cms?.[`${prefix}description`] ?? "",
      icon: mediaUtils.url(cms?.[`${prefix}icon`]),
    };
  }

  static buildHighlightSection(cms, highlights) {
    const { status, header_title, title } = commonBuilder.heading(
      cms,
      "highlight_section_",
    );
    return commonBuilder.whenActive({
      status,
      header_title,
      title,
      items: (highlights ?? []).map((item) => ({
        title: item.title ?? "",
        description: item.description ?? "",
        icon: mediaUtils.url(item.icon_media_path),
      })),
    });
  }

  static buildPromiseSection(cms) {
    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "promise_section_"),
      left_media: mediaUtils.singleMediaWithoutType(
        cms?.promise_section_left_media_path,
        cms?.promise_section_left_media_alt,
      ),
      right_media: mediaUtils.singleMediaWithoutType(
        cms?.promise_section_right_media_path,
        cms?.promise_section_right_media_alt,
      ),
    });
  }

  static buildCtaSection(cms) {
    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "cta_section_"),
      media: mediaUtils.mediaWithoutTypes(
        cms?.cta_section_desktop_media_path,
        cms?.cta_section_mobile_media_path,
        cms?.cta_section_media_alt,
      ),
      button: mediaUtils.buttonFromRecord(cms, "cta_section_button_"),
    });
  }
}
