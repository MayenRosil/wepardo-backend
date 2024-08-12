import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@Entity()
export class LogRecord extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fecha: Date

    @Column({length: 15})
    entidad: string

    @Column({length: 15})
    accion: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}   