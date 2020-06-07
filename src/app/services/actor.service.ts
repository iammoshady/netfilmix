import { Injectable } from '@angular/core';
import { Actor } from '../models/Actor';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, of } from 'rxjs';
import { CONFIG } from '../config';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class ActorService {
  actors: Actor[];
  selectedActor: Actor;
  newActor: Actor = {
    firstname: '',
    lastname: ''
  };

  constructor(
    public localStorage: LocalStorageService,
    private http: HttpClient,
    private userService: UserService
  ) { }

  getActors(): Observable<Actor[]> {
    if (this.actors) {
      return of(this.actors);
    } else {
      return this.http.get<Actor[]>(CONFIG.hostApi + '/actor/read.php').pipe(
        tap(response => this.actors = response),
      );
    }
  }

  addActor(actor: Actor): Observable<any> {

    let loggedUser = this.userService.getLoggedUser();

    if (!loggedUser) {
      alert('please login');
      return;
    }


    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': loggedUser.token
      })
    };


    return this.http.post<any>(CONFIG.hostApi + '/actor/create.php', actor, httpOptions).pipe(
      tap(response => {
        if (response.success) {
          if (this.actors) {
            actor.id = response.id;
            this.actors.push(actor);
          } else {
            this.getActors().subscribe();
          }
        }
      }),
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return of(false);
      })
    );


   /* this.actors.push(this.newActor);
    this.localStorage.store('actors', this.actors);

    this.newActor = {
      firstname: '',
      lastname: ''
    };*/
  }



  editActor(): void {
    this.localStorage.store('actors', this.actors);
    this.selectedActor = null;
  }


}