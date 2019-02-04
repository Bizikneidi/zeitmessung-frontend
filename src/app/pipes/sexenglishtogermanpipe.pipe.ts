import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sexenglishtogermanpipe'
})
export class SexEnglishToGermanPipe implements PipeTransform {

  /**
   *converts english sex attribute to german sex attribute
   *
   * @param {string} value
   * @returns {string}
   * @memberof SexEnglishToGermanPipe
   */
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
