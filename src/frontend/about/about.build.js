import { mediaUtils } from "../utils/mediaUtils.js";
import { commonBuilder } from "../utils/commonBuild.js";

export default class aboutBuildSection {
  static buildBannerSection(banner) {
    return commonBuilder.whenActive({
      status: banner?.status,
      header_title: banner?.header_title,
      title: banner?.title,
      description: banner?.description,
      media: mediaUtils.mediaWithTypes(
        banner?.media_type,
        banner?.banner_desktop_media_path,
        banner?.banner_mobile_media_path,
        banner?.banner_thumbnail_media_path,
        banner?.banner_media_alt,
      ),
    });
  }

  static buildMediaSection(cms, prefix) {
    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, prefix),
      media: mediaUtils.singleMedia(
        cms?.[`${prefix}media_path`],
        cms?.[`${prefix}media_alt`],
      ),
    });
  }

  static buildPhilosophySection(cms) {
    const section = aboutBuildSection.buildMediaSection(cms, "philosophy_section_");
    if (!section) return null;
    return {
      ...section,
      vision: aboutBuildSection.buildPoint(cms, "vision_"),
      mission: aboutBuildSection.buildPoint(cms, "mission_"),
    };
  }

  static buildPoint(cms, prefix) {
    return {
      title: cms?.[`${prefix}title`],
      description: cms?.[`${prefix}description`],
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
      items: highlights.map((item) => ({
        title: item.title,
        description: item.description,
        icon: mediaUtils.url(item.icon_media_path),
      })),
    });
  }

  static buildPromiseSection(cms) {
    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "promise_section_"),
      left_media: mediaUtils.singleMedia(
        cms?.promise_section_left_media_path,
        cms?.promise_section_left_media_alt,
      ),
      right_media: mediaUtils.singleMedia(
        cms?.promise_section_right_media_path,
        cms?.promise_section_right_media_alt,
      ),
    });
  }

  static buildCtaSection(cms) {
    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "cta_section_"),
      media: commonBuilder.desktopMobileMedia(
        cms,
        "cta_section_desktop_media_path",
        "cta_section_mobile_media_path",
        "cta_section_media_alt",
      ),
      button: mediaUtils.buttonFromRecord(cms, "cta_section_button_"),
    });
  }
}
