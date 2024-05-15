import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../memory/memory.component';

@Component({
  selector: 'tvs-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input({required : true}) card:Card = new Card('',0,false,false);
  @Output() clicked = new EventEmitter<void>()

}