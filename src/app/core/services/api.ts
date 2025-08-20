import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IEvent } from '../interfaces/event.interface';

@Injectable({
  providedIn: 'root'
})
export class Api {
  constructor(private http: HttpClient) { }

  public getEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>('https://br-fe-assignment.github.io/customer-events/events.json').pipe(
      map((data: any) => data.events)
    );
  }
}
