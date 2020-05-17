import Entity from '@global/domain/Entity';
import { IDomainEvent } from '@global/domain/events/IDomainEvent';
import DomainEvents from '@global/domain/events/DomainEvents';
import UniqueEntityID from '@global/domain/UniqueEntityID';

export default abstract class AggregateRoot<T> extends Entity<T> {
  private domainEvents: IDomainEvent[] = [];

  public getDomainEvents = (): IDomainEvent[] => this.domainEvents;

  public getId = (): UniqueEntityID => this.id;

  protected addDomainEvent = (domainEvent: IDomainEvent): void => {
    // Add the domain event to this aggregate's list of domain events
    this.domainEvents.push(domainEvent);
    // Add this aggregate instance to the domain event's list of aggregates who's
    // events it eventually needs to dispatch.
    DomainEvents.markAggregateForDispatch(this);
  };

  public clearEvents = (): void => {
    this.domainEvents.splice(0, this.domainEvents.length);
  };
}
