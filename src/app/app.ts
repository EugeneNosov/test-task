import { Component, OnInit } from '@angular/core';
import { Api } from './core/services/api';
import { IEvent } from './core/interfaces/event.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  public events: IEvent[] = [];

  constructor(private api: Api) {
  }

  ngOnInit() {
    this.api.getEvents().subscribe((events: IEvent[]) => this.events = events);
  }
}
