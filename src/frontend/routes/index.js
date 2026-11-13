import express from "express";

import HomeController from "../home/home.controller.js";
import AboutController from "../about/about.controller.js";
import HowItWorksController from "../howItWorks/howItWorks.controller.js";
import ExperienceController from "../experience/experience.controller.js";
import ContactUsController from "../contactUs/contactUs.controller.js";

const router = express.Router();

router.get("/home", HomeController.get);
router.get("/about", AboutController.get);
router.get("/how-it-works", HowItWorksController.get);
router.get("/experience-stay", ExperienceController.get);
router.get("/contact-us", ContactUsController.get);

export default router;
