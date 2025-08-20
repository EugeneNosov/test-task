import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from '../../../core/interfaces/event.interface';

@Component({
  selector: 'app-customer-filter',
  standalone: false,
  templateUrl: './customer-filter.html',
  styleUrl: './customer-filter.scss'
})
export class CustomerFilter implements OnInit {
  @Input() public filterEvents: IEvent[] = [];

  ngOnInit() {
    console.log(this.filterEvents);
  }
}
