import { Injectable } from '@angular/core';
import { Film } from '../models/film';
import { LocalStorageService } from 'ngx-webstorage';
import { CONFIG } from '../config';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class FilmService {
  films: Film[];
  newFilm: Film = {
    id: 0,
    title: "",
    description: "",
    director: "",
    duration: "",
    releaseYear: 0,
    stars: 0,
    cast: null,
    genres: null,
    tags: "",
    coverUrl: ""
  };
  selectedFilm: Film;


  constructor(
    public localStorage: LocalStorageService,
    private http: HttpClient,
    private userService: UserService) { }


  getFilms(): Observable<Film[]> {
    if (this.films) {
      return of(this.films);
    } else {
      return this.http.get<Film[]>(CONFIG.hostApi + '/film/read.php').pipe(
        tap(response => {
          this.films = response;
        }),
        catchError(error => {
          alert(error.status + ': ' + error.error);
          return [];
        })
      );
    }
  }

  addFilm(film: Film): Observable<any> {
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

    return this.http.post<any>(CONFIG.hostApi + '/film/create.php', film, httpOptions).pipe(
      tap(response => {
        if (response.success) {
          if (this.films) {
            film.id = response.id;
            this.films.push(film);
          } else {
            this.getFilms().subscribe();
          }
        }
      }),
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return of(false);
      })
    );
  }

  editFilm(film: Film): Observable<any> {
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

    return this.http.post<any>(CONFIG.hostApi + '/film/update.php', film, httpOptions).pipe(
      tap(response => {
        if (response.success) {
          if (this.films) {
            let filmToEdit = this.films.find(x => x.id == film.id);
            filmToEdit = film;
          } else {
            this.getFilms().subscribe();
          }
        }
      }),
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return of(false);
      })
    );
  }


  removeFilm(film: Film): Observable<any> {
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

    return this.http.post<any>(CONFIG.hostApi + '/film/delete.php', { id: film.id }, httpOptions).pipe(
      tap(response => {
        if (response.success) {
          if (this.films) {
            this.films = this.films.filter(x => x.id != film.id);
          } else {
            this.getFilms().subscribe();
          }
        }
      }),
      catchError(error => {
        alert(error.status + ': ' + error.error);
        return of(false);
      })
    );
  }

  getLastFilms(films: Film[]): Film[] {

    return films.slice(-4)
  }

  getTopFilms(films: Film[]): Film[] {
    return films.sort(function (film1, film2) {
      if (film1.stars > film2.stars)
        return -1;
    }).slice(0, 4);
  }
}
