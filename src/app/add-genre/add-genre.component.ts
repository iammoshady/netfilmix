import { Component, OnInit } from '@angular/core';
import { GenreService } from '../Services/genre.service';
import { Genre } from '../models/Genre';

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.css']
})
export class AddGenreComponent implements OnInit {

  constructor(public genre: GenreService) { }

  newGenres: Genre;
  genres: Genre[];

  ngOnInit(): void {
  }

}
