import { EventEmitter, Injectable } from '@angular/core';
import { SearchTerms } from '../interfaces/types';

@Injectable({
  providedIn: 'root'
})
export class EmittersService {

  constructor() { }

  searchTerm = new EventEmitter<SearchTerms>();
}
