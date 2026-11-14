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

  static buildLink(blog) {
    return blog ? { slug: blog.slug, title: blog.title } : null;
  }

  static buildBlogSection(blog, prev, next) {
    return {
      category: blog.category?.title ?? null,
      reading_time: blog.reading_time,
      title: blog.title,
      excerpt: blog.excerpt,
      media: mediaUtils.singleMediaWithoutType(blog.media_path, blog.media_alt),
      description: blog.description,
      prev_link: BlogBuildSection.buildLink(prev),
      next_link: BlogBuildSection.buildLink(next),
    };
  }

  static buildExploreSection(cms, blogs = []) {
    if (!cms) return null;

    return commonBuilder.whenActive({
      status: cms.detail_page_status,
      header_title: cms.detail_page_header_title,
      title: cms.detail_page_title,
      button: mediaUtils.buttonFromRecord(cms, "detail_page_button_"),
      blogs: BlogBuildSection.buildBlogs(blogs),
    });
  }

  static buildBlogs(blogs = []) {
    return blogs.map((blog) => ({
      slug: blog.slug,
      title: blog.title,
      excerpt: blog.excerpt,
      category: blog.category?.title ?? null,
      // Only present when the query selected it (the detail page's related blogs).
      ...(blog.reading_time !== undefined && { reading_time: blog.reading_time }),
      media: mediaUtils.singleMediaWithoutType(blog.media_path, blog.media_alt),
    }));
  }
}
