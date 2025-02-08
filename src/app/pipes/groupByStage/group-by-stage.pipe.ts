import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupByStage',
  pure: true
})
export class GroupByStagePipe implements PipeTransform {
  transform(evolutions: any[]): any[] {
    const grouped = evolutions.reduce((acc, evo) => {
      if (!acc[evo.stage]) {
        acc[evo.stage] = [];
      }
      acc[evo.stage].push(evo);
      return acc;
    }, {} as { [key: number]: any[] });

    return Object.keys(grouped).map(key => grouped[Number(key)]);
  }
}
