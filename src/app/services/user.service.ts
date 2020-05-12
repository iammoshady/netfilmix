import { Injectable } from '@angular/core';
import { User } from '../models/user';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedUser: User;


  constructor(private localStorage:LocalStorageService) { }


  logIn(): void {
    this.loggedUser = {
      firstname: "Momo",
      lastname:  "Shady",
      favoritesfilm: []
    }
    this.localStorage.store("loggedUser", this.loggedUser);
  }

  logout(): void {
    this.loggedUser = null;
    this.localStorage.clear("loggedUser");
  }


  getLoggedUser(): void {
    this.loggedUser = this.localStorage.retrieve("loggedUser");
  }



}
