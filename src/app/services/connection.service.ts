import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISalesModel, SearchTerms } from '../interfaces/types';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private BASE_URL: string = "https://localhost:7037/api/Sales/Report"

  constructor(private httpClient: HttpClient) { }

  getReport(terms: SearchTerms): Observable<ISalesModel[]> {
    const url = `${this.BASE_URL}?ids=${terms.ids}&date=${terms.date}`;
    return this.httpClient.get<ISalesModel[]>(url);
  }
}
