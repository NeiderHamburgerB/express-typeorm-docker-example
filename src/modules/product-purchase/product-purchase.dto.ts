import { check } from "express-validator";

export const ProductPurchaseCreateDto = [
  check('items').isArray().withMessage('Items must be an array'),
  check('items.*.productId').isString().withMessage('Product ID must be a string'),
  check('items.*.quantities').isNumeric().withMessage('Quantity must be a number'),
];