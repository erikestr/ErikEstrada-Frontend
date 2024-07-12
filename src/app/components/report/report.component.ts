import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';
import { EmittersService } from '../../services/emitters.service';
import { ISalesModel, SearchTerms } from '../../interfaces/types';
import { HttpClientModule } from '@angular/common/http';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [HttpClientModule],
  template: `
  <div>
  <table mat-table [dataSource]="dataSource" matSort #recordsToSort="matSort" #table1 class="mat-elevation-z8">
      <ng-container [matColumnDef]="table.value" *ngFor="let table of showInTable">
          <th mat-header-cell *matHeaderCellDef>{{ table.name }}</th> 
          <td mat-cell *matCellDef="let row">{{ row[table.value] == 0 ? '': row[table.value] }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="showHideColumn sticky: true"></tr>
      <tr mat-row *matRowDef="let rowData; columns: showHideColumn" [ngClass]="rowData.status"></tr>
  </table>
</div>
  `,
  styleUrl: './report.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportComponent implements AfterViewInit {
  
  @ViewChild('recordsToSort') recordsSort = new MatSort();

  dataSource: any = [];
  showInTable: any[] = [
    { name: 'C. Costos', value: 'id', show: true },
    { name: 'Nombre', value: 'name', show: true },
    { name: 'Ventas', value: 'sales', show: true },
    { name: 'Gastos', value: 'expenses', show: true },
    { name: 'Utilidad', value: 'utility', show: true },
  ];

  constructor(private connectionService: ConnectionService,
    private emitters: EmittersService
  ) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.recordsSort;

    this.emitters.searchTerm.subscribe((terms: SearchTerms) => {
      this.connectionService.getReport(terms).subscribe({
        next: (response: any) => {
          this.dataSource.data = response;
          // this.dataSource.sort = this.recordsSort;
          console.log(response);
          
        },
        error: err => {
          alert(`Error: ${err.message}`);
        }
      });
    })
  }

  get showHideColumn(): string[] {
    return this.showInTable
      .filter((element) => {
        return element.show === true;
      })
      .map((element) => {
        return element.value;
      });
  }
}
