import { Request } from "express";
import { validationResult } from "express-validator";

export function validation(req: Request) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return { errors: errors.array() };
    }
    return null;
}