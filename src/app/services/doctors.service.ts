import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';

@Injectable({ providedIn: 'root' })
export class DoctorsService {
  private apiUrl = 'http://localhost:3000/doctors';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }

  getById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
  }

  create(doctor: Doctor): Observable<any> {
    return this.http.post(`${this.apiUrl}`, doctor);
  }

  update(id: number, doctor: Doctor): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, doctor);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
