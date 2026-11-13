import { mediaUtils } from "./mediaUtils.js";

// Builders shared by the page section builders (home, about, ...).
export class commonBuilder {
  // status / header_title / title / description columns share a section prefix.
  static heading(record, prefix) {
    return {
      status: record?.[`${prefix}status`],
      header_title: record?.[`${prefix}header_title`],
      title: record?.[`${prefix}title`],
      description: record?.[`${prefix}description`],
    };
  }

  // A section is only returned when its status is true; otherwise null.
  // The status flag itself is not part of the response.
  static whenActive(section) {
    if (section?.status !== true) return null;
    const { status, ...rest } = section;
    return rest;
  }

  // Page banner (`banners` row): header_title / title / description + media.
  static banner(banner) {
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

  // Heading + a single image stored as `${prefix}media_path` / `${prefix}media_alt`.
  static mediaSection(record, prefix) {
    return commonBuilder.whenActive({
      ...commonBuilder.heading(record, prefix),
      media: mediaUtils.singleMediaWithoutType(
        record?.[`${prefix}media_path`],
        record?.[`${prefix}media_alt`],
      ),
    });
  }

  // Query options for list sections: active rows in admin sort order.
  static activeList() {
    return { where: { status: true }, order: [["sort_order", "ASC"]] };
  }
}
