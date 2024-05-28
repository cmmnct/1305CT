import { Component, signal, Signal, computed, inject, WritableSignal } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Observable} from 'rxjs';
import { CardsService } from './cards.service';
import { AsyncPipe } from '@angular/common';
import { TimerPipe } from '../pipes/timer.pipe';

@Component({
  selector: 'tvs-memory',
  standalone: true,
  imports: [CardComponent, AsyncPipe, TimerPipe, AsyncPipe],
  templateUrl: './memory.component.html',
  styleUrl: './memory.component.css'
})
export class MemoryComponent{

  cardService = inject(CardsService);
  cards$!: Observable<Card[]>;
  timer = new Timer();
  cardSet = new Cardset({name:''}, {name:''});
  mute = false;
  
  onSelectSize(size: string) {
    this.timer.reset();
    this.cards$ = this.cardService.getCards$(Number(size));
  }

  onClickCard(card: Card) {
    if (!this.cardSet.card1.name) {
      this.cardSet.card1 = card;
      this.cardSet.card1.exposed = true;
      this.playSound(card.name);
    } else if (!this.cardSet.card2.name) {
      this.cardSet.card2 = card;
      this.cardSet.card2.exposed = true;
      this.playSound(card.name);
      setTimeout(() => this.evaluateMatch(this.cardSet), 2000)
    }
  }

  playSound(name:string) {
    if (!this.mute) {
      let snd = new Audio('assets/snd/' + name + '.wav');
      snd.play();
    }
  }

  evaluateMatch(cardSet:Cardset) {
    if (cardSet.card1.name === cardSet.card2.name) {
      this.cardSet.hidden();
    } else {
      this.cardSet.covered()
    }
      this.cardSet.reset()
  }
}


export class Cardset {
 constructor(public card1:Card, public card2:Card){
 }
 hidden(){
  this.card1.hidden = true;
  this.card2.hidden = true;
 }
 covered(){
  this.card1.exposed = false
  this.card2.exposed = false
 }
 reset(){
  this.card1 = {name:''}
  this.card2 = {name:''}
 }

}
export interface Card {
  name: string,
  hidden?: boolean,
  exposed?: boolean,
}

export function shuffle(array: any) {
  let m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

export class Timer {
  count = signal(0);
  timer = setInterval(() => { }, 0);
  constructor() {
  }
  reset() {
    this.count.set(0)
    clearInterval(this.timer);
    this.timer = setInterval(() => this.count.update(value => value + 1), 1000);
  }
}

