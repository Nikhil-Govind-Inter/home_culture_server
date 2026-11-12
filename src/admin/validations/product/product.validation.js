import { body } from 'express-validator';

// Multipart bodies send arrays as repeated fields (style_slugs=a&style_slugs=b), "style_slugs[]",
// a JSON string ('["a","b"]') or a comma-separated string. Normalises all of them into an array
// of unique, trimmed slugs.
const toSlugArray = (value) => {
  let list = value;
  if (typeof list === 'string') {
    const text = list.trim();
    if (text === '') return [];
    if (text.startsWith('[')) {
      try {
        list = JSON.parse(text);
      } catch {
        return value;
      }
    } else {
      list = text.split(',');
    }
  }
  if (!Array.isArray(list)) list = [list];
  if (!list.every((item) => typeof item === 'string')) return value;
  return [...new Set(list.map((item) => item.trim()).filter(Boolean))];
};

const isSlugArray = (value) => Array.isArray(value);

const common = [
  // Optional: generated from the title when omitted on create.
  body('slug')
    .optional({ values: 'falsy' })
    .isString().withMessage('Slug must be a string')
    .trim()
    .isLength({ max: 255 }).withMessage('Slug must be at most 255 characters'),
  body('sort_order').optional().isInt({ min: 1 }).withMessage('Sort order must be a positive integer').toInt(),
  body('status').optional().isBoolean().withMessage('Status must be a boolean').toBoolean(),
  // Many-to-many selections. Omit to leave unchanged (update); send an empty value to clear.
  body('style_slugs')
    .optional({ values: 'undefined' })
    .customSanitizer(toSlugArray)
    .custom(isSlugArray).withMessage('Style slugs must be an array of slugs'),
  body('trim_slugs')
    .optional({ values: 'undefined' })
    .customSanitizer(toSlugArray)
    .custom(isSlugArray).withMessage('Trim slugs must be an array of slugs'),
  body('size_slugs')
    .optional({ values: 'undefined' })
    .customSanitizer(toSlugArray)
    .custom(isSlugArray).withMessage('Size slugs must be an array of slugs'),
  body('add_ons_slugs')
    .optional({ values: 'undefined' })
    .customSanitizer(toSlugArray)
    .custom(isSlugArray).withMessage('Add-on slugs must be an array of slugs'),
];

export const validationRequestPost = [
  body('icon_media_alt').optional({ values: 'falsy' }).isString().withMessage('Icon alt must be a string').isLength({ max: 255 }).withMessage('Icon alt must be at most 255 characters').trim(),
  body('media_alt').notEmpty().withMessage('Media alt is required').isString().withMessage('Media alt must be a string').isLength({ max: 255 }).withMessage('Media alt must be at most 255 characters').trim(),
  body('title').notEmpty().withMessage('Title is required').isString().withMessage('Title must be a string').isLength({ max: 255 }).withMessage('Title must be at most 255 characters').trim(),
  body('excerpt').notEmpty().withMessage('Excerpt is required').isString().withMessage('Excerpt must be a string').isLength({ max: 255 }).withMessage('Excerpt must be at most 255 characters').trim(),
  body('header_title').notEmpty().withMessage('Header title is required').isString().withMessage('Header title must be a string').isLength({ max: 255 }).withMessage('Header title must be at most 255 characters').trim(),
  body('description').notEmpty().withMessage('Description is required').isString().withMessage('Description must be a string').isLength({ max: 255 }).withMessage('Description must be at most 255 characters').trim(),
  body('button_text').notEmpty().withMessage('Button text is required').isString().withMessage('Button text must be a string').isLength({ max: 255 }).withMessage('Button text must be at most 255 characters').trim(),
  ...common,
];

export const validationRequestPut = [
  body('icon_media_alt').optional({ values: 'falsy' }).isString().withMessage('Icon alt must be a string').isLength({ max: 255 }).withMessage('Icon alt must be at most 255 characters').trim(),
  body('media_alt').optional().notEmpty().withMessage('Media alt cannot be empty').isString().withMessage('Media alt must be a string').isLength({ max: 255 }).withMessage('Media alt must be at most 255 characters').trim(),
  body('title').optional().notEmpty().withMessage('Title cannot be empty').isString().withMessage('Title must be a string').isLength({ max: 255 }).withMessage('Title must be at most 255 characters').trim(),
  body('excerpt').optional().notEmpty().withMessage('Excerpt cannot be empty').isString().withMessage('Excerpt must be a string').isLength({ max: 255 }).withMessage('Excerpt must be at most 255 characters').trim(),
  body('header_title').optional().notEmpty().withMessage('Header title cannot be empty').isString().withMessage('Header title must be a string').isLength({ max: 255 }).withMessage('Header title must be at most 255 characters').trim(),
  body('description').optional().notEmpty().withMessage('Description cannot be empty').isString().withMessage('Description must be a string').isLength({ max: 255 }).withMessage('Description must be at most 255 characters').trim(),
  body('button_text').optional().notEmpty().withMessage('Button text cannot be empty').isString().withMessage('Button text must be a string').isLength({ max: 255 }).withMessage('Button text must be at most 255 characters').trim(),
  ...common,
];
