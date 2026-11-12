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

const activeList = commonBuilder.activeList();

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
      bannerSection: HomeBuildSection.buildBannerSection(banners),
      challengesSection: HomeBuildSection.buildChallengesSection(cms, brokenProcesses),
      ownershipSection: HomeBuildSection.buildOwnershipSection(cms, simplyChoose),
      welcomeSection: HomeBuildSection.buildWelcomeSection(cms, highlights),
      processSection: HomeBuildSection.buildProcessSection(processSteps),
      productSection: HomeBuildSection.buildProductSection(products),
      styleSection: HomeBuildSection.buildStyleSection(cms, styles),
      experienceSection: HomeBuildSection.buildExperienceSection(cms, experiences),
      journeySection: HomeBuildSection.buildJourneySection(cms),
      insightsSection: HomeBuildSection.buildInsightsSection(cms, blogs),
      ctaSection: HomeBuildSection.buildCtaSection(cms),
    };
  }
}
