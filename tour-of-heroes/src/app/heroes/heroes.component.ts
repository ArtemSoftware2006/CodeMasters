import { HeroService } from './../services/hero.service';
import { Component } from '@angular/core';
import { Hero } from '../models/hero';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [UpperCasePipe, FormsModule, NgFor, NgIf, HeroDetailsComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent {
  public heroes? : Hero[];
  public selectedHero : Hero ;

  constructor(private heroService : HeroService,
    private messageService : MessageService) {
    this.selectedHero = {id : 0, name : ""};
  }

  ngOnInit(): void {
   this.getheroes();
  }

  public getheroes() {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  public onSelected(hero : Hero) {
    this.messageService.addMessage(`Selected hero with id = ${hero.id}`);
    this.selectedHero = hero;
  }
}
