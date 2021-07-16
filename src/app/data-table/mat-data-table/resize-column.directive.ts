import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[resizeColumn]'
})
export class ResizeColumnDirective implements OnInit {
  @Input() resizeColumn: number = 0;

  private startX: number = 0;
  private startWidth: number = 0;
  private pressed: boolean = false;
  private column: HTMLElement;
  private table: HTMLElement;

  constructor(private renderer: Renderer2,
              private el: ElementRef) {
  }

  ngOnInit() {
    this.column = this.el.nativeElement;
    const row = this.renderer.parentNode(this.column);
    const thead = this.renderer.parentNode(row);
    this.table = this.renderer.parentNode(thead);

    const resizer = this.renderer.createElement('span');
    resizer.style.cursor= 'col-resize';
    resizer.style.width= '20px';
    resizer.style.height= '100%';
    resizer.style.position= 'absolute';
    resizer.style.right= '-10px';
    resizer.style.top= '0';
    resizer.style.zIndex = '1';
    this.renderer.addClass(resizer, 'resize-holder');
    this.renderer.appendChild(this.column, resizer);
    this.renderer.listen(resizer, 'mousedown', this.onMouseDown);
    this.renderer.listen(this.table, 'mousemove', this.onMouseMove);
    this.renderer.listen('document', 'mouseup', this.onMouseUp);
  }

  onMouseDown = (event: MouseEvent) => {
    this.pressed = true;
    this.startX = event.pageX;
    this.startWidth = this.column.offsetWidth;
  };

  onMouseMove = (event: MouseEvent) => {
    const offset = 35;
    if (this.pressed && event.buttons) {
      this.renderer.addClass(this.table, 'resizing');

      // Calculate width of column
      let width = this.startWidth + (event.pageX - this.startX - offset);

      const rows = this.table.querySelectorAll('.mat-row');
      const tableCells = Array.from(rows).map((row: Element) => row.querySelectorAll('.mat-cell').item(this.resizeColumn));

      // Set table header width
      this.renderer.setStyle(this.column, 'width', `${width}px`);

      // Set table cells width
      for (const cell of tableCells) {
        this.renderer.setStyle(cell, 'width', `${width}px`);
      }
    }
  };

  onMouseUp = (event: MouseEvent) => {
    if (this.pressed) {
      this.pressed = false;
      this.renderer.removeClass(this.table, 'resizing');
    }
  };
}
