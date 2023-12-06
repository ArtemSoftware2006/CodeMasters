import { Component } from '@angular/core';
import { MessageService } from '../services/message.service';
import { NgFor, NgIf } from '@angular/common';
import { ButtonLigthComponent } from '../../core/UI/button-ligth/button-ligth.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [NgIf, NgFor, ButtonLigthComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {

  constructor(public messageService : MessageService) { }

}
