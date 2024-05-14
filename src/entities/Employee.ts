import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { Department } from './Department';
import { User } from './User';
import { Position } from './Position';

@Entity()
export class Employee extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 25})
    firstName: string
    
    @Column({length: 25})
    secondName: string
    
    @Column({length: 25})
    firstLastName: string
    
    @Column({length: 25})
    secondLastName: string
    
    @Column({length: 13})
    CUI: string

    @Column({length: 10})
    NIT: string

    @OneToOne(type => User) @JoinColumn() 
    user: User;
    
    @OneToOne(type => Position) @JoinColumn() 
    position: Position;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}