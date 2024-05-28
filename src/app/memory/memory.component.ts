import { Component, OnInit, signal, Signal, computed, inject, WritableSignal } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Observable } from 'rxjs';
import { CardsService } from './cards.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { TimerPipe } from '../pipes/timer.pipe';

@Component({
  selector: 'tvs-memory',
  standalone: true,
  imports: [CardComponent, AsyncPipe, TimerPipe],
  templateUrl: './memory.component.html',
  styleUrl: './memory.component.css'
})
export class MemoryComponent implements OnInit {

  cardService = inject(CardsService)
  cards!: Signal<Card[]>
  cards$!: Observable<Card[]>
  timer: number = 0
  counter = setInterval(() => { }, 1000);

  ngOnInit(): void {
    this.cards = this.cardService.getCards()
   
  }
  
  onSelectSize(size: string) {
    this.timer = 0;
    clearInterval(this.counter);
    this.cards$ = this.cardService.getCards$(Number(size));
    this.counter = setInterval(() => this.count(), 1000)
  }

  count() {
    this.timer++
  }

  fieldsize = signal<number>(5);
  selection = computed(() => this.shuffle(this.cards().slice(0, Math.round(Math.pow(this.fieldsize(), 2)) / 2)))

  card1 = signal<Card>({ name: '' })
  card2 = signal<Card>({ name: '' })
  mute = false


  deck = computed(() => (this.shuffle(JSON.parse(JSON.stringify(this.selection().concat(this.selection()))))))

  onClickCard(card: Card) {
    if (!this.card1().name) {
      this.card1.set(card)
      card.exposed = true;
      this.playSound(card);
    } else if (!this.card2().name) {
      this.card2.set(card)
      card.exposed = true;
      this.playSound(card);
      setTimeout(() => this.evaluateMatch(), 2000)
    }
  }

  playSound(card: Card) {
    if (!this.mute) {
      let snd = new Audio('assets/snd/' + card.name + '.wav');
      snd.play();
    }
  }

  evaluateMatch() {
    if (this.card1().name === this.card2().name) {
      this.card1().hidden = true;
      this.card2().hidden = true;
    } else {
      this.card1().exposed = false
      this.card2().exposed = false
    }
    this.card1.set({ name: '' })
    this.card2.set({ name: '' })
  }

  shuffle(array: any) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }
}
export interface Card {
  name: string,
  hidden?: boolean,
  exposed?: boolean,
}

