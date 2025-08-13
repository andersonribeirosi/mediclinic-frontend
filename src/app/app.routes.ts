import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { MainLayoutComponent } from './layout/layout';
import { PatientsListComponent } from './components/patients/patients-list/patients-list';
import { PatientFormComponent } from './components/patients/patient-form/patient-form';
import { AuthGuard } from './auth/auth-guard';
import { AppointmentFormComponent } from './components/appointments/appointment-form/appointment-form';
import { AppointmentsListComponent } from './components/appointments/appointment-list/appointment-list';
import { DoctorsListComponent } from './components/doctors/doctors-list/doctors-list';
import { DoctorFormComponent } from './components/doctors/doctors-form/doctors-form';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      
      { path: 'patients', component: PatientsListComponent },
      { path: 'patients/new', component: PatientFormComponent },
      { path: 'patients/edit/:id', component: PatientFormComponent },

      { path: 'appointments', component: AppointmentsListComponent },
      { path: 'appointments/new', component: AppointmentFormComponent },
      { path: 'appointments/edit/:id', component: AppointmentFormComponent },
    
      { path: 'doctors', component: DoctorsListComponent },
      { path: 'doctors/new', component: DoctorFormComponent },
      { path: 'doctors/edit/:id', component: DoctorFormComponent },
      // outras rotas aqui...
      { path: '', redirectTo: 'patients', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];