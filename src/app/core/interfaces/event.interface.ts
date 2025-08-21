import { IEventProperty } from './event-property.interface';

export interface IEvent {
  type: string;
  properties: IEventProperty[]
}
