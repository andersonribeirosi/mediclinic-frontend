import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../../../models/doctor.model';
import { DoctorsService } from '../../../services/doctors.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
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
    // if (this.doctorForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const doctorData: Doctor = this.doctorForm.value;

    console.log(doctorData);
    
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
