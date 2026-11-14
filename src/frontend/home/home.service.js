import { models } from "../../shared/models/index.js";
import { commonBuilder } from "../utils/commonBuild.js";
import HomeBuildSection from "./home.build.js";

const {
  HomeCms,
  HomeBanner,
  HomeHighlight,
  HomeExperience,
  HomeBrokenProcess,
  HomeProcessStep,
  HomeSimplyChoose,
  Product,
  ProductStyle,
  Blog,
} = models;

export default class HomeService {
  // The home page is a single record plus several list sections.
  static async get() {
    const [
      cms,
      banners,
      simplyChoose,
      highlights,
      experiences,
      brokenProcesses,
      processSteps,
      products,
      styles,
      blogs,
    ] = await Promise.all([
      HomeCms.findOne({
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
      }),
      HomeBanner.findAll({
        ...commonBuilder.activeList({
          exclude: [
            "id",
            "sort_order",
            "status",
            "createdAt",
            "updatedAt",
            "deleted_at",
          ],
        }),
      }),
      HomeSimplyChoose.findAll({
        ...commonBuilder.activeList(["title"]),
      }),
      HomeHighlight.findAll({
        ...commonBuilder.activeList(["title", "media_path", "media_alt"]),
      }),
      HomeExperience.findAll({
        ...commonBuilder.activeList([
          "title",
          "media_type",
          "media_path",
          "thumbnail",
          "media_alt",
        ]),
      }),
      HomeBrokenProcess.findAll({
        ...commonBuilder.activeList([
          "title",
          "media_type",
          "media_path",
          "thumbnail",
          "media_alt",
        ]),
      }),
      HomeProcessStep.findAll({
        ...commonBuilder.activeList(["title", "description"]),
      }),
      Product.findAll({
        ...commonBuilder.activeList([
          "title",
          "excerpt",
          "slug",
          "media_path",
          "media_alt",
        ]),
        where: { status: true, show_in_home: true },
      }),
      ProductStyle.findAll({
        ...commonBuilder.activeList(["title", "description", "media_path"]),
        where: { status: true, show_in_home: true },
      }),
      Blog.findAll({
        ...commonBuilder.activeList([
          "title",
          "slug",
          "excerpt",
          "media_path",
          "media_alt",
        ]),
        where: { status: true, show_in_home: true },
      }),
    ]);

    return {
      bannerSection: HomeBuildSection.buildBannerSection(banners),
      challengesSection: HomeBuildSection.buildChallengesSection(
        cms,
        brokenProcesses,
      ),
      ownershipSection: HomeBuildSection.buildOwnershipSection(
        cms,
        simplyChoose,
      ),
      welcomeSection: HomeBuildSection.buildWelcomeSection(cms, highlights),
      processSection: HomeBuildSection.buildProcessSection(processSteps),
      productSection: HomeBuildSection.buildProductSection(products),
      styleSection: HomeBuildSection.buildStyleSection(cms, styles),
      experienceSection: HomeBuildSection.buildExperienceSection(
        cms,
        experiences,
      ),
      journeySection: HomeBuildSection.buildJourneySection(cms),
      insightsSection: HomeBuildSection.buildInsightsSection(cms, blogs),
      ctaSection: HomeBuildSection.buildCtaSection(cms),
    };
  }
}
