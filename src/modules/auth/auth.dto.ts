import { check } from "express-validator";

export const loginDto = [
    check('email').isEmail(),
    check('password').isString()
];
