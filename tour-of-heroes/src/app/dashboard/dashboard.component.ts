import { Component } from '@angular/core';
import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarLinkComponent } from '../../core/UI/navbar-link/navbar-link.component';
import { HeroLabelComponent } from '../hero-label/hero-label.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, RouterLink, NavbarLinkComponent, HeroLabelComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public heroes? : Hero[];

  constructor(
    private heroService : HeroService,
    ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  public getHeroes() {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(0, 5));
  }
}
