import {Aggregator} from '../../shared/abstract-data-source';
import {Sample} from '../samples.model';
import {Group} from '../../shared/shared.model';
import {BehaviorSubject} from 'rxjs';

export class SamplesTableAggregator extends Aggregator<Sample> {

  private collapsedGroups = new Set<string>();
  private groupsMap = new Map<string, Sample[]>();

  constructor(dataSubject: BehaviorSubject<Sample[]>) {
    super(dataSubject);
  }

  isGroup(index: any, item: Sample): boolean {
    return item.isGroup;
  }

  collapseGroup(row: Group): void {
    if (this.collapsedGroups.has(row.groupName)) {
      this.collapsedGroups.delete(row.groupName);
    } else {
      this.collapsedGroups.add(row.groupName);
    }
    const grouped: Sample[] = [];
    this.groupsMap.forEach((value, key) => {
      if(this.collapsedGroups.has(key)){
        value[0].reduced = true;
        grouped.push(value[0]);
      } else {
        value[0].reduced = false;
        grouped.push(...value);
      }
    })
    this.dataSubject.next(grouped);
  }

  groupBy(data: Sample[]): void {
    this.collapsedGroups = new Set<string>();
    this.groupsMap = new Map<string, Sample[]>();
    const grouped: Sample[] = [];
    data.forEach(sample => {
      const groupByColumn = sample.org;
      if (!this.groupsMap.has(groupByColumn)) {
        const header = new Sample();
        header.groupName = groupByColumn;
        header.isGroup = true;
        this.groupsMap.set(groupByColumn, [header]);
        grouped.push(header);
      }
      sample.reduced = false;
      grouped.push(sample);
      this.groupsMap.get(groupByColumn)?.push(sample);
    });
    this.dataSubject.next(grouped);
  }

}
