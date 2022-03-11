import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'reorderTags'
})
export class ReorderTags implements PipeTransform{
  transform<T>(value:T[], perRow: number) {
      let rows: T[][] = [];
      for (let i = 0; i < value.length; i += perRow) {
        rows.push(value.slice(i, i + perRow))
    }
    return rows;
  }
}
