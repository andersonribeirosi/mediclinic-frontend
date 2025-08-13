import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Doctor } from '../../../models/doctor.model';
import { DoctorsService } from '../../../services/doctors.service';

@Component({
  selector: 'app-doctors-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './doctors-list.html',
  styleUrls: ['./doctors-list.scss'],
})
export class DoctorsListComponent implements OnInit {
  doctors: Doctor[] = [];
  loading = false;
  errorMessage = '';

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
}
