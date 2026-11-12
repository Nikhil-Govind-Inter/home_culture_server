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

  // Desktop / mobile image pair, e.g. a CTA background.
  static desktopMobileMedia(record, desktopKey, mobileKey, altKey) {
    return {
      desktop: mediaUtils.url(record?.[desktopKey]),
      mobile: mediaUtils.url(record?.[mobileKey]),
      alt: record?.[altKey],
    };
  }
}
