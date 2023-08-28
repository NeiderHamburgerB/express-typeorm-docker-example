import { validation } from "../../common/validData";
import { ProductService } from "./product.service";
import { Request, Response } from "express";
import to from "await-to-js";

export class ProductController {
   
    public productService: ProductService; 
    
    constructor() {
        this.productService = new ProductService(); 
    }

    create = async (req: Request, res: Response, next: any) => {

        const err = validation(req);
    
        if (err) {
          res.status(400).send({ err });
        }
    
        const [error, product] = await to(this.productService.create(req.body));
    
        if (error) {
          res.status(400).send({ error });
        }
    
        res.status(201).send({ product });
    }


    all = async (req: Request, res: Response, next: any) => {

        const [error, products] = await to(this.productService.all());
    
        if (error) {
          return res.status(400).send({ error });
        }
    
        return res.status(200).send({ products });

    }

    one = async (req: Request, res: Response, next: any) => {
    
        const { id } = req.params;
         
        const [error, product] = await to(this.productService.one(id));
    
        if (error) {
          return res.status(400).send({ error });
        }
    
        return res.status(200).send({ product });

    }

    update = async (req: Request, res: Response, next: any) => {
        
      try {
    
        const { id } = req.params;

        const err = validation(req);
    
        if (err) {
          return res.status(400).send({ err });
        }
    
        const [error, updated] = await to(this.productService.update(id,req.body));
    
        if (error) {
          return res.status(400).send({ error });
        }
    
        return res.send({ updated });

      } catch (error) {
        return error.message;
      }
        

    }


    delete = async (req: Request, res: Response, next: any) => {
        
        let { id } = req.params;

        const [error, deleted] = await to(this.productService.delete(id));
    
        if (error) {
          return res.status(400).send({ error });
        }
    
        return res.status(200).send({ deleted });

    }

}
