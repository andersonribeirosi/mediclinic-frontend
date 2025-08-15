import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Specialty } from '../../../models/specialty';
import { specialtiesService } from '../../../services/specialties.service';

@Component({
  selector: 'app-specialties-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './specialties-form.html',
  styleUrl: './specialties-form.scss'
})
export class SpecialtiesForm implements OnInit {
  specialtyId?: number;
  loading = false;
  errorMessage = '';

  specialtyForm!: FormGroup;

  constructor(
    private specialtiesService: specialtiesService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.specialtyForm = this.fb.group({
      name: ['', Validators.required]
    })

    this.specialtyId = Number(this.route.snapshot.paramMap.get('id'))

    if (this.specialtyId) {
      this.loadSpecialty(this.specialtyId)
    }
  }

  loadSpecialty(id: number): void {
    this.loading = true;
    this.errorMessage = '';
    this.specialtiesService.getById(id).subscribe({
      next: (data) => {
        const specialty: Specialty = {
          ...data,
          name: data.name
        };

        this.specialtyForm.patchValue({
          name: specialty.name
        })

        this.loading = false
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar a especialidade';
        this.loading = false;
      }
    })
  }

  private mapFormToPatient(): Specialty {
    const form = this.specialtyForm.value;
    return {
      name: form.name,
    };
  }

  onSubmit(): void {
    if (this.specialtyForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const patientData: Specialty = this.mapFormToPatient();

    if (this.specialtyId) {
      this.specialtiesService.update(this.specialtyId, patientData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/specialties']);
        },
        error: () => {
          this.errorMessage = 'Erro ao atualizar a especialidade';
          this.loading = false;
        },
      });
    } else {
      this.specialtiesService.create(patientData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/specialties']);
        },
        error: () => {
          this.errorMessage = 'Erro ao criar especialidade';
          this.loading = false;
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/specialties']);
  }
}
