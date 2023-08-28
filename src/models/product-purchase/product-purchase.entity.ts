import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { Product } from "../product/product.entity";
import { User } from "../user/user.entity";

@Entity({ name: 'product_purchase' })
export class ProductPurchase {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Product)
    @JoinTable({ name: 'product_purchase_products' })
    products: Product[];

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total: number;

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

    @ManyToOne(() => User, user => user.purchases)
    @JoinColumn({ name: 'user_id' })
    user: User;

}