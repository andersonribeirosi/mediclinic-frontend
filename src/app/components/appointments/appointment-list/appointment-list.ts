import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Appointment } from '../../../models/appointment.model';
import { Doctor } from '../../../models/doctor.model';
import { Patient } from '../../../models/patient.model';
import { AppointmentsService } from '../../../services/appointments.service';
import { DoctorsService } from '../../../services/doctors.service';
import { PatientsService } from '../../../services/patients.service';
import { TableColumn, TableComponent } from '../../../templates/table/table';

@Component({
  selector: 'app-appointments-list',
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
    TableComponent
  ],
  templateUrl: './appointment-list.html',
  styleUrls: ['./appointment-list.scss'],
})
export class AppointmentsListComponent implements OnInit {
  appointments: Appointment[] = [];
  patients: Patient[] = [];
  doctors: Doctor[] = [];
  loading = false;
  errorMessage = '';

  // Configuração das colunas da tabela
  columns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'patient_id', label: 'Paciente' },
    { key: 'doctor_id', label: 'Médico' },
    { key: 'date', label: 'Data' },
    { key: 'time', label: 'Hora' },
    { key: 'specialty', label: 'Especialidade' },
    { key: 'reason', label: 'Motivo' },
    { key: 'status', label: 'Status' },
  ];

  constructor(
    private appointmentsService: AppointmentsService,
    private doctorsService: DoctorsService,
    private patientsService: PatientsService,
  ) { }

  ngOnInit(): void {
    // Carrega dados ao inicializar
    this.loadAppointments();
    this.loadDoctors();
    this.loadPatients();
  }

  // ---------------- FUNÇÕES DE CARREGAMENTO ----------------
  loadAppointments(): void {
    this.loading = true;  // ativa estado de carregamento
    this.errorMessage = ''; // limpa erros anteriores
    this.appointmentsService.getAll().subscribe({
      next: (data) => {
        this.appointments = data;  // popula o array de consultas
        this.loading = false;       // desativa carregamento
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar consultas'; // mensagem de erro
        this.loading = false;
      },
    });
  }

  loadPatients(): void {
    this.patientsService.getAll().subscribe({
      next: (patients) => (this.patients = patients),
      error: (err) => console.error('Erro ao carregar pacientes', err),
    });
  }

  loadDoctors(): void {
    this.doctorsService.getAll().subscribe({
      next: (doctors) => (this.doctors = doctors),
      error: (err) => console.error('Erro ao carregar médicos', err),
    });
  }

  // ---------------- FUNÇÕES AUXILIARES ----------------
  getPatientName(id: number): string {
    // Busca o nome do paciente pelo id
    return this.patients?.find(p => p.id === id)?.name || '—';
  }

  getDoctorName(id: number): string {
    // Busca o nome do médico pelo id
    return this.doctors?.find(d => d.id === id)?.name || '—';
  }

  deleteAppointment(id?: number): void {
    if (!id) return;
    if (!confirm('Deseja realmente deletar esta consulta?')) return;

    // Deleta consulta e recarrega lista
    this.appointmentsService.delete(id).subscribe({
      next: () => this.loadAppointments(),
      error: () => alert('Erro ao deletar consulta'),
    });
  }
}
