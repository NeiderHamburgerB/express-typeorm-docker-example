import { AuthController } from "./auth.controller";
import { loginDto } from "./auth.dto";
import { Router } from "express";

export class AuthRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/login', [...loginDto],AuthController.login);
    }

}

const authRoutes = new AuthRoutes();
export default authRoutes.router;