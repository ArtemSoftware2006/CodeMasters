import { Hero } from './../models/hero';
import { NgIf, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [NgIf, FormsModule, UpperCasePipe],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.scss'
})
export class HeroDetailsComponent {
  @Input() public hero? : Hero;
}
