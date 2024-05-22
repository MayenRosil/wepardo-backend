import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, OneToOne, ManyToOne } from 'typeorm';
import { Department } from './Department';

@Entity()
export class Position extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 50})
    positionName: string

    @Column()
    salary: number

    @ManyToOne(() => Department, department => department.positions)
    department: Department;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}