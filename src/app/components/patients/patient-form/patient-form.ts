import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Patient } from '../../../models/patient.model';
import { PatientsService } from '../../../services/patients.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './patient-form.html',
  styleUrls: ['./patient-form.scss'],
})
export class PatientFormComponent implements OnInit {
  patientId?: number;
  loading = false;
  errorMessage = '';

  patientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientsService: PatientsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      rg: [''],
      birth_date: ['', Validators.required],
      gender: [''],
      phone: ['', Validators.required],
      email: [''],
      address_street: [''],
      address_number: [''],
      address_complement: [''],
      address_neighborhood: [''],
      address_city: [''],
      address_state: [''],
      address_zip: [''],
      emergency_name: [''],
      emergency_phone: [''],
      emergency_relationship: [''],
      health_plan_name: [''],
      health_plan_card_number: [''],
      health_plan_validity: [''],
      observations: [''],
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
      next: (data) => {
        // Monta um paciente compatível com a interface Patient
        const patient: Patient = {
          ...data,

          street: data.street,
          number: data.number,
          complement: data.complement,
          neighborhood: data.neighborhood,
          city: data.city,
          state: data.state,
          zip: data.zip,


          emergency_name: data.emergency_name,
          emergency_phone: data.emergency_phone,
          emergency_relationship: data.emergency_relationship,

          health_plan_name: data.health_plan_name,
          health_plan_card: data.health_plan_card,
          health_plan_validity: data.health_plan_validity,
        };

        this.patientForm.patchValue({
          name: patient.name,
          cpf: patient.cpf,
          rg: patient.rg,
          birth_date: patient.birth_date ? patient.birth_date.substring(0, 10) : '',
          gender: patient.gender,
          phone: patient.phone,
          email: patient.email,
          address_street: patient.street,
          address_number: patient.number,
          address_complement: patient.complement,
          address_neighborhood: patient.neighborhood,
          address_city: patient.city,
          address_state: patient.state,
          address_zip: patient.zip,
          emergency_name: patient.emergency_name,
          emergency_phone: patient.emergency_phone,
          emergency_relationship: patient.emergency_relationship,
          health_plan_name: patient.health_plan_name,
          health_plan_card_number: patient.health_plan_card,
          health_plan_validity: patient.health_plan_validity
            ? patient.health_plan_validity.substring(0, 10)
            : '',
          observations: patient.observations,
        });

        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar paciente';
        this.loading = false;
      },
    });
  }

  private mapFormToPatient(): Patient {
    const form = this.patientForm.value;
    return {
      name: form.name,
      cpf: form.cpf,
      rg: form.rg,
      birth_date: form.birth_date,
      gender: form.gender,
      phone: form.phone,
      email: form.email,
      street: form.address_street,
      number: form.address_number,
      complement: form.address_complement,
      neighborhood: form.address_neighborhood,
      city: form.address_city,
      state: form.address_state,
      zip: form.address_zip,
      emergency_name: form.emergency_name,
      emergency_phone: form.emergency_phone,
      emergency_relationship: form.emergency_relationship,
      health_plan_name: form.health_plan_name,
      health_plan_card: form.health_plan_card_number,
      health_plan_validity: form.health_plan_validity + '-01',
      observations: form.observations,
    };
  }

  states = [
    { acronym: 'AC', state: 'Acre' },
    { acronym: 'AL', state: 'Alagoas' },
    { acronym: 'AP', state: 'Amapá' },
    { acronym: 'AM', state: 'Amazonas' },
    { acronym: 'BA', state: 'Bahia' },
    { acronym: 'CE', state: 'Ceará' },
    { acronym: 'DF', state: 'Distrito Federal' },
    { acronym: 'ES', state: 'Espírito Santo' },
    { acronym: 'GO', state: 'Goiás' },
    { acronym: 'MA', state: 'Maranhão' },
    { acronym: 'MT', state: 'Mato Grosso' },
    { acronym: 'MS', state: 'Mato Grosso do Sul' },
    { acronym: 'MG', state: 'Minas Gerais' },
    { acronym: 'PA', state: 'Pará' },
    { acronym: 'PB', state: 'Paraíba' },
    { acronym: 'PR', state: 'Paraná' },
    { acronym: 'PE', state: 'Pernambuco' },
    { acronym: 'PI', state: 'Piauí' },
    { acronym: 'RJ', state: 'Rio de Janeiro' },
    { acronym: 'RN', state: 'Rio Grande do Norte' },
    { acronym: 'RS', state: 'Rio Grande do Sul' },
    { acronym: 'RO', state: 'Rondônia' },
    { acronym: 'RR', state: 'Roraima' },
    { acronym: 'SC', state: 'Santa Catarina' },
    { acronym: 'SP', state: 'São Paulo' },
    { acronym: 'SE', state: 'Sergipe' },
    { acronym: 'TO', state: 'Tocantins' }
  ];


  onSubmit(): void {
    if (this.patientForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const patientData: Patient = this.mapFormToPatient();

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