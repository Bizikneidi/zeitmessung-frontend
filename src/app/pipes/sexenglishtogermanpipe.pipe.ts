import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sexenglishtogermanpipe'
})
export class SexenglishtogermanpipePipe implements PipeTransform {

  transform(value: string, args?: any): string {
    if (value === 'f') {
      return 'w';
    }
    if (value === 'o') {
      return 's';
    }
    return 'm';
  }

}
