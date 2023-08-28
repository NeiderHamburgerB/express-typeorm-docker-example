import { ProductPurchaseService } from "./product-purchase.service";
import { validation } from "../../common/validData";
import { Request, Response } from "express";
import to from "await-to-js";

export class ProductPurchaseController {
   
    public productPurchaseService: ProductPurchaseService; 
    
    constructor() {
        this.productPurchaseService = new ProductPurchaseService(); 
    }

    create = async (req: Request, res: Response, next: any) => {

        const err = validation(req);
    
        if (err) {
          res.status(400).send({ err });
        }
    
        const [error, productPurchase] = await to(this.productPurchaseService.create(req.body,req.user));
    
        if (error) {
          res.status(400).send({ error });
        }
    
        res.status(201).send({ productPurchase });
    }


    all = async (req: Request, res: Response, next: any) => {

        const [error, products] = await to(this.productPurchaseService.all());
    
        if (error) {
          return res.status(400).send({ error });
        }
    
        return res.status(200).send({ products });

    }

}
