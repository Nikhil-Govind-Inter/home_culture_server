import config from "../../shared/config/index.js";

export class mediaUtils {
  // Turns a stored path like `/uploads/home/a.png` into a full URL.
  static url(path) {
    if (!path || /^https?:\/\//i.test(path)) return path;
    return `${config.mediaBaseUrl}/${String(path).replace(/^\/+/, "")}`;
  }

  static mediaWithTypes(type, desktop, mobile, thumbnail, alt) {
    // Video: `desktop` is the video file, shown with its thumbnail.
    if (type === "video") {
      return {
        type,
        video: mediaUtils.url(desktop) ?? "",
        thumbnail: mediaUtils.url(thumbnail) ?? "",
        alt,
      };
    }

    return {
      type,
      desktop: mediaUtils.url(desktop) ?? "",
      mobile: mediaUtils.url(mobile) ?? "",
      alt: alt ?? "",
    };
  }

  // Builds a media object from a record whose columns share a prefix:
  // `${prefix}media_type`, `${prefix}desktop_media_path`,
  // `${prefix}mobile_media_path`, `${prefix}thumbnail`, `${prefix}media_alt`.
  static mediaFromRecord(record, prefix = "", altKey = `${prefix}media_alt`) {
    return mediaUtils.mediaWithTypes(
      record?.[`${prefix}media_type`],
      record?.[`${prefix}desktop_media_path`],
      record?.[`${prefix}mobile_media_path`],
      record?.[`${prefix}thumbnail`],
      record?.[altKey],
    );
  }

  // Builds a button from `${prefix}text` and `${prefix}link` columns.
  static buttonFromRecord(record, prefix) {
    return mediaUtils.button(
      record?.[`${prefix}text`],
      record?.[`${prefix}link`],
    );
  }

  static button(label, link) {
    return {
      label,
      link,
    };
  }

  static singleMedia(path, alt) {
    return {
      path: mediaUtils.url(path),
      alt,
    };
  }
}
