import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {People, people} from './data';

@Component({
  selector: 'app-group-by-mat-table',
  templateUrl: './group-by-mat-table.component.html',
  styleUrls: ['./group-by-mat-table.component.scss'],
})
export class GroupByMatTableComponent implements OnInit {

  displayedColumns = ['surname', 'forename', 'gender', 'salary', 'department'];
  dataSource: People[] = [];
  collapsedGroups = new Set<string>();
  initialData: People [];
  map = new Map<string, People[]>();

  constructor(private changeDetRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.initialData = people.sort((a, b) => {
      const comp = a.ukCity.localeCompare(b.ukCity);
      return comp === 0 ? a.surname.localeCompare(b.surname) : comp;
    });
    this.dataSource = this.groupBy();
  }

  reduceGroup(row: People) {
    if (this.collapsedGroups.has(row.groupName)) {
      this.collapsedGroups.delete(row.groupName);
    } else {
      this.collapsedGroups.add(row.groupName);
    }
    this.toggle(row.groupName);
    this.dataSource = this.groupBy();
  }

  isGroup(index: any, item: People): boolean {
    return item.isGroup;
  }

  isVisible(index: any, item: People): boolean {
    return !item.reduced && !item.isGroup;
  }

  groupBy(): People[] {
    const set = new Set<string>();
    const groups: People[] = [];

    this.initialData.forEach(value => {
      const isCollapsed = this.collapsedGroups.has(value.ukCity);

      if (!set.has(value.ukCity)) {
        set.add(value.ukCity);
        const group = new People();
        group.groupName = value.ukCity;
        group.isGroup = true;
        group.reduced = isCollapsed;
        groups.push(group);
        this.map.set(value.ukCity, [group]);
      }

      value.reduced = isCollapsed;
      value.groupName = value.ukCity;
      value.isGroup = false;
      this.map.get(value.ukCity)?.push(value);
      if (!isCollapsed) {
        groups.push(value);
      }
    });
    return groups;
  }

  private toggle(groupName: string) {
    const group: People[] = this.map.get(groupName) || [];
    for (let i = 1; i < group.length; i++) {
      group[i].reduced = !group[i].reduced;
    }
  }
}
