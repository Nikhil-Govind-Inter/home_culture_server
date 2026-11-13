import { models } from "../../shared/models/index.js";
import { commonBuilder } from "../utils/commonBuild.js";
import ContactUsBuildSection from "./contactUs.build.js";

const { ContactCms, SocialMedia, Banner } = models;

export default class ContactUsService {
  static async get() {
    const [banner, cms, socialMedia] = await Promise.all([
      Banner.findOne({ where: { page_slug: "contact-us" } }),
      ContactCms.findOne(),
      SocialMedia.findAll(commonBuilder.activeList()),
    ]);

    return {
      bannerSection: commonBuilder.banner(banner),
      formSection: ContactUsBuildSection.buildFormSection(cms, socialMedia),
      faqSection: ContactUsBuildSection.buildFaqSection(cms),
    };
  }
}
