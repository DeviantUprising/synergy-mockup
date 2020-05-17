import { IDomainEvent } from '@global/domain/events/IDomainEvent';
import AggregateRoot from '@global/domain/AggregateRoot';
import UniqueEntityID from '@global/domain/UniqueEntityID';

export default class DomainEvents {
  private static handlersMap: any = {};

  private static markedAggregates: AggregateRoot<any>[] = [];

  /**
   * @method markAggregateForDispatch
   * @static
   * @desc Called by aggregate root objects that have created domain
   * events to eventually be dispatched when the infrastructure commits
   * the unit of work.
   */

  public static markAggregateForDispatch = (
    aggregate: AggregateRoot<any>
  ): void => {
    const aggregateFound = !!DomainEvents.findMarkedAggregateByID(
      aggregate.getId()
    );

    if (!aggregateFound) {
      DomainEvents.markedAggregates.push(aggregate);
    }
  };

  private static dispatchAggregateEvents = (
    aggregate: AggregateRoot<any>
  ): void => {
    aggregate
      .getDomainEvents()
      .forEach((event: IDomainEvent) => DomainEvents.dispatch(event));
  };

  private static removeAggregateFromMarkedDispatchList = (
    aggregate: AggregateRoot<any>
  ): void => {
    const index = DomainEvents.markedAggregates.findIndex((a) =>
      a.equals(aggregate)
    );
    DomainEvents.markedAggregates.splice(index, 1);
  };

  private static findMarkedAggregateByID = (
    id: UniqueEntityID
  ): AggregateRoot<any> => {
    let found: unknown = null;

    DomainEvents.markedAggregates.forEach((aggregate) => {
      if (aggregate.getId().equals(id)) {
        found = aggregate;
      }
    });

    return found as AggregateRoot<any>;
  };

  // This must be changed to conform to typescript and eslint rules
  public static dispatchEventsForAggregate = (id: UniqueEntityID): void => {
    const aggregate = DomainEvents.findMarkedAggregateByID(id);

    if (aggregate) {
      DomainEvents.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      DomainEvents.removeAggregateFromMarkedDispatchList(aggregate);
    }
  };

  public static register(
    callback: (event: IDomainEvent) => void,
    eventClassName: string
  ): void {
    if (
      !Object.prototype.hasOwnProperty.call(
        DomainEvents.handlersMap,
        eventClassName
      )
    ) {
      DomainEvents.handlersMap[eventClassName] = [];
    }

    DomainEvents.handlersMap[eventClassName].push(callback);
  }

  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  public static clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }

  private static dispatch(event: IDomainEvent): void {
    const eventClassName: string = event.constructor.name;

    if (
      Object.prototype.hasOwnProperty.call(
        DomainEvents.handlersMap,
        eventClassName
      )
    ) {
      const handlers: any[] = DomainEvents.handlersMap[eventClassName];
      handlers.forEach((handler) => {
        handler(event);
      });
    }
  }
}
