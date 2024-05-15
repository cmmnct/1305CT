import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'tvs-memory',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './memory.component.html',
  styleUrl: './memory.component.css'
})
export class MemoryComponent {

cards:CardT[] = [ {"name":"dog"},
{"name":"cat"}, 
{"name":"rooster"}, 
{"name":"goose"}, 
{"name":"chick"}, 
{"name":"cow"}, 
{"name":"kitten"}, 
{"name":"lamb"}, 
{"name":"mouse"}, 
{"name":"piglet"}, 
{"name":"puppy"}, 
{"name":"duck"}, 
{"name":"horse"}, 
{"name":"goat"}, 
{"name":"sheep"}, 
{"name":"hen"}, 
{"name":"pig"}, 
{"name":"fox"}, 
{"name":"hedgehog"}, 
{"name":"peacock"}, 
{"name":"donkey"}, 
{"name":"pigeon"}
]
cards2:CardT[] = [ {"name":"dog"},
{"name":"cat"}, 
{"name":"rooster"}, 
{"name":"goose"}, 
{"name":"chick"}, 
{"name":"cow"}, 
{"name":"kitten"}, 
{"name":"lamb"}, 
{"name":"mouse"}, 
{"name":"piglet"}, 
{"name":"puppy"}, 
{"name":"duck"}, 
{"name":"horse"}, 
{"name":"goat"}, 
{"name":"sheep"}, 
{"name":"hen"}, 
{"name":"pig"}, 
{"name":"fox"}, 
{"name":"hedgehog"}, 
{"name":"peacock"}, 
{"name":"donkey"}, 
{"name":"pigeon"}
]

//card1:Card = new Card('',0,false,false)
//card2:Card = new Card('',0,false,false)

card1:CardT = {name:''}
card2:CardT = {name:''}

deck = this.shuffle(JSON.parse(JSON.stringify([...this.cards].concat(...this.cards))));

  

onClickCard(card:Card){
  if (!this.card1.name){
    this.card1 = card;
    card.exposed = true;
  } else if (!this.card2.name){
    this.card2 = card;
    card.exposed = true;
    setTimeout(() => this.evaluateMatch(),2000)
  }

}

evaluateMatch(){
if(this.card1?.name === this.card2?.name){
  this.card1.hidden = true;
  this.card2.hidden = true; 
} else {
 this.card1.exposed = false
 this.card2.exposed = false
}
this.card1 = new Card('',0,false,false);
this.card2 = new Card('',0,false,false);
}

shuffle(array:any) {
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
export type CardT = {
name:string,
hidden?:boolean,
exposed?:boolean,
id?:number
}

export class Card  {
  constructor(public name:string,
  public id:number,
  public exposed:boolean,
  public hidden: boolean){
  }
 
}

