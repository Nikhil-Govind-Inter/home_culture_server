import { models } from "../../shared/models/index.js";
import aboutBuildSection from "./about.build.js";

const { AboutCms, AboutHighlight, Banner } = models;

export default class aboutService {
  static async get() {
    const [banner, cms, highlights] = await Promise.all([
      Banner.findOne({ where: { page_slug: "about" } }),
      AboutCms.findOne({}),
      AboutHighlight.findAll({
        where: { status: true },
        order: [["sort_order", "ASC"]],
      }),
    ]);

    return {
      bannerSection: aboutBuildSection.buildBannerSection(banner),
      storySection: aboutBuildSection.buildMediaSection(cms, "story_section_"),
      philosophySection: aboutBuildSection.buildPhilosophySection(cms),
      highlightSection: aboutBuildSection.buildHighlightSection(cms, highlights),
      promiseSection: aboutBuildSection.buildPromiseSection(cms),
      ctaSection: aboutBuildSection.buildCtaSection(cms),
    };
  }
}
