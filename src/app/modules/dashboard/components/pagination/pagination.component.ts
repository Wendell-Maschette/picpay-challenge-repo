import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  activePage: number = 1;

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const pageCount = this.totalPages;
    const currentPage = this.activePage;

    if (pageCount <= 5) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    } else {
      const pageNumbers: number[] = [];
      if (currentPage <= 3) {
        pageNumbers.push(...Array.from({ length: 5 }, (_, i) => i + 1));
      } else if (currentPage >= pageCount - 2) {
        pageNumbers.push(...Array.from({ length: 5 }, (_, i) => pageCount - 4 + i));
      } else {
        pageNumbers.push(...Array.from({ length: 5 }, (_, i) => currentPage - 2 + i));
      }

      return pageNumbers;
    }
  }

  onPreviousClick() {
    if (this.activePage > 1) {
      this.activePage--;
      this.pageChange.emit(this.activePage);
    }
  }

  onNextClick() {
    if (this.activePage < this.totalPages) {
      this.activePage++;
      this.pageChange.emit(this.activePage);
    }
  }

  onPageClick(page: number) {
    this.pageChange.emit(page);
    this.activePage = page;
  }
}