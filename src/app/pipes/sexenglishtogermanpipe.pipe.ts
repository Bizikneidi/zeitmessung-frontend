import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sexenglishtogermanpipe'
})
export class SexEnglishToGermanPipe implements PipeTransform {

  transform(value: string): string {
    if (value === 'f') {
      return 'w';
    }
    if (value === 'o') {
      return 's';
    }
    return 'm';
  }

}
