import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Appointment } from '../../../models/appointment.model';
import { AppointmentsService } from '../../../services/appointments.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DoctorsService } from '../../../services/doctors.service';
import { PatientsService } from '../../../services/patients.service';
import { Doctor } from '../../../models/doctor.model';
import { Patient } from '../../../models/patient.model';

@Component({
  selector: 'app-appointments-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './appointment-list.html',
  styleUrls: ['./appointment-list.scss'],
})
export class AppointmentsListComponent implements OnInit {
  appointments: Appointment[] = [];
  patients: Patient[] = [];
  doctors: Doctor[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private appointmentsService: AppointmentsService,
    private router: Router,
    private doctorsService: DoctorsService,
    private patientsService: PatientsService,
  ) { }

  ngOnInit(): void {
    this.loadAppointments();
    this.loadDoctors()
    this.loadPatients()
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

  loadPatients(): void {
    this.loading = true;
    this.errorMessage = '';

    this.patientsService.getAll().subscribe({
      next: (patients) => {
        this.patients = patients;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar pacientes';
        console.error(err);
        this.loading = false;
      }
    });
  }

  loadDoctors(): void {
    this.loading = true;
    this.errorMessage = '';

    this.doctorsService.getAll().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar médicos';
        console.error(err);
        this.loading = false;
      }
    });
  }

  getPatientName(id: number): string {
    return this.patients?.find(p => p.id === id)?.name || '—';
  }

  getDoctorName(id: number): string {
    return this.doctors?.find(d => d.id === id)?.name || '—';
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
