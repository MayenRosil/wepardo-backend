import { OneToOne, JoinColumn, ManyToOne, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { User } from './User';
import { Product } from './Product';

@Entity()
export class Exchange extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    
    @ManyToOne(() => User, user => user.exchanges)
    user: User;

    @Column({})
    image: string

    @Column()
    name: string

    @Column({default: 0})
    points: number

    @OneToOne(type => Product) @JoinColumn() 
    product: Product;

    @Column({default: true})
    active: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}