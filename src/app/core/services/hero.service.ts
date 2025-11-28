import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AttackRequest, Hero, HeroRequest, MessageResponse } from '../../models/hero';
import { env } from '../../../env/env';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private apiUrl = `${env.apiUrl}/heroes`;

  constructor(private http: HttpClient) { }

  createHero(hero: HeroRequest): Observable<Hero> {
    return this.http.post<Hero>(this.apiUrl, hero);
  }

  getHeroes(filters?: { name?: string; attackPower?: number | null; defensePower?: number | null }): Observable<Hero[]> {
    let params = new HttpParams();

    if (filters?.name && filters.name.trim() !== '') {
      params = params.set('name', filters.name);
    }

    if (filters?.attackPower !== null && filters?.attackPower !== undefined && filters.attackPower > 0) {
      params = params.set('attackPower', filters.attackPower.toString());
    }

    if (filters?.defensePower !== null && filters?.defensePower !== undefined && filters.defensePower > 0) {
      params = params.set('defensePower', filters.defensePower.toString());
    }

    return this.http.get<Hero[]>(this.apiUrl, { params });
  }

  getHeroById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.apiUrl}/${id}`);
  }

  attackHero(id: string, attackValue: number): Observable<MessageResponse> {
    const attackRequest: AttackRequest = { attackValue };
    return this.http.put<MessageResponse>(`${this.apiUrl}/${id}/attack`, attackRequest);
  }
}
