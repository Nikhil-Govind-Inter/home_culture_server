import { models } from "../../shared/models/index.js";
import { commonBuilder } from "../utils/commonBuild.js";
import HowItWorksBuildSection from "./howItWorks.build.js";

const { HowItWorksCms, JourneyStep, Testimonial, WorkshopMaterial, Banner } =
  models;

export default class HowItWorksService {
  static async get() {
    const [banner, cms, steps, testimonials, materials] = await Promise.all([
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
        where: { page_slug: "how-it-works" },
      }),
      HowItWorksCms.findOne({
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        order: [["id", "DESC"]],
      }),
      JourneyStep.findAll({
        ...commonBuilder.activeList(["title", "description"]),
      }),
      Testimonial.findAll({
        ...commonBuilder.activeList(["name", "designation", "quotes", "media_path"]),
      }),
      WorkshopMaterial.findAll({
        ...commonBuilder.activeList(["title", "media_path"]),
      }),
    ]);

    return {
      bannerSection: commonBuilder.banner(banner),
      visionSection: HowItWorksBuildSection.buildVisionSection(cms),
      workshopSection: HowItWorksBuildSection.buildWorkshopSection(
        cms,
        materials,
      ),
      artisansSection: HowItWorksBuildSection.buildArtisansSection(
        cms,
        testimonials,
      ),
      journeySection: HowItWorksBuildSection.buildJourneySection(cms, steps),
      ctaSection: HowItWorksBuildSection.buildCtaSection(cms),
    };
  }
}
