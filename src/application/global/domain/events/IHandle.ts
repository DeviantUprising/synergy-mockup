import { IDomainEvent } from '@global/domain/events/IDomainEvent';

export interface IHandle<IDomainEvent> {
  setupSubscriptions(): void;
}
