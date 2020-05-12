import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { Film } from '../models/film';
import { Actor } from '../models/actor';
import { Genre } from '../models/genre';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  films: Film[];

  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
    this.films = this.filmService.getFilms();
  }

  getCastList(cast: Actor[]): string{
    return cast.map(x => x.firstname + " " + x.lastname).join(", ");
  }


  getGenreList(genres: Genre[]): string{
    return genres.map(x => x.name).join(", ");
  }



  selecThisFilm(film: Film): void{
    event.stopPropagation();
    this.filmService.selectedFilm = film;
  }

}
