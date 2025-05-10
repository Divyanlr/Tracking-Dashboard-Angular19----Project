import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Individual } from '../models/individual.model';
import mockData from '../data/mock-data.json';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private mockData: Individual[] = mockData.individuals as Individual[];

  constructor(private http: HttpClient) { }

  getIndividuals(): Observable<Individual[]> {
    return of(this.mockData);
  }
}