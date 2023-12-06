import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-link',
  standalone: true,
  imports: [],
  templateUrl: './navbar-link.component.html',
  styleUrl: './navbar-link.component.scss'
})
export class NavbarLinkComponent {
  @Input() text? : string;
}
