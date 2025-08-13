import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterOutlet],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
})
export class MainLayoutComponent {

  constructor(private authService: AuthService, private router: Router) {

  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // redireciona para a tela de login
  }
}
