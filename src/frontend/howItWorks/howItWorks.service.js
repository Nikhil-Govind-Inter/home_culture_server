import { models } from "../../shared/models/index.js";
import howItWorksBuildSection from "./howItWorks.build.js";

const { HowItWorksCms, JourneyStep, Testimonial, WorkshopMaterial, Banner } = models;

const activeList = (Model) =>
  Model.findAll({
    where: { status: true },
    order: [["sort_order", "ASC"]],
  });

export default class howItWorksService {
  static async get() {
    const [banner, cms, steps, testimonials, materials] = await Promise.all([
      Banner.findOne({ where: { page_slug: "how-it-works" } }),
      HowItWorksCms.findOne({ order: [["id", "DESC"]] }),
      activeList(JourneyStep),
      activeList(Testimonial),
      activeList(WorkshopMaterial),
    ]);

    return {
      bannerSection: howItWorksBuildSection.buildBannerSection(banner),
      visionSection: howItWorksBuildSection.buildVisionSection(cms),
      workshopSection: howItWorksBuildSection.buildWorkshopSection(cms, materials),
      artisansSection: howItWorksBuildSection.buildArtisansSection(cms, testimonials),
      journeySection: howItWorksBuildSection.buildJourneySection(cms, steps),
      ctaSection: howItWorksBuildSection.buildCtaSection(cms),
    };
  }
}
