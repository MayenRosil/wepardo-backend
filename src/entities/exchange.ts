import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@Entity()
export class Exchange extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({})
    image: string

    @Column()
    name: string

    @Column({default: 0})
    points: number

    @Column({default: true})
    active: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}