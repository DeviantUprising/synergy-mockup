import UniqueEntityID from '@global/domain/UniqueEntityID';

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): UniqueEntityID;
}
