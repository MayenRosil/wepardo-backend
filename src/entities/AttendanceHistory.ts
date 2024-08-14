import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Department } from './Department';
import { User } from './User';
import { Position } from './Position';

@Entity()
export class AttendanceHistory extends BaseEntity {
    
        @PrimaryGeneratedColumn()
        id: number
    
        
        @Column()
        start: Date

        @Column()
        end: Date

        
    @ManyToOne(() => User, user => user.attendanceHistories)
    user: User;
    
        @CreateDateColumn()
        createdAt: Date
    
        @UpdateDateColumn()
        updatedAt: Date
}