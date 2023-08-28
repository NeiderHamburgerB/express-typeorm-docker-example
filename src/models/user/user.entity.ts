import { 
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { ProductPurchase } from "../product-purchase/product-purchase.entity";

@Entity({ name: 'users' })
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'jsonb', unique:true })
    document: {
        type: string;
        value: string;
    };

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    lastname: string;

    @Column({ unique: true, type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'enum', enum:['ADMIN', 'USUARIO'], default: 'USUARIO' })
    roles: string[];

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

    @OneToMany(() => ProductPurchase, purchase => purchase.user,{cascade:true})
    purchases: ProductPurchase[];

}