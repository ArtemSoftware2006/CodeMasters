import { Hero } from './../models/hero';
import { Location, NgIf, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../services/hero.service';
import { ActivatedRoute } from '@angular/router';
import { ButtonLigthComponent } from '../../core/UI/button-ligth/button-ligth.component';

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [NgIf, FormsModule, UpperCasePipe, ButtonLigthComponent],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.scss'
})
export class HeroDetailsComponent {
  @Input() public hero? : Hero;

  constructor(
    private heroService : HeroService,
    private location : Location,
    private route : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack() {
    console.log('test');
    this.location.back();
  }
}
