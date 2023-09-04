import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() actualPage: number = 1;
  @Input() pageNumbers: number[] = [];
  @Output() pageChange = new EventEmitter<number>();

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }
}
