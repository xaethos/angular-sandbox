import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/share'

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ]
})
export class DashboardComponent {
  heroes: Observable<Hero[]>;

  constructor(private heroService: HeroService) {
    this.heroes = heroService.getHeroes()
        .map(heroes => heroes.slice(1,5))
        .share();
  }
}
