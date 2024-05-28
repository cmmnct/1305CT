import { Component, signal, Signal, computed, inject, WritableSignal } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Observable } from 'rxjs';
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
export class MemoryComponent {
  cardService = inject(CardsService);
  cards$!: Observable<Card[]>;
  gameState = {
    step: 0,
    mute: false,
    timer : new Timer()
  }
  cardSet = new Cardset([{ name: '' }, { name: '' }]);
  
  // the flow of the entire game in three basic declarative functions

  onSelectSize(size: string) {  //init of the game after selecting field size
    this.cards$ = this.cardService.getCards$(Number(size)); //loading the random set of cards
    this.gameState.timer.reset();  // resetting and starting the timer
  }

  onClickCard(card: Card) {  // handling the click events of the cards
    switch (this.gameState.step) {
      case 0: this.cardSet.set(card, 0)  // turning the first card
              this.gameState.step++ // updating gameState
              break;
      case 1: this.cardSet.set(card, 1) // turing the second card
              this.gameState.step++ // updating gameState
              setTimeout(() => this.evaluateMatch(this.cardSet), 2000) // setting  two seconds time out then evaluating match
              break;
    }
  }

  evaluateMatch(cardSet: Cardset) {
    if (cardSet.cards[0].name === cardSet.cards[1].name) {  // comparing the cards
      this.cardSet.hidden();  // hide them (take them out) when equal
    } else {                  // or
      this.cardSet.covered()  // turn the cards back 
    }
    this.cardSet.reset()      // reset the cards for the next cycle
    this.gameState.step = 0   // reset the game cycle for the new cards to be turned
  }
}

// end of game flow. The folling code in imperative code, types and utils

export class Cardset {
  constructor(public cards: Card[]) {
  }
  set(card: Card, index:number) {
    this.cards[index] = card;
    card.exposed = true;
    this.playSound(card.name);
  }
  hidden() {
    this.cards.forEach(card => card.hidden = true)
  }
  covered() {
    this.cards.forEach(card => card.exposed = false)
  }
  reset() {
    this.cards.forEach(card => { name: '' })
  }
  playSound(name: string) {
    let snd = new Audio('assets/snd/' + name + '.wav');
    snd.play();
  }

}
export interface Card {
  name: string,
  hidden?: boolean,
  exposed?: boolean,
}

export interface gameState{
  step:number,
  mute:boolean,
  timer:Timer
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

