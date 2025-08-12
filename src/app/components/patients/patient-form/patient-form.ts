import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Patient } from '../patient.model';
import { PatientsService } from '../../../services/patients.service';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './patient-form.html',
  styleUrls: ['./patient-form.scss'],
})
export class PatientFormComponent implements OnInit {
  patientId?: number;
  loading = false;
  errorMessage = '';

  patientForm!: FormGroup; // Declare sem inicializar

  constructor(
    private fb: FormBuilder,
    private patientsService: PatientsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Inicializa o form aqui
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      phone: ['', Validators.required],
      specialty: ['', Validators.required],
      service_date: ['', Validators.required],
    });

    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.patientId) {
      this.loadPatient(this.patientId);
    }
  }

  loadPatient(id: number): void {
    this.loading = true;
    this.errorMessage = '';
    this.patientsService.getById(id).subscribe({
      next: (patient) => {
        this.patientForm.patchValue({
          name: patient.name,
          cpf: patient.cpf,
          phone: patient.phone,
          specialty: patient.specialty,
          service_date: patient.service_date ? patient.service_date.substring(0, 10) : '',
        });
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar paciente';
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.patientForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const patientData: Patient = this.patientForm.value;

    if (this.patientId) {
      this.patientsService.update(this.patientId, patientData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/patients']);
        },
        error: () => {
          this.errorMessage = 'Erro ao atualizar paciente';
          this.loading = false;
        },
      });
    } else {
      this.patientsService.create(patientData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/patients']);
        },
        error: () => {
          this.errorMessage = 'Erro ao criar paciente';
          this.loading = false;
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/patients']);
  }
}
