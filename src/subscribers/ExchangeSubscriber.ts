import { EventSubscriber, EntitySubscriberInterface, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity, InsertEvent, UpdateEvent, RemoveEvent, SoftRemoveEvent, RecoverEvent, TransactionStartEvent, TransactionCommitEvent, TransactionRollbackEvent } from 'typeorm';
import { AfterQueryEvent, BeforeQueryEvent } from 'typeorm/subscriber/event/QueryEvent';
import { AppDataSource } from '../db';
import { LogRecord } from '../entities/LogRecord';
import { Exchange } from '../entities/exchange';

@EventSubscriber()
export class ExchangeSubscriber implements EntitySubscriberInterface<Exchange> {

    listenTo(): string | Function {
        return Exchange;
    }

    /**
     * Called after entity insertion.
     */
    async afterInsert(event: InsertEvent<Exchange>) {
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
    async afterUpdate(event: UpdateEvent<Exchange>) {
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
    async afterRemove(event: RemoveEvent<Exchange>) {
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