import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Specialty } from '../../../models/specialty';
import { specialtiesService } from '../../../services/specialties.service';
import { TableColumn, TableComponent } from '../../../templates/table/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-specialties-list',
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
  templateUrl: './specialties-list.html',
  styleUrl: './specialties-list.scss',
})
export class SpecialtiesList implements OnInit {
  specialties?: Specialty[]
  loading = false;
  errorMessage = '';

  columns: TableColumn[] = [
    { key: 'name', label: 'Especialidade' }
  ];

  constructor(
    private specialtiesService: specialtiesService
  ) { }

  ngOnInit(): void {
    this.loadSpecialties()
  }

  loadSpecialties() {
    this.loading = true;
    this.errorMessage = '';

    this.specialtiesService.getAll().subscribe({
      next: (specialties) => {
        this.specialties = specialties
        this.loading = false
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar pacientes';
        this.loading = false;
      }
    })
  }

  deleteSpecialty(id: number): void {

    if (!id) return
    if (!confirm('Deseja realmente deletar este paciente?')) return;

    this.specialtiesService.delete(id).subscribe({
      next: () => this.loadSpecialties(),
      error: () => alert('Erro ao deletar a especialidade'),
    })
  }
}
