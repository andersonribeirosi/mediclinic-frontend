import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterOutlet],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
})
export class MainLayoutComponent {}
