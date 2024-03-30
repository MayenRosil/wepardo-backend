import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 50})
    username: string

    @Column()
    password: string

    @Column({length: 75})
    email: string

    @Column({default: 0})
    recoveryCode: number

    @Column({default: ''})
    biometrics: string

    @Column({default: true})
    active: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}