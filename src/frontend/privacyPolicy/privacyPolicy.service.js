import { models } from "../../shared/models/index.js";
import { commonBuilder } from "../utils/commonBuild.js";
import PrivacyPolicyBuildSection from "./privacyPolicy.build.js";

const { PrivacyPolicy, Banner } = models;

export default class PrivacyPolicyService {
  static async get() {
    const [banner, record] = await Promise.all([
      Banner.findOne({ attributes: { exclude: ["id", "page", "page_slug", "createdAt", "updatedAt", "deleted_at"] }, where: { page_slug: "privacy-policy" } }),
      PrivacyPolicy.findOne({ attributes: { exclude: ["id", "createdAt", "updatedAt"] }, order: [["id", "DESC"]] }),
    ]);

    return {
      bannerSection: commonBuilder.banner(banner),
      contentSection: PrivacyPolicyBuildSection.buildContentSection(record),
      ctaSection: PrivacyPolicyBuildSection.buildCtaSection(record),
    };
  }
}
