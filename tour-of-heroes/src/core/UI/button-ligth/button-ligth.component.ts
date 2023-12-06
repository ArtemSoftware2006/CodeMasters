import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-ligth',
  standalone: true,
  imports: [],
  templateUrl: './button-ligth.component.html',
  styleUrl: './button-ligth.component.scss'
})
export class ButtonLigthComponent {
  @Input() public text? : string;
  @Output() buttonClick: EventEmitter<any> = new EventEmitter();

  onClick() {
    this.buttonClick.emit();
  }
}
