import { models } from "../../shared/models/index.js";
import { commonBuilder } from "../utils/commonBuild.js";
import ContactUsBuildSection from "./contactUs.build.js";

const { ContactCms, SocialMedia, Banner } = models;

export default class ContactUsService {
  static async get() {
    const [banner, cms, socialMedia] = await Promise.all([
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
        where: { page_slug: "contact-us" },
      }),
      ContactCms.findOne({
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
      }),
      SocialMedia.findAll({
        ...commonBuilder.activeList(["link", "icon_media_path", "media_alt"]),
      }),
    ]);

    return {
      bannerSection: ContactUsBuildSection.banner(banner),
      formSection: ContactUsBuildSection.buildFormSection(cms, socialMedia),
      faqSection: ContactUsBuildSection.buildFaqSection(cms),
    };
  }
}
