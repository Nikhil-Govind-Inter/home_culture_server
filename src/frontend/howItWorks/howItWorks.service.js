import { models } from "../../shared/models/index.js";
import { commonBuilder } from "../utils/commonBuild.js";
import HowItWorksBuildSection from "./howItWorks.build.js";

const { HowItWorksCms, JourneyStep, Testimonial, WorkshopMaterial, Banner } = models;

const activeList = (Model) => Model.findAll(commonBuilder.activeList());

export default class HowItWorksService {
  static async get() {
    const [banner, cms, steps, testimonials, materials] = await Promise.all([
      Banner.findOne({ where: { page_slug: "how-it-works" } }),
      HowItWorksCms.findOne({ order: [["id", "DESC"]] }),
      activeList(JourneyStep),
      activeList(Testimonial),
      activeList(WorkshopMaterial),
    ]);

    return {
      bannerSection: commonBuilder.banner(banner),
      visionSection: HowItWorksBuildSection.buildVisionSection(cms),
      workshopSection: HowItWorksBuildSection.buildWorkshopSection(cms, materials),
      artisansSection: HowItWorksBuildSection.buildArtisansSection(cms, testimonials),
      journeySection: HowItWorksBuildSection.buildJourneySection(cms, steps),
      ctaSection: HowItWorksBuildSection.buildCtaSection(cms),
    };
  }
}
