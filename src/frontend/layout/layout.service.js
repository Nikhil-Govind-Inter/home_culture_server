import { models } from "../../shared/models/index.js";
import { commonBuilder } from "../utils/commonBuild.js";
import LayoutBuildSection from "./layout.build.js";

const { SiteSettings, SocialMedia, Product } = models;

export default class LayoutService {
  static async get() {
    const [settings, socialMedia, products] = await Promise.all([
      SiteSettings.findOne({ order: [["id", "DESC"]] }),
      SocialMedia.findAll(commonBuilder.activeList()),
      Product.findAll({
        ...commonBuilder.activeList(),
        attributes: ["id", "slug", "title", "excerpt", "icon_media_path", "icon_media_alt"],
      }),
    ]);

    return {
      headerSection: LayoutBuildSection.buildHeaderSection(settings),
      footerSection: LayoutBuildSection.buildFooterSection(settings, socialMedia, products),
    };
  }
}
