import { body } from "express-validator";

export const validationRequestPut = [
  // Content Section
  body("content_section_status")
    .optional()
    .isBoolean()
    .withMessage("Content section status must be a boolean")
    .toBoolean(),

  body("content_section_side_title")
    .isString()
    .withMessage("Content section side title is required")
    .trim()
    .notEmpty()
    .withMessage("Content section side title is required")
    .isLength({ max: 255 })
    .withMessage("Content section side title must be at most 255 characters"),

  body("content")
    .isString()
    .withMessage("Content is required")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .custom(
      (value) =>
        /<(img|iframe|video)\b/i.test(value) ||
        value.replace(/<[^>]*>/g, "").replace(/&nbsp;|\s/g, "").length > 0,
    )
    .withMessage("Content is required"),

  // CTA Section
  body("cta_section_status")
    .optional()
    .isBoolean()
    .withMessage("CTA section status must be a boolean")
    .toBoolean(),

  body("cta_section_media_alt")
    .isString()
    .withMessage("CTA section media alt is required")
    .trim()
    .notEmpty()
    .withMessage("CTA section media alt is required")
    .isLength({ max: 255 })
    .withMessage("CTA section media alt must be at most 255 characters"),

  body("cta_section_header_title")
    .isString()
    .withMessage("CTA section header title is required")
    .trim()
    .notEmpty()
    .withMessage("CTA section header title is required")
    .isLength({ max: 255 })
    .withMessage("CTA section header title must be at most 255 characters"),

  body("cta_section_title")
    .isString()
    .withMessage("CTA section title is required")
    .trim()
    .notEmpty()
    .withMessage("CTA section title is required")
    .isLength({ max: 255 })
    .withMessage("CTA section title must be at most 255 characters"),

  body("cta_section_description")
    .isString()
    .withMessage("CTA section description is required")
    .trim()
    .notEmpty()
    .withMessage("CTA section description is required"),

  body("cta_section_button_text")
    .isString()
    .withMessage("CTA section button text is required")
    .trim()
    .notEmpty()
    .withMessage("CTA section button text is required")
    .isLength({ max: 255 })
    .withMessage("CTA section button text must be at most 255 characters"),

  body("cta_section_button_link")
    .isString()
    .withMessage("CTA section button link is required")
    .trim()
    .notEmpty()
    .withMessage("CTA section button link is required"),
];
