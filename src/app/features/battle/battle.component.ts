import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// PrimeNG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';

import { Hero, MessageResponse } from '../../models/hero';
import { HeroService } from '../../core/services/hero.service';

@Component({
  selector: 'app-battle',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputNumberModule,
    ToastModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    ToolbarModule,
    TagModule
  ],
  templateUrl: './battle.component.html',
  styleUrl: './battle.component.scss'
})
export class BattleComponent implements OnInit {
  hero: Hero | null = null;
  attackValue: number = 0;
  loading = false;
  attacking = false;
  battleResult: MessageResponse | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadHero();
  }

  loadHero(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.showErrorMessage('ID do herói não encontrado');
      this.navigateToHeroList();
      return;
    }

    this.loading = true;

    this.heroService.getHeroById(id).subscribe({
      next: (hero) => {
        this.hero = hero;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar herói:', err);
        this.hero = null;
        this.loading = false;
        this.showErrorMessage('Erro ao carregar dados do herói');
      }
    });
  }

  attack(): void {
    if (!this.hero) return;

    this.attacking = true;

    this.heroService.attackHero(this.hero.id, this.attackValue).subscribe({
      next: (result) => {
        this.battleResult = result;
        this.attacking = false;

        this.loadHero(); // recarrega hero atualizado
        this.showInfoMessage(result.message);
      },
      error: (err) => {
        console.error('Erro ao atacar:', err);
        this.attacking = false;
        this.showErrorMessage(err.error?.message || 'Erro ao executar ataque');
      }
    });
  }

  navigateToHeroList(): void {
    this.router.navigate(['/heroes']);
  }

  getHealthSeverity(health: number): 'success' | 'warning' | 'danger' {
    if (health > 70) return 'success';
    if (health > 40) return 'warning';
    return 'danger';
  }

  calculatePredictedDamage(): number {
    if (!this.hero || this.attackValue <= this.hero.defensePower) {
      return 0;
    }
    return this.attackValue - this.hero.defensePower;
  }

  calculatePredictedHealth(): number {
    if (!this.hero) return 0;
    const damage = this.calculatePredictedDamage();
    return Math.max(0, this.hero.health - damage);
  }

  private showErrorMessage(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: message
    });
  }

  private showInfoMessage(message: string): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Resultado da Batalha',
      detail: message,
      life: 5000
    });
  }
}
