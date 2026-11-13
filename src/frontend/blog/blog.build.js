import { commonBuilder } from "../utils/commonBuild.js";
import { mediaUtils } from "../utils/mediaUtils.js";

export default class BlogBuildSection {
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

  static buildBlogs(blogs = []) {
    return blogs.map((blog) => ({
      id: blog.id,
      slug: blog.slug,
      title: blog.title,
      excerpt: blog.excerpt,
      category: blog.category?.title ?? null,
      thumbnail: mediaUtils.singleMediaWithoutType(blog.thumbnail_media_path, blog.thumbnail_media_alt),
    }));
  }
}
