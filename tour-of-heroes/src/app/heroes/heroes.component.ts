import { Component } from '@angular/core';
import { Hero } from '../models/hero';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [UpperCasePipe, FormsModule, NgFor, NgIf],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent {
  public heroes : Hero[] = HEROES;
  public selectedHero : Hero ;

  constructor() {
    this.selectedHero = {id : 0, name : ""}
  }

  public onSelected(hero : Hero) {
    this.selectedHero = hero;
    console.log(this.selectedHero);
  }
}
