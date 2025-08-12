// import { Routes } from '@angular/router';
// import { LoginComponent } from './auth/login/login';
// import { PatientsListComponent } from './patients/patients-list/patients-list';
// import { PatientFormComponent } from './patients/patient-form/patient-form';
// import { AuthGuard } from './auth/auth-guard';

// export const routes: Routes = [
//   { path: '', redirectTo: 'patients', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   {
//     path: 'patients',
//     canActivate: [AuthGuard],
//     children: [
//       { path: '', component: PatientsListComponent },
//       { path: 'new', component: PatientFormComponent },
//       { path: 'edit/:id', component: PatientFormComponent },
//     ],
//   },
//   { path: '**', redirectTo: 'patients' },
// ];
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { MainLayoutComponent } from './layout/layout';
import { PatientsListComponent } from './components/patients/patients-list/patients-list';
import { PatientFormComponent } from './components/patients/patient-form/patient-form';
import { AuthGuard } from './auth/auth-guard';


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
      // outras rotas aqui...
      { path: '', redirectTo: 'patients', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];