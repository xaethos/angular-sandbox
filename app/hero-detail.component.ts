import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/switchMap';

import { HeroService } from './hero.service';

import { Hero } from './hero';

function equalHero(a: Hero, b: Hero) {
  return a.id == b.id
      && a.name == b.name
      && a.level == b.level;
}

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: [ 'hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  form: FormGroup;

  readonly hero: Observable<Hero> = this.route.params
      .map(params => +params['id'])
      .switchMap(id => this.heroService.getHero(id))
      .share();

  readonly formValue: Observable<Hero> = this.hero
      .map(hero => this.fb.group(hero))
      .do(form => this.form = form)
      .switchMap(form => form.valueChanges)
      .share();

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.formValue
        .debounceTime(1500)
        .distinctUntilChanged(equalHero)
        .subscribe(hero => console.log("hero updated:", hero as Hero));
  }

  goBack(): void {
    this.location.back();
  }
}
