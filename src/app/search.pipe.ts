import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
      return it.firstName.toLowerCase().includes(searchText) || it.lastName.toLowerCase().includes(searchText)
    });
   }
}



// return item.Email.includes(term) || item.FirstName.includes(term) || item.LastName.includes(term);