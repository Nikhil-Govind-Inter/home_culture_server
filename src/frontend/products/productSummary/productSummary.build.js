import { commonBuilder } from "../../utils/commonBuild.js";
import { mediaUtils } from "../../utils/mediaUtils.js";

export default class ProductSummaryBuildSection {
  static buildSummarySection(cms) {
    if (!cms) return null;
    return {
      title: cms.summary_section_title,
      description: cms.summary_section_description,
      media_header_title: cms.summary_section_media_header_title,
      media_title: cms.summary_section_media_title,
      media: {
        ...mediaUtils.singleMediaWithoutType(
          cms.summary_section_media_path,
          cms.summary_section_media_alt,
        ),
      },
    };
  }

  static buildCtaSection(record) {
    if (!record) return null;

    return commonBuilder.whenActive({
      ...commonBuilder.heading(record, "cta_section_"),
      media: mediaUtils.mediaWithoutTypes(
        record.cta_section_desktop_media_path,
        record.cta_section_mobile_media_path,
        record.cta_section_media_alt,
      ),
      button: mediaUtils.buttonFromRecord(record, "cta_section_button_"),
    });
  }
}
