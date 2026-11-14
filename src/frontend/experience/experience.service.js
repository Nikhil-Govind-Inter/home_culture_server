import { models } from "../../shared/models/index.js";
import { commonBuilder } from "../utils/commonBuild.js";
import ExperienceBuildSection from "./experience.build.js";

const {
  ExperienceCms,
  JourneyProcess,
  ExperienceHighlight,
  ExperienceTimeline,
  ExperienceFeature,
  BookingProcess,
  ExperienceFaq,
  Location,
  Banner,
} = models;

export default class ExperienceService {
  static async get() {
    const [
      banner,
      cms,
      journey,
      highlights,
      timeline,
      features,
      booking,
      faqs,
      locations,
    ] = await Promise.all([
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
        where: { page_slug: "experience-stay" },
      }),
      ExperienceCms.findOne({
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        order: [["id", "DESC"]],
      }),
      JourneyProcess.findAll({
        ...commonBuilder.activeList(["title", "description"]),
      }),
      ExperienceHighlight.findAll({
        ...commonBuilder.activeList(["title", "description"]),
      }),
      ExperienceTimeline.findAll({
        ...commonBuilder.activeList(["title", "subtitle", "media_path", "media_alt"]),
      }),
      ExperienceFeature.findAll({
        ...commonBuilder.activeList(["title", "media_path"]),
      }),
      BookingProcess.findAll({
        ...commonBuilder.activeList(["title", "description"]),
      }),
      ExperienceFaq.findAll({
        ...commonBuilder.activeList(["question", "answer"]),
      }),
      Location.findAll({
        ...commonBuilder.activeList(["location", "location_link"]),
      }),
    ]);

    return {
      bannerSection: commonBuilder.banner(banner),
      introSection: ExperienceBuildSection.buildIntroSection(cms),
      journeySection: ExperienceBuildSection.buildJourneySection(cms, journey),
      lifestyleSection: ExperienceBuildSection.buildLifestyleSection(
        cms,
        timeline,
        highlights,
      ),
      visitSection: ExperienceBuildSection.buildVisitSection(cms, locations),
      featureSection: ExperienceBuildSection.buildFeatureSection(cms, features),
      bookingProcessSection: ExperienceBuildSection.buildBookingProcessSection(
        cms,
        booking,
      ),
      faqSection: ExperienceBuildSection.buildFaqSection(cms, faqs),
      enquirySection: ExperienceBuildSection.buildEnquirySection(cms),
    };
  }
}
