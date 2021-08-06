import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'assignment',
  pure: false
})
export class AssignmentPipe implements PipeTransform {

  transform(value: any): any {
    return value.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

}
