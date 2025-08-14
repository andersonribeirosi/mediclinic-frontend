import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../../../models/appointment.model';
import { Doctor } from '../../../models/doctor.model';
import { Patient } from '../../../models/patient.model';
import { AppointmentsService } from '../../../services/appointments.service';
import { DoctorsService } from '../../../services/doctors.service';
import { PatientsService } from '../../../services/patients.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_DATE_FORMATS = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatMomentDateModule,
  ],
  templateUrl: './appointment-form.html',
  styleUrls: ['./appointment-form.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class AppointmentFormComponent implements OnInit {
  patients?: Patient[]
  doctors?: Doctor[]
  appointmentId?: number;
  loading = false;
  errorMessage = '';

  appointmentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appointmentsService: AppointmentsService,
    private patientsService: PatientsService,
    private doctorsService: DoctorsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadPatients()
    this.loadDoctors()
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

  specialties = [
    { specialty: 'Alergologia e Imunologia' },
    { specialty: 'Anestesiologia' },
    { specialty: 'Angiologia' },
    { specialty: 'Cardiologia' },
    { specialty: 'Cirurgia Cardiovascular' },
    { specialty: 'Cirurgia da Mão' },
    { specialty: 'Cirurgia de Cabeça e Pescoço' },
    { specialty: 'Cirurgia do Aparelho Digestivo' },
    { specialty: 'Cirurgia Geral' },
    { specialty: 'Cirurgia Pediátrica' },
    { specialty: 'Cirurgia Plástica' },
    { specialty: 'Cirurgia Torácica' },
    { specialty: 'Cirurgia Vascular' },
    { specialty: 'Clínica Médica' },
    { specialty: 'Coloproctologia' },
    { specialty: 'Dermatologia' },
    { specialty: 'Endocrinologia e Metabologia' },
    { specialty: 'Endoscopia' },
    { specialty: 'Gastroenterologia' },
    { specialty: 'Genética Médica' },
    { specialty: 'Geriatria' },
    { specialty: 'Ginecologia e Obstetrícia' },
    { specialty: 'Hematologia e Hemoterapia' },
    { specialty: 'Homeopatia' },
    { specialty: 'Infectologia' },
    { specialty: 'Mastologia' },
    { specialty: 'Medicina de Emergência' },
    { specialty: 'Medicina de Família e Comunidade' },
    { specialty: 'Medicina do Trabalho' },
    { specialty: 'Medicina Esportiva' },
    { specialty: 'Medicina Física e Reabilitação' },
    { specialty: 'Medicina Intensiva' },
    { specialty: 'Medicina Legal e Perícia Médica' },
    { specialty: 'Medicina Nuclear' },
    { specialty: 'Medicina Preventiva e Social' },
    { specialty: 'Nefrologia' },
    { specialty: 'Neurocirurgia' },
    { specialty: 'Neurologia' },
    { specialty: 'Nutrologia' },
    { specialty: 'Oftalmologia' },
    { specialty: 'Oncologia Clínica' },
    { specialty: 'Ortopedia e Traumatologia' },
    { specialty: 'Otorrinolaringologia' },
    { specialty: 'Patologia' },
    { specialty: 'Patologia Clínica/Medicina Laboratorial' },
    { specialty: 'Pediatria' },
    { specialty: 'Pneumologia' },
    { specialty: 'Psiquiatria' },
    { specialty: 'Radiologia e Diagnóstico por Imagem' },
    { specialty: 'Radioterapia' },
    { specialty: 'Reumatologia' },
    { specialty: 'Urologia' }
  ];

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
        this.errorMessage = 'Erro ao carregar pacientes';
        console.error(err);
        this.loading = false;
      }
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
      appointmentData.date = appointmentData.date.split('T')[0]
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
