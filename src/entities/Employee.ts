import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Department } from './Department';
import { User } from './User';
import { Position } from './Position';
import { Company } from './Company';

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
    
    @ManyToOne(() => Position)
    position: Position;

    @OneToOne(type => Company) @JoinColumn() 
    company: Company;

    
    @OneToOne(type => User) @JoinColumn() 
    user: User;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}