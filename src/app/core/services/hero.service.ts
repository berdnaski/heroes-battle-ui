import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../../../env/env';
import { AttackRequest, Hero, HeroRequest, MessageResponse } from '../../models/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private apiUrl = `${env.apiUrl}/heroes`;

  constructor(private http: HttpClient) { }

  createHero(hero: HeroRequest): Observable<Hero> {
    return this.http.post<Hero>(this.apiUrl, hero);
  }

  getHeroes(filters?: { name?: string; attackPower?: number; defensePower?: number }): Observable<Hero[]> {
    let params = new HttpParams();
    if (filters?.name) params = params.set('name', filters.name);
    if (filters?.attackPower) params = params.set('attackPower', filters.attackPower.toString());
    if (filters?.defensePower) params = params.set('defensePower', filters.defensePower.toString());

    return this.http.get<Hero[]>(this.apiUrl, { params });
  }

  attackHero(id: string, attack: AttackRequest): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(`${this.apiUrl}/${id}/attack`, attack);
  }
}
