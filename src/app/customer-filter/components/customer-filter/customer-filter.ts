import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from '../../../core/interfaces/event.interface';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IEventProperty } from '../../../core/interfaces/event-property.interface';
import { IOperatorOption } from '../../../core/interfaces/operator-option.interface';

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

  private eventsByType = new Map<string, any>();
  private propertyByEvent = new Map<string, any>();

  public operatorOptions: IOperatorOption = {
    stringTab: ['equals', 'does not equal', 'contains', 'does not contain'],
    numberTab: ['equals to', 'in between', 'less than', 'greater than'],
  };

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
      properties: this.formBuilder.array([
        this.addNewProperty()
      ]),
    })
    this.formSteps.push(newStep);
  }

  public addNewProperty(): any {
    return this.formBuilder.group({
      property: this.formBuilder.control<string | null>({value: null, disabled: true}),
      operators: this.formBuilder.control<string | null>(null),
      operatorStringValue: this.formBuilder.control<string | null>(null),
      operatorStartValue: this.formBuilder.control<number>(0),
      operatorEndValue: this.formBuilder.control<number>(0),
    });
  }

  public propertiesAt(index: number): FormArray<FormGroup> {
    return this.formSteps.at(index).get('properties') as FormArray<FormGroup>;
  }

  public getEvents(): string[] {
    return this.filterEvents.map(event => event.type);
  }

  public getProperties(eventType: string): string[] {
    return this.propertyByEvent.get(eventType)?.map((item: IEventProperty) => item.property);
  }

  public showProperty(i: number, propIndex: number) {
    const prop = (this.formSteps.at(i).get('properties') as FormArray<FormGroup>).at(propIndex).get('property');
    prop?.enable({emitEvent: false});
  }

  public addPropertyRow(i: number): void {
    (this.formSteps.at(i).get('properties') as FormArray<FormGroup>).push(this.addNewProperty());
  }

  public discardFilters(): void {
    this.funnelStepsForm.reset();
    this.formSteps.clear();
  }

  public applyFilters(): void {
    console.log('Apply filters ===> ', this.funnelStepsForm);
  }

  private createStepsForm() {
    return this.formBuilder.group({
      steps: this.formBuilder.array([])
    });
  }
}
