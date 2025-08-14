import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Specialty } from '../models/specialty';

@Injectable({ providedIn: 'root' })
export class specialtiesService {
  private apiUrl = 'http://localhost:3000/specialties';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(this.apiUrl);
  }

  getById(id: number): Observable<Specialty> {
    return this.http.get<Specialty>(`${this.apiUrl}/${id}`);
  }

  create(specialty: Specialty): Observable<any> {
    return this.http.post(`${this.apiUrl}`, specialty);
  }

  update(id: number, specialty: Specialty): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, specialty);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
