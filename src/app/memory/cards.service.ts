import { HttpClient} from '@angular/common/http';
import { Injectable, inject, Signal  } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Card } from './memory.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
http = inject(HttpClient);

cards!:Signal<Card[]>
  constructor() {
    this.cards = toSignal(this.http.get<Card[]>('https://my-json-server.typicode.com/cmmnct/memoryGame/cards'), {initialValue: [] as Card[]})
}

getCards(){
  return this.cards
}

getCards$(size:number):Observable<Card[]>{
  return this.http.get<Card[]>('https://my-json-server.typicode.com/cmmnct/memoryGame/cards').pipe(
    map(cards => {
      let selection:Card[] = this.shuffle(cards);
      size = Math.floor(Math.pow(size,2)/2);
      selection = selection.slice(0,size);
      return this.shuffle(JSON.parse(JSON.stringify(selection.concat(selection))))
      
    })
  )
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
