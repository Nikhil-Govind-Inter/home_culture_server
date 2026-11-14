import { mediaUtils } from "./mediaUtils.js";

// Builders shared by the page section builders (home, about, ...).
export class commonBuilder {
  // header_title is the trimmed value, or "" when it is missing / empty.
  static headerTitle(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  // status / header_title / title / description columns share a section prefix.
  static heading(record, prefix) {
    return {
      status: record?.[`${prefix}status`],
      header_title: commonBuilder.headerTitle(record?.[`${prefix}header_title`]),
      title: record?.[`${prefix}title`] ?? "",
      description: record?.[`${prefix}description`] ?? "",
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
      header_title: commonBuilder.headerTitle(banner?.header_title),
      title: banner?.title ?? "",
      description: banner?.description ?? "",
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
      // Excluded / empty path -> no media at all (not an empty `{ path: "" }`).
      media: record?.[`${prefix}media_path`]
        ? mediaUtils.singleMediaWithoutType(
            record[`${prefix}media_path`],
            record?.[`${prefix}media_alt`],
          )
        : null,
    });
  }

  // Query options for list sections: active rows in admin sort order.
  static activeList(attributes) {
    return {
      where: { status: true },
      order: [
        ["sort_order", "ASC"],
        ["id", "ASC"],
      ],
      attributes,
    };
  }
}
