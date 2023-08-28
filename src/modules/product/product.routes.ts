import { ProductCreateDto, ProductUpdateDto } from "./product.dto";
import { ProductController } from "./product.controller";
import { ResourcesApp } from "../../config/roles/roles";
import { grantAccess } from "../../middlewares/roles";
import { Router } from "express";

export class ProductRoutes {

    public router: Router = Router();
    public controller = new ProductController();

    constructor() {
        this.config();
    }

    config(): void {
        
        this.router.post('/create', [...ProductCreateDto, grantAccess('createAny', ResourcesApp.PRODUCT)],this.controller.create);

        this.router.get('/all',[grantAccess('readAny', ResourcesApp.PRODUCT) ],this.controller.all);

        this.router.get('/one/:id',[grantAccess('readAny', ResourcesApp.PRODUCT) ],this.controller.one);

        this.router.patch('/update/:id',[...ProductUpdateDto,grantAccess('updateAny', ResourcesApp.PRODUCT) ],this.controller.update)

        this.router.delete('/delete/:id',[grantAccess('deleteAny', ResourcesApp.PRODUCT) ],this.controller.delete)

    }

}

const productRoutes  = new ProductRoutes();
export default productRoutes.router;