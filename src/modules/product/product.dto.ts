import { check } from "express-validator";

export const ProductCreateDto = [
    check('name').isString(),
    check('category').isString(),
    check('price').isNumeric(),
    check('quantity').isNumeric()
];

export const ProductUpdateDto = [
    check('name').isString().optional({nullable: true}),
    check('category').isString().optional({nullable: true}),
    check('price').isNumeric().optional({nullable: true}),
    check('quantity').isNumeric().optional({nullable: true}),
];