import { commonBuilder } from "../../utils/commonBuild.js";
import { mediaUtils } from "../../utils/mediaUtils.js";

export default class ProductSizeBuildSection {
  static buildContentSection(cms) {
    if (!cms) return null;
    return {
      title: cms.size_section_title ?? "",
      description: cms.size_section_description ?? "",
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

  static buildSection(list) {
    return (list || []).map((item) => ({
      title: item.title ?? "",
      size: item.size ?? "",
      slug: item.slug ?? "",
      media: mediaUtils.singleMediaWithoutType(item.media_path, item.title),
    }));
  }
}
