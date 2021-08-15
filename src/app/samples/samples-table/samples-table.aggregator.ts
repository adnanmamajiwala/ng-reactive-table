import {Aggregator} from '../../shared/abstract-data-source';
import {Sample} from '../samples.model';
import {Group} from '../../shared/shared.model';
import {BehaviorSubject} from 'rxjs';

export class SamplesTableAggregator extends Aggregator<Sample> {

  private collapsedGroups = new Set<string>();
  private map = new Map<string, Sample[]>();

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
    this.map.forEach((value, key) => {
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
    this.map = new Map<string, Sample[]>();
    const grouped: Sample[] = [];
    data.forEach(sample => {
      const groupByColumn = sample.org;
      if (!this.map.has(groupByColumn)) {
        const header = new Sample();
        header.groupName = groupByColumn;
        header.isGroup = true;
        this.map.set(groupByColumn, [header]);
        grouped.push(header);
      }
      sample.reduced = false;
      grouped.push(sample);
      this.map.get(groupByColumn)?.push(sample);
    });
    this.dataSubject.next(grouped);
  }

}
