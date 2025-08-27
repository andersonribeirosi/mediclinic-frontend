import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../models/patient.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientsService } from '../../../services/patients.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './patients-list.html',
  styleUrls: ['./patients-list.scss'],
})
export class PatientsListComponent implements OnInit {
  patients: Patient[] = [];
  loading = false;
  errorMessage = '';

  constructor(private patientsService: PatientsService, private router: Router) { }

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.loading = true;
    this.errorMessage = '';
    this.patientsService.getAll().subscribe({
      next: (data) => {
        this.patients = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar pacientes';
        this.loading = false;
      },
    });
  }

  deletePatient(id?: number): void {
    if (!id) return;
    if (!confirm('Deseja realmente deletar este paciente?')) return;

    this.patientsService.delete(id).subscribe({
      next: () => this.loadPatients(),
      error: () => alert('Erro ao deletar paciente'),
    });
  }
}
