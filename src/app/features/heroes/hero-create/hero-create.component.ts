import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { HeroRequest } from '../../../models/hero';
import { HeroService } from '../../../core/services/hero.service';

@Component({
  selector: 'app-hero-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ToastModule
  ],
  templateUrl: './hero-create.component.html',
  styleUrl: './hero-create.component.scss'
})
export class HeroCreateComponent {
  hero: HeroRequest = {
    name: '',
    attackPower: 0,
    defensePower: 0,
    health: 0
  };

  loading = false;

  constructor(
    private heroService: HeroService,
    private messageService: MessageService,
    private router: Router
  ) {}

  createHero() {
    this.loading = true;

    if (!this.hero.name.trim()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Nome é obrigatório'
      });
      this.loading = false;
      return;
    }

    if (this.hero.attackPower <= 0 || this.hero.defensePower <= 0 || this.hero.health <= 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Todos os poderes e vida devem ser maiores que zero'
      });
      this.loading = false;
      return;
    }

    this.heroService.createHero(this.hero).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Herói criado com sucesso!'
        });
        this.loading = false;
        this.router.navigate(['/heroes']);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao criar herói'
        });
        this.loading = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/heroes']);
  }
}
