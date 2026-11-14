import { models } from "../../shared/models/index.js";
import { commonBuilder } from "../utils/commonBuild.js";
import LayoutBuildSection from "./layout.build.js";

const { SiteSettings, SocialMedia, Product } = models;

export default class LayoutService {
  static async get() {
    const [settings, socialMedia, products] = await Promise.all([
      SiteSettings.findOne({ attributes: { exclude: ["id", "createdAt", "updatedAt", "deleted_at"] }, order: [["id", "DESC"]] }),
      SocialMedia.findAll({ ...commonBuilder.activeList(), attributes: ["link", "icon_media_path", "media_alt"] }),
      Product.findAll({
        ...commonBuilder.activeList(["slug", "title", "excerpt", "icon_media_path", "icon_media_alt"]),
      }),
    ]);

    return {
      headerSection: LayoutBuildSection.buildHeaderSection(settings),
      footerSection: LayoutBuildSection.buildFooterSection(settings, socialMedia, products),
    };
  }
}
