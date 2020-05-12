import { Injectable } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Actor } from '../models/actor';


const ACTORS: Actor[] = [
  {
    firstname: "Leonardo",
    lastname: "Di Caprio",
  },

  {
    firstname: "Paolo",
    lastname: "Villaggio",
  },


  {
    firstname: "Renato",
    lastname: "Pozzetto",
  }

];

@Injectable({
  providedIn: 'root'
})
export class ActorService {


    actors: Actor[];
    selectedActor: Actor;
  
    newActor: Actor = {
      firstname: "",
      lastname: ""
    };
  
  
    getActor(): Actor[]{
      this.actors = this.localStorage.retrieve("actors") || ACTORS;
      return this.actors;
    }
  
  
    addActor(): void{
      this.actors.push(this.newActor);
      this.localStorage.store("actors", this.actors);
  
      this.newActor = {
        firstname: "",
        lastname: ""
      }
    }
  
  
  
    editActor(): void{
      this.localStorage.store("actors", this.actors);
      this.selectedActor = null;
    }
  
    constructor(private localStorage:LocalStorageService) { }
}
