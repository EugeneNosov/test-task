import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: false
})
export class SearchPipe implements PipeTransform {

  transform(value: any, searchInput: any): any[] {
    if (!searchInput) {
      return value;
    }
    return value.filter((item: string) => item.includes(searchInput));
  }

}
