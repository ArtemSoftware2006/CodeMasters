import { HeroService } from './../services/hero.service';
import { Component, NgModule } from '@angular/core';
import { Hero } from '../models/hero';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { RouterLink } from '@angular/router';
import { NavbarLinkComponent } from '../../core/UI/navbar-link/navbar-link.component';
import { HeroLabelComponent } from '../hero-label/hero-label.component';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [UpperCasePipe, FormsModule, NgFor, NgIf, HeroDetailsComponent, RouterLink, NavbarLinkComponent, HeroLabelComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export class HeroesComponent {
  public heroes? : Hero[];
  public selectedHero? : Hero ;

  constructor(private heroService : HeroService) {
  }

  ngOnInit(): void {
   this.getheroes();
  }

  public getheroes() {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
