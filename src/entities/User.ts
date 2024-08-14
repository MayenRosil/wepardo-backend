import { OneToMany, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import { Employee } from './Employee';
import { Company } from './Company';
import { ExchangeHistory } from './ExchangeHistory';
import { Role } from './Role';
import { AttendanceHistory } from './AttendanceHistory';

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

    @OneToOne(type => Employee) @JoinColumn() 
    employee: Employee;

    
    @OneToOne(type => Role) @JoinColumn() 
    role: Role;

    @OneToOne(type => Company) @JoinColumn() 
    company: Company;

    @Column({default: 0})
    recoveryCode: number

    @Column({default: 100})
    exchangePoints: number

    @OneToMany(() => ExchangeHistory, exchange => exchange.user)
    exchanges: ExchangeHistory[];

    @Column({default: true})
    active: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => AttendanceHistory, attendanceHistory => attendanceHistory.user)
    attendanceHistories: AttendanceHistory[];
}