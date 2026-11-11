import { body } from "express-validator";

export const validationRequestPost = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Name must be at most 255 characters"),
  // Optional: generated from the name when omitted.
  body("slug")
    .notEmpty()
    .withMessage("Slug is required")
    .isString()
    .withMessage("Slug must be a string")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Slug must be at most 255 characters"),
  body("sort_order")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Sort order must be a positive integer")
    .toInt(),
  body("status")
    .optional()
    .isBoolean()
    .withMessage("Status must be a boolean")
    .toBoolean(),
];

export const validationRequestPut = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Name must be at most 255 characters"),
  body("slug")
    .optional()
    .notEmpty()
    .withMessage("Slug cannot be empty")
    .isString()
    .withMessage("Slug must be a string")
    .trim()
    .isLength({ max: 255 })
    .withMessage("Slug must be at most 255 characters"),
  body("sort_order")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Sort order must be a positive integer")
    .toInt(),
  body("status")
    .optional()
    .isBoolean()
    .withMessage("Status must be a boolean")
    .toBoolean(),
];
