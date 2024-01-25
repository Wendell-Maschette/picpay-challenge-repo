import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    const pageCount = this.totalPages;
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  onPageClick(page: number) {
    this.pageChange.emit(page);
  }
}
