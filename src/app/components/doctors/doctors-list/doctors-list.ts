import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Doctor } from '../../../models/doctor.model';
import { DoctorsService } from '../../../services/doctors.service';
import { TableColumn, TableComponent } from '../../../templates/table/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-doctors-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    TableComponent,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './doctors-list.html',
  styleUrls: ['./doctors-list.scss'],
})
export class DoctorsListComponent implements OnInit {
  doctors: Doctor[] = [];
  loading = false;
  errorMessage = '';

  statusFilter: 'all' | 'active' | 'inactive' = 'all';
  filteredDoctors: Doctor[] = [];

  columns: TableColumn[] = [
    { key: 'name', label: 'Nome' },
    { key: 'crm_number', label: 'CRM' },
    { key: 'crm_uf', label: 'UF' },
    { key: 'specialty', label: 'Especialidade' },
    { key: 'phone', label: 'Telefone' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status' }, // nova coluna de status
  ];

  constructor(private doctorsService: DoctorsService, private router: Router) { }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.loading = true;
    this.errorMessage = '';
    this.doctorsService.getAll().subscribe({
      next: (data) => {
        this.doctors = data;
        this.loading = false;

        this.applyFilter();
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar médicos';
        this.loading = false;
      },
    });
  }

  deleteDoctor(id?: number): void {
    if (!id) return;
    if (!confirm('Deseja realmente deletar este médico?')) return;

    this.doctorsService.delete(id).subscribe({
      next: () => this.loadDoctors(),
      error: () => alert('Erro ao deletar médico'),
    });
  }

  applyFilter(): void {
    if (this.statusFilter === 'all') {
      this.filteredDoctors = [...this.doctors];
    } else if (this.statusFilter === 'active') {
      this.filteredDoctors = this.doctors.filter(doc => doc.active);
    } else {
      this.filteredDoctors = this.doctors.filter(doc => !doc.active);
    }
  }
}
