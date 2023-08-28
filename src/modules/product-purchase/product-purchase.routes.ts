import { ProductPurchaseController } from "./product-purchase.controller";
import { ProductPurchaseCreateDto } from "./product-purchase.dto";
import { ResourcesApp } from "../../config/roles/roles";
import { grantAccess } from "../../middlewares/roles";
import { Router } from "express";

export class ProductRoutes {

    public router: Router = Router();
    public controller = new ProductPurchaseController();

    constructor() {
        this.config();
    }

    config(): void {
        
        this.router.post('/create', [...ProductPurchaseCreateDto, grantAccess('createOwn', ResourcesApp.PRODUCT_PURCHASE)],this.controller.create);

        this.router.get('/all',[grantAccess('readAny', ResourcesApp.PRODUCT_PURCHASE) ],this.controller.all);

    }

}

const productRoutes  = new ProductRoutes();
export default productRoutes.router;