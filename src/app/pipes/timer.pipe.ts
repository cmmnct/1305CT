import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer',
  standalone: true
})
export class TimerPipe implements PipeTransform {

  transform(value: number): string {
    let minutes = Math.trunc(value/60);
    let seconds = value % 60;
    return (minutes < 10 ? '0' + minutes : '' + minutes) + ' : ' + (seconds < 10 ? '0' + seconds : seconds)
  }

}
