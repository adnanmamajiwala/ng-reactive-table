import {Sample} from '../samples.model';
import {Group} from '../../shared/shared.model';
import {Aggregator} from '../../shared/abstract-aggregator';

export class SamplesTableAggregator extends Aggregator<Sample> {

  private collapsedGroups = new Set<string>();
  private groupsMap = new Map<string, Sample[]>();

  collapseGroup(row: Group): Sample[] {
    if (this.collapsedGroups.has(row.groupName)) {
      this.collapsedGroups.delete(row.groupName);
    } else {
      this.collapsedGroups.add(row.groupName);
    }
    const grouped: Sample[] = [];
    this.groupsMap.forEach((value, key) => {
      if (this.collapsedGroups.has(key)) {
        value[0].reduced = true;
        grouped.push(value[0]);
      } else {
        value[0].reduced = false;
        grouped.push(...value);
      }
    });
    return grouped;
  }

  buildGroups(data: Sample[]): Sample[] {
    this.collapsedGroups = new Set<string>();
    this.groupsMap = new Map<string, Sample[]>();
    let firstGroup = new Group();
    for (let i = 0; i < data.length; i++) {
      const sample = data[i];
      const groupByColumn = sample.org;
      if (!this.groupsMap.has(groupByColumn)) {
        const header = new Sample();
        header.groupName = groupByColumn;
        header.isGroup = true;
        header.reduced = true;
        this.groupsMap.set(groupByColumn, [header]);
        if(i == 0) firstGroup = header;
      }
      this.collapsedGroups.add(groupByColumn);
      this.groupsMap.get(groupByColumn)?.push(sample);
    }
    return this.collapseGroup(firstGroup);
  }

}
