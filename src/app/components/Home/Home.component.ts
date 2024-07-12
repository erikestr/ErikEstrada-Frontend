import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { ReportComponent } from '../report/report.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    ReportComponent
  ],
  template: `
  <div class="container">
    <app-search/>
    <app-report/>
  </div>
  `,
  styleUrl: './Home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { }
