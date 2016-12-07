import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/switchMap';

import { HeroService } from './hero.service';

import { Hero } from './hero';

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: [ 'hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  heroChanges: Observable<Hero>;

  heroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.heroChanges = this.route.params
        .map(params => +params['id'])
        .switchMap(id => this.heroService.getHero(id))
        .share();

    let form = this.heroChanges
        .map(hero => this.fb.group({ name: hero.name, level: 1 }))
        .share();

    this.heroChanges.subscribe(hero => this.hero = hero);
    form.subscribe(form => this.heroForm = form);

    form.switchMap(form => form.valueChanges)
        .subscribe(value => console.log("form value", value));
  }

  goBack(): void {
    this.location.back();
  }
}
