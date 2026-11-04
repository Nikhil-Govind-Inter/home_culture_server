import config from './shared/config/index.js';
import Database from './shared/config/database.js';
import { models } from './shared/models/index.js';
import { hashPassword } from './admin/controllers/auth.controller.js';
import logger from './shared/utils/logger.js';

// Media paths are empty placeholders until an admin uploads images (PUT /admin/banners/:id).
const banner = (page, page_slug, header_title, title, description) => ({
  page,
  page_slug,
  header_title,
  title,
  description,
  status: true,
  banner_desktop_media_path: '',
  banner_mobile_media_path: '',
  banner_media_alt: `${page} banner`,
});

const defaultBanners = [
  banner('Home', 'home', 'Home', 'Welcome to Home Culture', 'Discover authentic home stays and local experiences.'),
  banner('About', 'about', 'About Us', 'About Us', 'Learn more about Home Culture and what we stand for.'),
  banner('Privacy Policy', 'privacy-policy', 'Privacy Policy', 'Privacy Policy', 'How we collect, use and protect your information.'),
  banner('Contact Us', 'contact-us', 'Contact Us', 'Get in Touch', 'We would love to hear from you.'),
  banner('Blogs', 'blogs', 'Blogs', 'Our Blogs', 'Stories, tips and travel inspiration.'),
  banner('Careers', 'careers', 'Careers', 'Join Our Team', 'Explore opportunities to work with us.'),
  banner('FAQ', 'faq', 'FAQ', 'Frequently Asked Questions', 'Answers to the questions we hear most.'),
  banner('Experience Stay', 'experience-stay', 'Experience Stay', 'Experience Stay', 'Live like a local with a Home Culture stay.'),
  banner('How It Works', 'how-it-works', 'How It Works', 'How It Works', 'See how booking and hosting works, step by step.'),
];

// Seeds the first admin user and default banners: npm run seed
async function seed() {
  await Database.connect();

  const { name, email, password } = config.seedAdmin;
  const [, created] = await models.Admin.findOrCreate({
    where: { email },
    defaults: { name, password: await hashPassword(password) },
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

  await Database.disconnect();
}

seed().catch((err) => {
  logger.error(err);
  process.exit(1);
});
