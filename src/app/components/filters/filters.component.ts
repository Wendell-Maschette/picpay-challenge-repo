import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  @Input() filterForm!: FormGroup; 
  @Output() search: EventEmitter<void> = new EventEmitter<void>(); 

  onSearch(): void {
    this.search.emit();
  }
}
