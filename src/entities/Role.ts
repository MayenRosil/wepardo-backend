import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Department } from './Department';
import { User } from './User';
import { Position } from './Position';

@Entity()
export class Role extends BaseEntity {
    
        @PrimaryGeneratedColumn()
        id: number
    
        
        @Column({length: 50})
        name: string

        @Column({length: 50})
        description: string
    
        @CreateDateColumn()
        createdAt: Date
    
        @UpdateDateColumn()
        updatedAt: Date
}