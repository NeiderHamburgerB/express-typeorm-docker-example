import { ProductPurchase } from "../../models/product-purchase/product-purchase.entity";
import { IProductPurchase } from "./product-purchase.interface";
import { ProductService } from "../product/product.service";
import { UserService } from "../user/user.service";
import { CustomError } from "../../common/error";
import { AppDataSource } from "../../app";

export class ProductPurchaseService {

    public productPurchaseRepository: any;
    public productService: ProductService;
    public userService: UserService;

    constructor() {
        this.productPurchaseRepository = AppDataSource.getRepository(ProductPurchase);
        this.productService = new ProductService();
        this.userService = new UserService();
    }

    async create(data: IProductPurchase, user: any): Promise<ProductPurchase> {

        try {

            const { items } = data;

            let products = [];

            let total = 0;

            for (const item of items) {
                const product = await this.productService.one(item.productId);

                if (!product) {
                    throw new CustomError(`El producto ${item.productId} no existe`, 404);
                }

                if (item.quantities <= 0) {
                    throw new CustomError(`Cantidad invalida del producto ${item.productId}`, 400);
                }

                if (product.quantity < item.quantities) {
                    throw new CustomError(`Stock insuficiente del producto ${item.productId}`, 400);
                }

                products.push(product);
                total += product.price * item.quantities;
            }

            const userInstance = await this.userService.one(user.sub);

            const newProductPurchase = this.productPurchaseRepository.create({
                products,
                total,
                user: userInstance
            });

            try {
                const newPurchase = await this.productPurchaseRepository.save(newProductPurchase);
                console.log('newProductPurchase', newPurchase);
                return newPurchase;
            } catch (error) {
                console.error('Error newProductPurchase:', error);
                throw new CustomError(`Query failed, ${error.message}`, 400);
            }

        } catch (error) {
            return error.message;
        }

    }

    async all(): Promise<ProductPurchase[]> {
        try {
            const data = await this.productPurchaseRepository
                .createQueryBuilder('productPurchase')
                .leftJoinAndSelect('productPurchase.products', 'products')
                .leftJoinAndSelect('productPurchase.user', 'users')
                .getMany();

            return data;
        } catch (error) {
            console.error('Error consulting:', error);
            throw new CustomError(`Query failed, ${error.message}`, 400);
        }
    }

}