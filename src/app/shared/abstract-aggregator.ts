import {Group} from './shared.model';
import {BehaviorSubject} from 'rxjs';
import {Sample} from '../samples/samples.model';

export abstract class Aggregator<T extends Group> {

    protected constructor(protected dataSubject: BehaviorSubject<T[]>){
    }

    abstract isGroup(index: any, item: Sample): boolean;

    abstract collapseGroup(row: Group): void;

    abstract buildGroups(data: T[]): void;

}
