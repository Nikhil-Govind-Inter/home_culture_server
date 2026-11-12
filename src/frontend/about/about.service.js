import { models } from "../../shared/models/index.js";
import { commonBuilder } from "../utils/commonBuild.js";
import AboutBuildSection from "./about.build.js";

const { AboutCms, AboutHighlight, Banner } = models;

export default class AboutService {
  static async get() {
    const [banner, cms, highlights] = await Promise.all([
      Banner.findOne({ where: { page_slug: "about" } }),
      AboutCms.findOne({}),
      AboutHighlight.findAll(commonBuilder.activeList()),
    ]);

    return {
      bannerSection: commonBuilder.banner(banner),
      storySection: commonBuilder.mediaSection(cms, "story_section_"),
      philosophySection: AboutBuildSection.buildPhilosophySection(cms),
      highlightSection: AboutBuildSection.buildHighlightSection(cms, highlights),
      promiseSection: AboutBuildSection.buildPromiseSection(cms),
      ctaSection: AboutBuildSection.buildCtaSection(cms),
    };
  }
}
