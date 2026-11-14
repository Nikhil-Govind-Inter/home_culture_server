import { commonBuilder } from "../utils/commonBuild.js";
import { mediaUtils } from "../utils/mediaUtils.js";

export default class CareerBuildSection {
  static buildLifeAtHomeSection(cms, visions = []) {
    if (!cms) return null;

    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "life_at_home_"),
      quote: cms.life_at_home_quote ?? "",
      skills_title: cms.life_at_home_skills_title ?? "",
      visions: (visions ?? []).map((v) => ({
        title: v.title ?? "",
        description: v.description ?? "",
      })),
    });
  }

  static buildWhyJoinUsSection(cms, benefits = []) {
    const media = ["one", "two", "three", "four"]
      .map((n) =>
        mediaUtils.singleMediaWithoutType(
          cms?.[`media_${n}_path`],
          cms?.[`media_${n}_alt`],
        ),
      )
      .filter(Boolean);

    if (!cms) return null;

    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "why_join_us_"),
      media,
      benefits: (benefits ?? []).map((b) => ({
        title: b.title ?? "",
        description: b.description ?? "",
        media: mediaUtils.singleMediaWithoutType(b.media_path, b.title),
      })),
    });
  }

  static buildCurrentOpeningSection(cms, jobs = []) {
    if (!cms) return null;

    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "current_opening_"),
      jobs: (jobs ?? []).map((j) => ({
        position: j.position ?? "",
        slug: j.slug ?? "",
        // "Kochi, Kerala"
        location: [j.city?.name, j.city?.state?.name]
          .filter(Boolean)
          .join(", "),
        department: j.department?.name ?? "",
      })),
    });
  }

  static buildTestimonialSection(cms, testimonials = []) {
    if (!cms) return null;

    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "testimonial_"),
      testimonials: (testimonials ?? []).map((t) => ({
        name: t.name ?? "",
        designation: t.designation ?? "",
        quotes: t.quotes ?? "",
        media: mediaUtils.singleMediaWithoutType(t.media_path, t.name),
      })),
    });
  }

  static buildCtaSection(cms) {
    if (!cms) return null;

    return commonBuilder.whenActive({
      ...commonBuilder.heading(cms, "cta_"),
      media: mediaUtils.mediaWithoutTypes(
        cms.cta_desktop_media_path,
        cms.cta_mobile_media_path,
        cms.cta_media_alt,
      ),
      button: mediaUtils.buttonFromRecord(cms, "cta_button_"),
    });
  }
}
