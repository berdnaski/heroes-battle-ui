import { Routes } from '@angular/router';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroCreateComponent } from './hero-create/hero-create.component';

export const HEROES_ROUTES: Routes = [
  { path: '', component: HeroListComponent },
  { path: 'create', component: HeroCreateComponent }
];
