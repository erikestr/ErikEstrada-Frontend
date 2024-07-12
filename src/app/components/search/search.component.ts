import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmittersService } from '../../services/emitters.service';
import { SearchTerms } from '../../interfaces/types';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [
    DatePipe
  ],
  template: `
  <form [formGroup]="formSearch" class="form-container">
    <mat-form-field class="example-full-width">
      <mat-label>Numbers</mat-label>
      <input formControlName="searchInput" type="text" placeholder="Enter ids delimited by commas(,)" matInput/>
    </mat-form-field>
    <mat-form-field class="input-field-search">
      <mat-label>Ids</mat-label>
      <input formControlName="dateInput" type="date" matInput/>
    </mat-form-field>
    <button mat-button (click)="generateReport()">Generate Report</button>
  </form>
  `,
  styleUrl: './search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent { 

  public formSearch: FormGroup;

  constructor(private fb: FormBuilder,
    private emitters: EmittersService,
    private datePipe: DatePipe
  ){
    this.formSearch = fb.group({
      searchInput: fb.control('619'),
      dateInput: fb.control('2015-06-12'),
    });
  }
  generateReport(){
    let ids = this.formSearch.get('searchInput');
    let date = this.formSearch.get('dateInput');

    let searchTerms: SearchTerms = {  
      ids: ids?.value,
      date: ''+this.datePipe.transform(date?.value, 'yyyy-MM-dd')
    }
    
    console.log(searchTerms);
    
    this.emitters.searchTerm.emit(searchTerms);
  }
}
