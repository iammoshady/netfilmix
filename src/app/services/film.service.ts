import { Injectable } from '@angular/core';
import { Film } from '../models/film';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';


const FILMS: Film[] = [
  {
    title: "Titolo 1",
    description: "Descrizione 1",
    director: "Registab 1",
    duration: "1h40m",
    releaseYear: 1990,
    stars:0.5,
    cast: [
      {
        firstname: "Leonardo",
        lastname: "Di Caprio"
      }
    ],
    genres: [
      {
        name: "Romantici",
      },

      {
        name: "Azione",
      }
    ],
    tags: "bambini, natale"
  },

  {
    title: "Titolo 2",
    description: "Descrizione 2",
    director: "Registab 2",
    duration: "1h40m",
    releaseYear: 1990,
    stars: 1,
    cast: [
      {
        firstname: "Luca",
        lastname: "Baglio"
      },


      {
        firstname: "Renato",
        lastname: "Pozzetto"
      }
    ],
    genres: [
      {
        name: "Horror",
      },

      {
        name: "Thriller",
      }
    ],
    tags: "Estate, Vacanze"
  },

  {
    title: "Titolo 3",
    description: "Descrizione 3",
    director: "Registab 3",
    duration: "1h40m",
    releaseYear: 1990,
    stars:1.5,
    cast: [
      {
        firstname: "Leonardo",
        lastname: "Di Caprio"
      }
    ],
    genres: [
      {
        name: "Romantici",
      },

      {
        name: "Azione",
      }
    ],
    tags: "bambini, natale"
  },


  {
    title: "Titolo 4",
    description: "Descrizione 4",
    director: "Registab 4",
    duration: "1h40m",
    releaseYear: 1990,
    stars: 5,
    cast: [
      {
        firstname: "Leonardo",
        lastname: "Di Caprio"
      }
    ],
    genres: [
      {
        name: "Romantici",
      },

      {
        name: "Azione",
      }
    ],
    tags: "bambini, natale"
  },


  {
    title: "Titolo 5",
    description: "Descrizione 5",
    director: "Registab 5",
    duration: "1h40m",
    releaseYear: 1990,
    stars: 2,
    cast: [
      {
        firstname: "Leonardo",
        lastname: "Di Caprio"
      }
    ],
    genres: [
      {
        name: "Romantici",
      },

      {
        name: "Azione",
      }
    ],
    tags: "bambini, natale"
  },



  {
    title: "Titolo 6",
    description: "Descrizione 6",
    director: "Registab 6",
    duration: "1h40m",
    releaseYear: 1990,
    stars: 4.5,
    cast: [
      {
        firstname: "Leonardo",
        lastname: "Di Caprio"
      }
    ],
    genres: [
      {
        name: "Romantici",
      },

      {
        name: "Azione",
      }
    ],
    tags: "bambini, natale"
  },



  {
    title: "Titolo 7",
    description: "Descrizione 7",
    director: "Registab 7",
    duration: "1h40m",
    releaseYear: 1990,
    stars: 2.5,
    cast: [
      {
        firstname: "Leonardo",
        lastname: "Di Caprio"
      }
    ],
    genres: [
      {
        name: "Romantici",
      },

      {
        name: "Azione",
      }
    ],
    tags: "bambini, natale"
  },

  {
    title: "Titolo 8",
    description: "Descrizione 8",
    director: "Registab 8",
    duration: "1h40m",
    releaseYear: 1990,
    stars: 3,
    cast: [
      {
        firstname: "Leonardo",
        lastname: "Di Caprio"
      }
    ],
    genres: [
      {
        name: "Romantici",
      },

      {
        name: "Azione",
      }
    ],
    tags: "bambini, natale"
  },
];

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  films: Film[];
  selectedFilm: Film;

  newFilm: Film = {
    title: "",
    description: "",
    director: "",
    duration: "",
    releaseYear: 0,
    stars: 0,
    cast: [],
    genres: [],
    tags: ""
  };


  getFilms(): Film[]{
    this.films = this.localStorage.retrieve("films") || FILMS;
    return this.films;
  }


  addFilm(): void{
    if(!this.films){
      this.getFilms();
    }
    
    this.films.push(this.newFilm);
    this.localStorage.store("films", this.films);

    this.newFilm = {
      title: "",
      description: "",
      director: "",
      duration: "",
      releaseYear: 0,
      stars: 0,
      cast: [],
      genres: [],
      tags: ""
    }
  }



  editFilm(): void{
    this.localStorage.store("films", this.films);
    this.selectedFilm = null;
  }


  getLastFilms(): Film[] {
    if(!this.films){
      this.getFilms();
    }
      
    return this.films.slice(-4);
  }


  getTopFilms(): Film[] {
    if(!this.films){
      this.getFilms();
    }

    return this.films.sort((film1, film2) => {
      if(film1.stars > film2.stars){
        return -1;
      }

      return 0;
    }).slice(0, 3);
  }

  constructor(private localStorage:LocalStorageService) { }
}
