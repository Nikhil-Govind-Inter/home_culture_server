import { models } from "../../shared/models/index.js";
import { commonBuilder } from "../utils/commonBuild.js";
import CareerBuildSection from "./career.build.js";

const { Banner, CareerCms, CareerVision, CareerBenefit, Testimonial, Department, Job, City, State } = models;

export default class CareerService {
  static async get() {
    const [banner, cms, visions, benefits, testimonials, jobs] = await Promise.all([
      Banner.findOne({ where: { page_slug: "careers" } }),
      CareerCms.findOne({ order: [["id", "DESC"]] }),
      CareerVision.findAll(commonBuilder.activeList()),
      CareerBenefit.findAll(commonBuilder.activeList()),
      Testimonial.findAll(commonBuilder.activeList()),
      Job.findAll({
        where: { status: true },
        attributes: ["id", "position", "slug"],
        include: [
          {
            model: City,
            as: "city",
            attributes: ["name"],
            include: [{ model: State, as: "state", attributes: ["name"] }],
          },
          { model: Department, as: "department", attributes: ["name"], where: { status: true }, required: true },
        ],
        order: [
          ["sort_order", "ASC"],
          ["posted_at", "DESC"],
          ["id", "DESC"],
        ],
      }),
    ]);

    const lifeAtHomeSection = CareerBuildSection.buildLifeAtHomeSection(cms, visions);
    const whyJoinUsSection = CareerBuildSection.buildWhyJoinUsSection(cms, benefits);
    const currentOpeningSection = CareerBuildSection.buildCurrentOpeningSection(cms, jobs);
    const testimonialSection = CareerBuildSection.buildTestimonialSection(cms, testimonials);

    return {
      bannerSection: commonBuilder.banner(banner),
      // Header title of each active section after the banner, in page order.
      headerTitles: [lifeAtHomeSection, whyJoinUsSection, currentOpeningSection, testimonialSection]
        .map((section) => section?.header_title)
        .filter(Boolean),
      lifeAtHomeSection,
      whyJoinUsSection,
      currentOpeningSection,
      testimonialSection,
      ctaSection: CareerBuildSection.buildCtaSection(cms),
    };
  }
}
