import { models } from "../../shared/models/index.js";
import homeBuildSection from "./home.build.js";

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

const activeList = {
  where: { status: true },
  order: [["sort_order", "ASC"]],
};

export default class homeService {
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
      HomeCms.findOne({}),
      HomeBanner.findAll(activeList),
      HomeSimplyChoose.findAll(activeList),
      HomeHighlight.findAll(activeList),
      HomeExperience.findAll(activeList),
      HomeBrokenProcess.findAll(activeList),
      HomeProcessStep.findAll(activeList),
      Product.findAll(activeList),
      ProductStyle.findAll(activeList),
      Blog.findAll({
        ...activeList,
        where: { status: true, show_in_home: true },
      }),
    ]);

    return {
      bannerSection: homeBuildSection.buildBannerSection(banners),
      challengesSection: homeBuildSection.buildChallengesSection(cms, brokenProcesses),
      ownershipSection: homeBuildSection.buildOwnershipSection(cms, simplyChoose),
      welcomeSection: homeBuildSection.buildWelcomeSection(cms, highlights),
      processSection: homeBuildSection.buildProcessSection(processSteps),
      productSection: homeBuildSection.buildProductSection(products),
      styleSection: homeBuildSection.buildStyleSection(cms, styles),
      experienceSection: homeBuildSection.buildExperienceSection(cms, experiences),
      journeySection: homeBuildSection.buildJourneySection(cms),
      insightsSection: homeBuildSection.buildInsightsSection(cms, blogs),
      ctaSection: homeBuildSection.buildCtaSection(cms),
    };
  }
}
