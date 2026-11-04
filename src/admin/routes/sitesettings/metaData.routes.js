import express from "express";
import MetaDataController from "../../controllers/sitesettings/metaData.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware(["admin"]));
router.get("/", MetaDataController.getAll);
router.get("/:id", MetaDataController.getById);
router.put("/:id", MetaDataController.update);

export default router;
