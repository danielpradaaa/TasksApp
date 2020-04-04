import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filferCompleted',
  pure: false
})
export class FilferCompletedPipe implements PipeTransform {

  transform(lists: Lista[], completed: boolean = true): Lista[] {
    return lists.filter(list => list.completada === completed);
  }

}
