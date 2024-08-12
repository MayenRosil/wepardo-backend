import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, OneToMany } from 'typeorm';
import { Position } from './Position';

@Entity()
export class Department extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 50})
    departmentName: string

    @OneToMany(() => Position, position => position.department)
    positions: Position[];

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}