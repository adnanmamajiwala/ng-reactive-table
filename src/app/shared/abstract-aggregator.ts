import {Group} from './shared.model';

export abstract class Aggregator<T extends Group> {

    abstract isGroup(item: Group): boolean;

    abstract collapseGroup(row: Group): T[];

    abstract buildGroups(data: T[]): T[];

}
