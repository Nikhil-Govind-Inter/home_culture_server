import { commonBuilder } from "../utils/commonBuild.js";
import { mediaUtils } from "../utils/mediaUtils.js";

// The contact page does not use header titles.
const withoutHeaderTitle = (section) => {
  if (!section) return section;
  const { header_title, ...rest } = section;
  return rest;
};

export default class ContactUsBuildSection {
  static banner(banner) {
    return withoutHeaderTitle(commonBuilder.banner(banner));
  }

  static buildFormSection(cms, socialMedia = []) {
    if (!cms) return null;

    return withoutHeaderTitle(commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "form_section_"),
      from: {
        title: cms.form_title ?? "",
        description: cms.form_description ?? "",
      },
      google_map_link: cms.google_map_link ?? "",
      social_media: (socialMedia ?? []).map((item) => ({
        link: item.link ?? "",
        icon: mediaUtils.singleMediaWithoutType(
          item.icon_media_path,
          item.media_alt,
        ),
      })),
    }));
  }

  static buildFaqSection(cms) {
    if (!cms) return null;
    
    return withoutHeaderTitle(commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "faq_section_"),
      button: mediaUtils.buttonFromRecord(cms, "faq_section_button_"),
    }));
  }
}
