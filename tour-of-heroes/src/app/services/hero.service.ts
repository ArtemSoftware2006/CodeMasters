import { Injectable } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { Hero } from '../models/hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService : MessageService) { }

  public getHeroes() : Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.addMessage("Fetch to Heroes!");
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.addMessage(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}
