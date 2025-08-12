import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../models/patient.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientsService } from '../../../services/patients.service';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './patients-list.html',
  styleUrls: ['./patients-list.scss'],
})
export class PatientsListComponent implements OnInit {
  patients: Patient[] = [];
  loading = false;
  errorMessage = '';

  constructor(private patientsService: PatientsService, private router: Router) {}

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
