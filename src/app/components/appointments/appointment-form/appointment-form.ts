import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Appointment } from '../../../models/appointment.model';
import { AppointmentsService } from '../../../services/appointments.service';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './appointment-form.html',
  styleUrls: ['./appointment-form.scss'],
})
export class AppointmentFormComponent implements OnInit {
  appointmentId?: number;
  loading = false;
  errorMessage = '';

  appointmentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appointmentsService: AppointmentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      patient_id: ['', Validators.required],
      doctor_id: ['', Validators.required],
      specialty: [''],
      date: ['', Validators.required],
      time: ['', Validators.required],
      reason: [''],
      notes: [''],
      status: ['scheduled'],
    });

    this.appointmentId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.appointmentId) {
      this.loadAppointment(this.appointmentId);
    }
  }

  loadAppointment(id: number): void {
    this.loading = true;
    this.errorMessage = '';
    this.appointmentsService.getById(id).subscribe({
      next: (appointment) => {
        this.appointmentForm.patchValue({
          patient_id: appointment.patient_id,
          doctor_id: appointment.doctor_id,
          specialty: appointment.specialty,
          date: appointment.date,
          time: appointment.time,
          reason: appointment.reason,
          notes: appointment.notes,
          status: appointment.status || 'scheduled',
        });
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar consulta';
        this.loading = false;
      },
    });
  }

  private mapFormToAppointment(): Appointment {
    const form = this.appointmentForm.value;
    return {
      patient_id: form.patient_id,
      doctor_id: form.doctor_id,
      specialty: form.specialty,
      date: form.date,
      time: form.time,
      reason: form.reason,
      notes: form.notes,
      status: form.status,
    };
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const appointmentData: Appointment = this.mapFormToAppointment();

    if (this.appointmentId) {
      this.appointmentsService.update(this.appointmentId, appointmentData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/appointments']);
        },
        error: () => {
          this.errorMessage = 'Erro ao atualizar consulta';
          this.loading = false;
        },
      });
    } else {
      this.appointmentsService.create(appointmentData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/appointments']);
        },
        error: () => {
          this.errorMessage = 'Erro ao criar consulta';
          this.loading = false;
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/appointments']);
  }
}
