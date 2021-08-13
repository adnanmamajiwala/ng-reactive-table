import {Component, OnInit} from '@angular/core';
import {People, people} from './data';

@Component({
  selector: 'app-group-by-mat-table',
  templateUrl: './group-by-mat-table.component.html',
  styleUrls: ['./group-by-mat-table.component.scss'],
})
export class GroupByMatTableComponent implements OnInit {

  displayedColumns: string[];
  dataSource = [];
  collapsedGroups: Group[] = [];
  initialData: any [];

  constructor() {
  }

  ngOnInit() {
    this.initialData = people;
    this.displayedColumns = Object.keys(this.initialData[0]);
    this.displayedColumns.splice(3, 1);
    this.dataSource = this.groupBy(this.initialData);
  }

  /**
   * Groups the @param data by distinct values of a @param column
   * This adds group lines to the dataSource
   * @param data
   */
  groupBy(data: any[]) {
    let groups = data.reduce(this.customReducer(), {});
    let groupArray = Object.keys(groups).map(key => groups[key]);
    let flatList = groupArray.reduce((a, c) => a.concat(c), []);

    return flatList.filter((rawLine: People | Group) => (rawLine as Group).isGroup
      || this.collapsedGroups.every((group) => (rawLine as People).ukCity != group.groupName));
  }

  private customReducer() {
    return (accumulator: { [x: string]: (People | Group)[] }, currentValue: People) => {
      let groupName = currentValue.ukCity;
      if (!accumulator[groupName]) {
        accumulator[groupName] = [{
          groupName: groupName,
          isGroup: true,
          reduced: this.collapsedGroups.some((group) => group.groupName == groupName),
        }];
      }
      accumulator[groupName].push(currentValue);
      return accumulator;
    };
  }

  /**
   * Used in the view to collapse a group
   * Effectively removing it from the displayed datasource
   */
  reduceGroup(row: Group) {
    row.reduced = !row.reduced;
    if (row.reduced) {
      this.collapsedGroups.push(row);
    } else {
      this.collapsedGroups = this.collapsedGroups.filter((group) => group.groupName != row.groupName);
    }
    this.dataSource = this.groupBy(this.initialData);
  }

  /**
   * Since groups are on the same level as the data,
   * this function is used by @input(matRowDefWhen)
   */
  isGroup(index: any, item: Group): boolean {
    return item.isGroup;
  }

}

export class Group {
  reduced: boolean;
  isGroup: boolean;
  groupName: string;
}
