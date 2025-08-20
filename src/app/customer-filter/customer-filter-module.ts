import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerFilter } from './components/customer-filter/customer-filter';



@NgModule({
  declarations: [
    CustomerFilter
  ],
  exports: [
    CustomerFilter
  ],
  imports: [
    CommonModule
  ]
})
export class CustomerFilterModule { }
