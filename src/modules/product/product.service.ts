import { IProduct, IUpdateProduct } from "./product.interface";
import { Product } from "../../models/product/product.entity";
import { CustomError } from "../../common/error";
import { AppDataSource } from "../../app";
import to from "await-to-js";

export class ProductService {

    public productRepository: any;
    constructor() {
        this.productRepository = AppDataSource.getRepository(Product);
    }

    async create(data:IProduct) : Promise<Product>{
        
        try {
            
            const [errorProduct, product] = await to(
                this.productRepository.findOne({
                    where: [
                        { name: data.name },
                    ]
                })
            );

            if (errorProduct) {
                throw new CustomError(`Query failed, ${errorProduct}`, 400);
            }

            if (product) {
                throw new CustomError("El producto ya existe", 406);
            }

            try {
                const newProduct = await this.productRepository.save(data);
                console.log('newProduct', newProduct);
                return newProduct;
            } catch (error) {
                console.error('Error registering:', error);
                throw new CustomError(`Query failed, ${error.message}`, 400);
            }

        } catch (error) {
            return error.message;
        }

    }

    async all(): Promise<IProduct[]>{
        try {
            const products = await this.productRepository.find();
            return products;
        } catch (error) {
            console.error('Error consulting:', error);
            throw new CustomError(`Query failed, ${error.message}`, 400);
        }
    }

    async one(id:string): Promise<IProduct>{
        try {
            const product = await this.productRepository.findOne({
                where: {
                  id
                },
            });
            return product;
        } catch (error) {
            console.error('Error consulting:', error);
            throw new CustomError(`Query failed, ${error.message}`, 400);
        }

    }

    async update(id:string, data:IUpdateProduct):Promise<IProduct>{
       
        try {
            const [errorExist, product] = await to(
                this.productRepository.findOne({
                    where: {
                    id
                    },
                })
            );

            if (errorExist) {
                throw new CustomError(`Query failed, ${errorExist}`, 400);
            }

            if (!product) {
                throw new CustomError('El producto no existe', 404);
            }

            const updatedProduct = this.productRepository.merge(
                product,
                data,
            );

            try {
                const newProduct = await this.productRepository.save(updatedProduct);
                console.log('productUpdated', newProduct);
                return newProduct;
            } catch (error) {
                console.error('Error updated product:', error);
                throw new CustomError(`Query failed, ${error}`, 400);
            }

         } catch (error) {
            return error;
        }
    }

    async delete(id:string){
        try {
            const [errorDeleted, deleted] = await to(
                this.productRepository.delete(id)
            );

            if (errorDeleted) {
                throw new CustomError(`Query failed, ${errorDeleted.message}`, 400);
            }

            return deleted;
           
        } catch (error) {
            return error.message;
        }
    }

}