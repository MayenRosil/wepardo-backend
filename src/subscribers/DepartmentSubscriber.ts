import { EventSubscriber, EntitySubscriberInterface, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, InsertEvent, UpdateEvent, RemoveEvent, SoftRemoveEvent, RecoverEvent, TransactionStartEvent, TransactionCommitEvent, TransactionRollbackEvent } from 'typeorm';
import { AfterQueryEvent, BeforeQueryEvent } from 'typeorm/subscriber/event/QueryEvent';
import { AppDataSource } from '../db';
import { LogRecord } from '../entities/LogRecord';
import { User } from '../entities/User';
import { Department } from '../entities/Department';

@EventSubscriber()
export class DepartmentSubscriber implements EntitySubscriberInterface<Department> {

    listenTo(): string | Function {
        return Department;
    }

    /**
     * Called after entity insertion.
     */
    async afterInsert(event: InsertEvent<Department>) {
        if(event.metadata)
            await AppDataSource
            .getRepository(LogRecord)
            .createQueryBuilder('logRecord')
            .insert()
            .into(LogRecord)
            .values([
                { fecha: new Date(), entidad: event.metadata.name, accion: 'INSERT' }
            ])
            .execute();
    }

    /**
     * Called after entity update.
     */
    async afterUpdate(event: UpdateEvent<Department>) {
        if(event.metadata)
            await AppDataSource
            .getRepository(LogRecord)
            .createQueryBuilder('logRecord')
            .insert()
            .into(LogRecord)
            .values([
                { fecha: new Date(), entidad: event.metadata.name, accion: 'UPDATE' }
            ])
            .execute();
    }

    /**
     * Called after entity removal.
     */
    async afterRemove(event: RemoveEvent<Department>) {
        if(event.metadata)
            await AppDataSource
            .getRepository(LogRecord)
            .createQueryBuilder('logRecord')
            .insert()
            .into(LogRecord)
            .values([
                { fecha: new Date(), entidad: event.metadata.name, accion: 'DELETE' }
            ])
            .execute();
    }
}