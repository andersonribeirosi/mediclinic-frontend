import { Component, OnInit } from '@angular/core';
import { Specialty } from '../../../models/specialty';
import { specialtiesService } from '../../../services/specialties.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-specialties-list',
  imports: [RouterLink],
  templateUrl: './specialties-list.html',
  styleUrl: './specialties-list.scss',
})
export class SpecialtiesList implements OnInit {
  specialties?: Specialty[]
  loading = false;
  errorMessage = '';

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
