import { Injectable } from '@angular/core';
import { Actor } from '../models/Actor';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, of } from 'rxjs';
import { CONFIG } from '../config';
import { tap, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ActorService {
  actors: Actor[];
  selectedActor: Actor;
  newActor: Actor = {
    fistname: '',
    lastname: ''
  };

  getActors(): Observable<Actor[]> {
    if (this.actors) {
      return of(this.actors);
    } else {
      return this.http.get<Actor[]>(CONFIG.hostApi + '/actor/read.php').pipe(
        tap(response => this.actors = response),
      );
    }
  }

  addActor(): void {
    this.actors.push(this.newActor);
    this.localStorage.store('actors', this.actors);

    // Reset newActor
    this.newActor = {
      fistname: '',
      lastname: ''
    };
  }

  editActor(): void {
    this.localStorage.store('actors', this.actors);
    this.selectedActor = null;
  }

  constructor(
    private localStorage: LocalStorageService,
    private http: HttpClient
  ) { }
}