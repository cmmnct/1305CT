import { Component, DoCheck, EventEmitter, Input, Output, signal } from '@angular/core';
import { Card } from '../memory/memory.component';

@Component({
  selector: 'tvs-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent{

  @Input({required : true}) card:Card =  {name:''};
  @Output() clicked = new EventEmitter<void>()

  

}