import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../../../models/doctor.model';
import { DoctorsService } from '../../../services/doctors.service';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './doctors-form.html',
  styleUrls: ['./doctors-form.scss'],
})
export class DoctorFormComponent implements OnInit {
  doctorId?: number;
  loading = false;
  errorMessage = '';

  doctorForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private doctorsService: DoctorsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      crm_number: ['', Validators.required],
      crm_uf: ['', [Validators.required, Validators.maxLength(2)]],
      specialty: ['', Validators.required],
      phone: [''],
      email: ['', [Validators.email]],
    });

    this.doctorId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.doctorId) {
      this.loadDoctor(this.doctorId);
    }
  }

  loadDoctor(id: number): void {
    this.loading = true;
    this.errorMessage = '';
    this.doctorsService.getById(id).subscribe({
      next: (doctor) => {
        this.doctorForm.patchValue({
          name: doctor.name,
          crm_number: doctor.crm_number,
          crm_uf: doctor.crm_uf,
          specialty: doctor.specialty,
          phone: doctor.phone,
          email: doctor.email,
        });
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar médico';
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.doctorForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const doctorData: Doctor = this.doctorForm.value;

    if (this.doctorId) {
      this.doctorsService.update(this.doctorId, doctorData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/doctors']);
        },
        error: () => {
          this.errorMessage = 'Erro ao atualizar médico';
          this.loading = false;
        },
      });
    } else {
      this.doctorsService.create(doctorData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/doctors']);
        },
        error: () => {
          this.errorMessage = 'Erro ao criar médico';
          this.loading = false;
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/doctors']);
  }
}
