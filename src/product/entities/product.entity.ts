import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryColumn()
    id: string;

    @Column()
    @Index()
    name: string;
    
    @Column()
    @Index()
    category: string;
    
    @Column( {type: 'decimal', nullable:true })
    price: number;
    
    @Column({default: false})
    deleted: boolean;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

}
