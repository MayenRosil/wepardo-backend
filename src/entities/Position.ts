import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { Department } from './Department';

@Entity()
export class Position extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 50})
    positionName: string

    @Column()
    salary: number

    @OneToOne(type => Department) @JoinColumn() 
    department: Department;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}