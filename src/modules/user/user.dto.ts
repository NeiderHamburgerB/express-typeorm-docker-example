import { check } from "express-validator";

export const UserCreateDto = [
    check('document.type').isString(),
    check('document.value').isString(),
    check('name').isString(),
    check('lastname').isString(),
    check('email').isEmail(),
    check('password').isString(),
    check('roles').isArray(),
];

export const UserUpdateDto = [
    check('document.type').optional({nullable: true}),
    check('document.value').isString().optional({nullable: true}),
    check('name').isString().optional({nullable: true}),
    check('lastname').isString().optional({nullable: true}),
    check('email').isEmail().optional({nullable: true}),
    check('password').isString().optional({nullable: true})
];