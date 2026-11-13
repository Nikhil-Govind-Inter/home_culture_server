import { mediaUtils } from "../utils/mediaUtils.js";

export default class LayoutBuildSection {
  static buildHeaderSection(settings) {
    if (!settings) return null;

    return {
      logo: mediaUtils.singleMediaWithoutType(settings.header_logo, settings.header_logo_alt),
      button: mediaUtils.button(settings.header_button_text, settings.header_button_link),
    };
  }

  static buildFooterSection(settings, socialMedia = [], products = []) {
    if (!settings) return null;

    return {
      logo: mediaUtils.singleMediaWithoutType(settings.footer_logo, settings.footer_logo_alt),
      title: settings.footer_title,
      description: settings.description,
      address: settings.address,
      email: settings.email,
      phone: settings.phone,
      products: products.map((item) => ({
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        icon: mediaUtils.singleMediaWithoutType(item.icon_media_path, item.icon_media_alt),
      })),
      social_media: socialMedia.map((item) => ({
        link: item.link,
        icon: mediaUtils.singleMediaWithoutType(item.icon_media_path, item.media_alt),
      })),
    };
  }
}
