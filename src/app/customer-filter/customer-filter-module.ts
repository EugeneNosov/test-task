import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerFilter } from './components/customer-filter/customer-filter';
import { CustomSelect } from './components/custom-select/custom-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search-pipe';


@NgModule({
  declarations: [
    CustomerFilter,
    CustomSelect,
    SearchPipe
  ],
  exports: [
    CustomerFilter
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CustomerFilterModule { }
