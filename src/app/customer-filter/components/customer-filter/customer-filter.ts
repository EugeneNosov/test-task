import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from '../../../core/interfaces/event.interface';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IEventProperty } from '../../../core/interfaces/event-property.interface';

@Component({
  selector: 'app-customer-filter',
  standalone: false,
  templateUrl: './customer-filter.html',
  styleUrl: './customer-filter.scss'
})
export class CustomerFilter implements OnInit {
  @Input() public filterEvents: IEvent[] = [];

  public funnelSteps = ['Step 1'];
  public funnelStepsForm!: FormGroup;

  private eventsByType = new Map<string, any>()
  private propertyByEvent = new Map<string, any>()

  constructor(private formBuilder: FormBuilder) {
  }


  ngOnInit() {
    console.log(this.filterEvents);
    this.funnelStepsForm = this.createStepsForm();

    this.filterEvents.forEach(event => {
      this.propertyByEvent.set(event.type, event.properties);
      this.eventsByType.set(event.type, event);
    });
  }

  public get formSteps() {
    return this.funnelStepsForm?.get('steps') as FormArray<FormGroup>;
  }

  public addNewStep(): void {
    const newStep = this.formBuilder.group({
      event: this.formBuilder.control<string | null>(null),
      property: this.formBuilder.control<string | null>({ value: null, disabled: true }),
    })
    this.formSteps.push(newStep);
  }

  public getEvents(): string[] {
    return this.filterEvents.map(event => event.type);
  }

  public getProperties(eventType: string): string[] {
    return this.propertyByEvent.get(eventType)?.map((item: IEventProperty) => item.property);
  }

  public showProperty(i: number) {
    const prop = this.formSteps.at(i).get('property');
    prop?.enable({ emitEvent: false });   // show the select
  }

  public discardFilters(): void {
    this.funnelStepsForm.reset();
    this.formSteps.clear();
  }

  public applyFilters(): void {
    console.log('Apply filters ===>');
  }

  private createStepsForm() {
    return this.formBuilder.group({
      steps: this.formBuilder.array([])
    });
  }
}
