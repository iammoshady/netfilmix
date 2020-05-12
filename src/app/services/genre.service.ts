import { Injectable } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Genre } from '../models/genre';


const GENRES: Genre[] = [
  {
    name: "Horror"
  },

  {
    name: "Thriller"
  },


  {
    name: "Action"
  },

  {
    name: "Romantico"
  }

];


@Injectable({
  providedIn: 'root'
})
export class GenreService {



  genres: Genre[];
  selectedGenre: Genre;

  newGenre: Genre = {
    name: ""
  };


  getGenre(): Genre[]{
    this.genres = this.localStorage.retrieve("genres") || GENRES;
    return this.genres;
  }


  addGenre(): void{
    this.genres.push(this.newGenre);
    this.localStorage.store("genres", this.genres);

    this.newGenre = {
      name: ""
    }
  }



  editGenre(): void{
    this.localStorage.store("genres", this.genres);
    this.selectedGenre = null;
  }

  constructor(private localStorage:LocalStorageService) { }

}
