import { 
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { ProductPurchase } from "../product-purchase/product-purchase.entity";

@Entity({ name: 'products' })
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    category: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 },)
    price: number;

    @Column({ type: 'int' })
    quantity: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_at: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updated_at: Date;

    @ManyToMany(() => ProductPurchase, purchase => purchase.products)
    @JoinTable({ name: 'product_purchase_products' })
    purchases: ProductPurchase[];

}
