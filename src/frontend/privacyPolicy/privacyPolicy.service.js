import { models } from "../../shared/models/index.js";
import { commonBuilder } from "../utils/commonBuild.js";
import PrivacyPolicyBuildSection from "./privacyPolicy.build.js";

const { PrivacyPolicy, Banner } = models;

export default class PrivacyPolicyService {
  static async get() {
    const [banner, record] = await Promise.all([
      Banner.findOne({ where: { page_slug: "privacy-policy" } }),
      PrivacyPolicy.findOne({ order: [["id", "DESC"]] }),
    ]);

    return {
      bannerSection: commonBuilder.banner(banner),
      contentSection: PrivacyPolicyBuildSection.buildContentSection(record),
      ctaSection: PrivacyPolicyBuildSection.buildCtaSection(record),
    };
  }
}
