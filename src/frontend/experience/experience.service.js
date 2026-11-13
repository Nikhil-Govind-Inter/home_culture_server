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

const activeList = (Model) => Model.findAll(commonBuilder.activeList());

export default class ExperienceService {
  static async get() {
    const [banner, cms, journey, highlights, timeline, features, booking, faqs, locations] =
      await Promise.all([
        Banner.findOne({ where: { page_slug: "experience-stay" } }),
        ExperienceCms.findOne({ order: [["id", "DESC"]] }),
        activeList(JourneyProcess),
        activeList(ExperienceHighlight),
        activeList(ExperienceTimeline),
        activeList(ExperienceFeature),
        activeList(BookingProcess),
        activeList(ExperienceFaq),
        activeList(Location),
      ]);

    return {
      bannerSection: commonBuilder.banner(banner),
      introSection: ExperienceBuildSection.buildIntroSection(cms),
      journeySection: ExperienceBuildSection.buildJourneySection(cms, journey),
      lifestyleSection: ExperienceBuildSection.buildLifestyleSection(cms, timeline, highlights),
      visitSection: ExperienceBuildSection.buildVisitSection(cms, locations),
      featureSection: ExperienceBuildSection.buildFeatureSection(cms, features),
      bookingProcessSection: ExperienceBuildSection.buildBookingProcessSection(cms, booking),
      faqSection: ExperienceBuildSection.buildFaqSection(cms, faqs),
      enquirySection: ExperienceBuildSection.buildEnquirySection(cms),
    };
  }
}
