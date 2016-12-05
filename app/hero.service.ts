import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/map'

import { Hero } from './hero'
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {
  getHeroes(): Observable<Hero[]> {
    return Observable.of(HEROES).delay(300);
  }

  getHero(id: number): Observable<Hero> {
    return this.getHeroes()
        .map(heroes => heroes.find(hero => hero.id === id));
  }
}
