import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Appointment } from '../../../models/appointment.model';
import { AppointmentsService } from '../../../services/appointments.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointments-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './appointment-list.html',
  styleUrls: ['./appointment-list.scss'],
})
export class AppointmentsListComponent implements OnInit {
  appointments: Appointment[] = [];
  loading = false;
  errorMessage = '';

  constructor(private appointmentsService: AppointmentsService, private router: Router) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    this.errorMessage = '';
    this.appointmentsService.getAll().subscribe({
      next: (data) => {
        this.appointments = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar consultas';
        this.loading = false;
      },
    });
  }

  deleteAppointment(id?: number): void {
    if (!id) return;
    if (!confirm('Deseja realmente deletar esta consulta?')) return;

    this.appointmentsService.delete(id).subscribe({
      next: () => this.loadAppointments(),
      error: () => alert('Erro ao deletar consulta'),
    });
  }
}
