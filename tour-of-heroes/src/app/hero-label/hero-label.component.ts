import { Component, Input } from '@angular/core';
import { NavbarLinkComponent } from '../../core/UI/navbar-link/navbar-link.component';
import { RouterLink } from '@angular/router';
import { Hero } from '../models/hero';

@Component({
  selector: 'app-hero-label',
  standalone: true,
  imports: [NavbarLinkComponent, RouterLink],
  templateUrl: './hero-label.component.html',
  styleUrl: './hero-label.component.scss'
})
export class HeroLabelComponent {
  @Input() hero? : Hero;
}
