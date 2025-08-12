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
  ) { }

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      patient_id: ['', Validators.required],
      date: ['', Validators.required],
      doctor: ['', Validators.required],
      specialty: ['', Validators.required],
      notes: [''],
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
          date: appointment.date.substring(0, 16), // 'yyyy-MM-ddTHH:mm' formato para datetime-local
          doctor: appointment.doctor,
          specialty: appointment.specialty,
          notes: appointment.notes,
        });
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar consulta';
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const appointmentData: Appointment = this.appointmentForm.value;

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
