import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryColumn()
    sku: string;
    
    @Column()
    name: string;

    @Column()
    brand: string;

    @Column()
    model: string;

    @Column()
    category: string;

    @Column()
    color: string;
    
    @Column( {type: 'decimal', nullable:true })
    price: number;
    
    @Column()
    currency: string;
    
    @Column()
    stock: string;
    
    @Column({default: false})
    deleted: boolean;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

}
