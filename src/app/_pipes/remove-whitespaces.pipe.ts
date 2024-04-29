import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeWhitespaces',
  standalone: true
})
export class RemoveWhitespacesPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/\s/g, '');
  }
}
