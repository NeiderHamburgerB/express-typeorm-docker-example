
import { UserController } from "./user.controller";
import { UserCreateDto } from "./user.dto";
import { Router } from "express";

export class UserRoutes {

    public router: Router = Router();
    public controller = new UserController();

    constructor() {
        this.config();
    }

    config(): void {
        
        this.router.post('/create',[...UserCreateDto],this.controller.create);

    }

}

const userRoutes = new UserRoutes();
export default userRoutes.router;