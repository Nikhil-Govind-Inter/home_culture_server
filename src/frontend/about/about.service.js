import { models } from "../../shared/models/index.js";
import { commonBuilder } from "../utils/commonBuild.js";
import AboutBuildSection from "./about.build.js";

const { AboutCms, AboutHighlight, Banner } = models;

export default class AboutService {
  static async get() {
    const [banner, cms, highlights] = await Promise.all([
      Banner.findOne({
        attributes: {
          exclude: [
            "id",
            "page",
            "page_slug",
            "createdAt",
            "updatedAt",
            "deleted_at",
          ],
        },
        where: { page_slug: "about" },
      }),
      AboutCms.findOne({
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
      }),
      AboutHighlight.findAll({
        ...commonBuilder.activeList(["title", "description", "icon_media_path"]),
      }),
    ]);

    return {
      bannerSection: commonBuilder.banner(banner),
      storySection: commonBuilder.mediaSection(cms, "story_section_"),
      philosophySection: AboutBuildSection.buildPhilosophySection(cms),
      highlightSection: AboutBuildSection.buildHighlightSection(
        cms,
        highlights,
      ),
      promiseSection: AboutBuildSection.buildPromiseSection(cms),
      ctaSection: AboutBuildSection.buildCtaSection(cms),
    };
  }
}
