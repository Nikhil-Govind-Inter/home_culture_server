import config from './shared/config/index.js';
import { models } from './shared/models/index.js';
import logger from './shared/utils/logger.js';
import bcrypt from 'bcryptjs';

// Media paths are empty placeholders until an admin uploads images (PUT /admin/banners/:id).
const banner = (page, page_slug, header_title, title, description) => ({
  page,
  page_slug,
  header_title,
  title,
  description,
  status: true,
  media_type: 'image',
  banner_desktop_media_path: '',
  banner_mobile_media_path: '',
  banner_media_alt: `${page} banner`,
});

const defaultBanners = [
  banner('About', 'about', 'About Us', 'About Us', 'Learn more about Home Culture and what we stand for.'),
  banner('Privacy Policy', 'privacy-policy', 'Privacy Policy', 'Privacy Policy', 'How we collect, use and protect your information.'),
  banner('Contact Us', 'contact-us', 'Contact Us', 'Get in Touch', 'We would love to hear from you.'),
  banner('Blogs', 'blogs', 'Blogs', 'Our Blogs', 'Stories, tips and travel inspiration.'),
  banner('Careers', 'careers', 'Careers', 'Join Our Team', 'Explore opportunities to work with us.'),
  banner('FAQ', 'faq', 'FAQ', 'Frequently Asked Questions', 'Answers to the questions we hear most.'),
  banner('Experience Stay', 'experience-stay', 'Experience Stay', 'Experience Stay', 'Live like a local with a Home Culture stay.'),
  banner('How It Works', 'how-it-works', 'How It Works', 'How It Works', 'See how booking and hosting works, step by step.'),
];

const meta = (page, page_slug, meta_title, meta_description, meta_keywords) => ({
  page,
  page_slug,
  meta_title,
  meta_description,
  meta_keywords,
});

const defaultMetaData = [
  meta('Home', 'home', 'Home Culture | Authentic Home Stays & Local Experiences', 'Discover authentic home stays and local experiences with Home Culture.', 'home stay, local experiences, home culture, travel'),
  meta('About', 'about', 'About Us | Home Culture', 'Learn more about Home Culture and what we stand for.', 'about home culture, our story, home stays'),
  meta('Privacy Policy', 'privacy-policy', 'Privacy Policy | Home Culture', 'How Home Culture collects, uses and protects your information.', 'privacy policy, data protection, home culture'),
  meta('Contact Us', 'contact-us', 'Contact Us | Home Culture', 'Get in touch with the Home Culture team. We would love to hear from you.', 'contact home culture, support, enquiry'),
  meta('Blogs', 'blogs', 'Blogs | Home Culture', 'Stories, tips and travel inspiration from Home Culture.', 'travel blog, home stay tips, travel stories'),
  meta('Careers', 'careers', 'Careers | Home Culture', 'Explore opportunities to work with Home Culture.', 'careers, jobs, work with us'),
  meta('FAQ', 'faq', 'FAQ | Home Culture', 'Answers to the questions we hear most about Home Culture stays.', 'faq, questions, help, home stay'),
  meta('Experience Stay', 'experience-stay', 'Experience Stay | Home Culture', 'Live like a local with a Home Culture stay.', 'experience stay, live like a local, home stay'),
  meta('How It Works', 'how-it-works', 'How It Works | Home Culture', 'See how booking and hosting works with Home Culture, step by step.', 'how it works, booking, hosting'),
];

// Seeds the first admin user, default banners and page metadata.
// Idempotent (findOrCreate); runs on every server start after the DB is connected.
async function seed() {
  const { name, email, password } = config.seedAdmin;
  const [, created] = await models.Admin.findOrCreate({
    where: { email },
    defaults: { name, password: await bcrypt.hash(password, 10) },
  });
  logger.info(created ? `Admin created: ${email}` : `Admin already exists: ${email}`);

  for (const data of defaultBanners) {
    const [, bannerCreated] = await models.Banner.findOrCreate({
      where: { page_slug: data.page_slug },
      defaults: data,
    });
    logger.info(
      bannerCreated ? `Banner created: ${data.page_slug}` : `Banner already exists: ${data.page_slug}`,
    );
  }

  for (const data of defaultMetaData) {
    const [, metaCreated] = await models.MetaData.findOrCreate({
      where: { page_slug: data.page_slug },
      defaults: data,
    });
    logger.info(
      metaCreated ? `Metadata created: ${data.page_slug}` : `Metadata already exists: ${data.page_slug}`,
    );
  }
}

export default seed;