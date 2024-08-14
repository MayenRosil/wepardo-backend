import { EventSubscriber, EntitySubscriberInterface, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, InsertEvent, UpdateEvent, RemoveEvent, SoftRemoveEvent, RecoverEvent, TransactionStartEvent, TransactionCommitEvent, TransactionRollbackEvent } from 'typeorm';
import { AfterQueryEvent, BeforeQueryEvent } from 'typeorm/subscriber/event/QueryEvent';
import { AppDataSource } from '../db';
import { LogRecord } from '../entities/LogRecord';
import { ExchangeHistory } from '../entities/ExchangeHistory';

@EventSubscriber()
export class ExchangeSubscriber implements EntitySubscriberInterface<ExchangeHistory> {

    listenTo(): string | Function {
        return ExchangeHistory;
    }

    /**
     * Called after entity insertion.
     */
    async afterInsert(event: InsertEvent<ExchangeHistory>) {
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
    async afterUpdate(event: UpdateEvent<ExchangeHistory>) {
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
    async afterRemove(event: RemoveEvent<ExchangeHistory>) {
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