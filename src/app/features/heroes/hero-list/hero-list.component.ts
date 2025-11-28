import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

import { Hero } from '../../../models/hero';
import { HeroService } from '../../../core/services/hero.service';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TableModule,
    ButtonModule,
    CardModule,
    InputTextModule
  ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent implements OnInit {
  heroes: Hero[] = [];
  loading = false;

  filters = {
    name: '',
    attackPower: undefined as number | undefined,
    defensePower: undefined as number | undefined
  };

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.loadHeroes();
  }

  loadHeroes() {
    this.loading = true;

    this.heroService.getHeroes(this.filters).subscribe({
      next: (heroes) => {
        this.heroes = heroes;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Erro ao carregar heróis');
      }
    });
  }

  search() {
    this.loadHeroes();
  }

  clearFilters() {
    this.filters = {
      name: '',
      attackPower: undefined,
      defensePower: undefined
    };
    this.loadHeroes();
  }
}
