import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() title = '';
  @Input() selected: string[] | undefined = [];
  @Input() list: string[] = [];
  @Output() update = new EventEmitter<string[]>();

  @ViewChild('search') input: ElementRef;

  originalList: string[];
  selectedSet = new Set<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.originalList = this.list;
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          const value = this.input.nativeElement.value;
          if (value.length > 1) {
            this.list = this.originalList.filter((val) => val.toLowerCase().includes(value.toLowerCase()));
          } else {
            this.list = this.originalList;
          }
        })
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!!this.selected) {
      this.selected.forEach(value => this.selectedSet.add(value));
    } else {
      this.selectedSet = new Set<string>();
    }
  }

  onClick(value: string) {
    this.selectedSet.add(value);
    this.updateSelected();
  }

  remove(value: string) {
    this.selectedSet.delete(value);
    this.updateSelected();
  }

  private updateSelected() {
    this.selected = Array.from(this.selectedSet.values());
    this.update.emit(this.selected);
  }
}
