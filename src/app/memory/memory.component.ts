import { Component, OnInit, signal, computed } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'tvs-memory',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './memory.component.html',
  styleUrl: './memory.component.css'
})
export class MemoryComponent {

  cards = signal<Card[]>([{ "name": "dog" },
  { "name": "cat" },
  { "name": "rooster" },
  { "name": "goose" },
  { "name": "chick" },
  { "name": "cow" },
  { "name": "kitten" },
  { "name": "lamb" },
  { "name": "mouse" },
  { "name": "piglet" },
  { "name": "puppy" },
  { "name": "duck" },
  { "name": "horse" },
  { "name": "goat" },
  { "name": "sheep" },
  { "name": "hen" },
  { "name": "pig" },
  { "name": "fox" },
  { "name": "hedgehog" },
  { "name": "peacock" },
  { "name": "donkey" },
  { "name": "pigeon" }
  ])

  card1 = signal<Card>({ name: '' })
  card2 = signal<Card>({ name: '' })

  deck = computed(() => (this.shuffle(JSON.parse(JSON.stringify(this.cards().concat(this.cards()))))))

  onClickCard(card: Card) {
    if (!this.card1().name) {
      this.card1.set(card) 
      card.exposed = true;
    } else if (!this.card2().name) {
      this.card2.set(card)
      card.exposed = true;
      setTimeout(() => this.evaluateMatch(), 2000)
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
export type Card = {
  name: string,
  hidden?: boolean,
  exposed?: boolean,
  id?: number
}

