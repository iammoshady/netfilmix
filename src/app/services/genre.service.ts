import { Injectable } from '@angular/core';
import { Genre } from '../models/Genre';
import { LocalStorageService } from 'ngx-webstorage';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CONFIG } from '../config';
import { tap } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class GenreService {
  genres: Genre[];
  newGenre: Genre;
  selectedGenre: Genre = {
    id:0,
    name:""
  };

  constructor(public localStorage:LocalStorageService, private http: HttpClient) { }

  getGenres(): Observable<Genre[]> {
    if (this.genres) {
      return of(this.genres);
    } else {
      return this.http.get<Genre[]>(CONFIG.hostApi + '/genre/read.php').pipe(
        tap(response => this.genres = response),
      );
    }
  }

  addGenres(): void{
    this.genres.push(this.selectedGenre);
    this.localStorage.store('genres', this.genres);
    this.reset();
  }

  reset():void{
    this.selectedGenre =  {
      id:0,
      name:""  
    }
  }

  edit(){   
    this.selectedGenre = null;
    this.localStorage.store('genres', this.genres);
  }
}
