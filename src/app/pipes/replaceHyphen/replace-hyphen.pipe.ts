import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceHyphen'
})
export class ReplaceHyphenPipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.replace(/-/g, ' ') : value;
  }
}
