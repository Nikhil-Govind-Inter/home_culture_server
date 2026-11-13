import express from "express";

import HomeController from "../home/home.controller.js";
import AboutController from "../about/about.controller.js";
import HowItWorksController from "../howItWorks/howItWorks.controller.js";
import ExperienceController from "../experience/experience.controller.js";
import ContactUsController from "../contactUs/contactUs.controller.js";
import LayoutController from "../layout/layout.controller.js";
import BlogController from "../blog/blog.controller.js";

import CareerController from "../career/career.controller.js";
import FaqController from "../faq/faq.controller.js";
import PrivacyPolicyController from "../privacyPolicy/privacyPolicy.controller.js";

const router = express.Router();

router.get("/layout", LayoutController.get);
router.get("/home", HomeController.get);
router.get("/about", AboutController.get);
router.get("/how-it-works", HowItWorksController.get);
router.get("/experience-stay", ExperienceController.get);
router.get("/contact-us", ContactUsController.get);
router.get("/blogs", BlogController.get);
router.get("/blogs/list", BlogController.list);
router.get("/blogs/:slug", BlogController.detail);
router.get("/career", CareerController.get);
router.get("/faq", FaqController.get);
router.get("/privacy-policy", PrivacyPolicyController.get);

export default router;
