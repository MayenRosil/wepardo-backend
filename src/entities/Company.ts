import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Department } from './Department';
import { User } from './User';
import { Position } from './Position';

@Entity()
export class Company extends BaseEntity {
    
        @PrimaryGeneratedColumn()
        id: number
    
        @Column({length: 50})
        companyName: string
    
        @Column({length: 50})
        address: string
    
        @Column({length: 50})
        phone: string
    
        @Column({length: 50})
        email: string

        @Column({length: 10})
        NIT: string
    
        @CreateDateColumn()
        createdAt: Date
    
        @UpdateDateColumn()
        updatedAt: Date
}