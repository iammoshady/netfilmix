import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { LocalStorageService } from 'ngx-webstorage';
import { newUser } from '../models/newUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';

 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedUser:User;
  favoritesFilm: [];
  users:User[];
  newUsers:newUser[];
  newUser:newUser={
    username:"",
    password:"",
    newFirstname:"",
    newLastname:"",
    newUsername:"",
    newPassword:""
  };

  constructor(
    public localStorage:LocalStorageService,
    private http:HttpClient
    ) { }

  error:String = ''
  login(username: string, password: string): boolean {
    this.http.post<User>('http://netflix.cristiancarrino.com/user/login.php',{
      "username":username,
      "password":password
    }).subscribe(response =>{
      console.log(response);
      this.loggedUser = response
      this.localStorage.store('loggedUser', this.loggedUser);
    })

    

    return this.loggedUser != null;
  }

  logout(){
    this.loggedUser = null;
    this.localStorage.clear("loggedUser");
  }

  getLoggedUser():User{
    this.loggedUser = this.localStorage.retrieve('loggedUser');
    return this.loggedUser;
  }

  editUser(){   
    let result = true;
    this.newUser.username = this.loggedUser.username;
    this.newUser.password = this.loggedUser.password;
    if(this.newUser.newFirstname.length == 0 && this.newUser.newLastname.length == 0 && this.newUser.newUsername.length == 0 &&this.newUser.newPassword.length ==0){
      result = false;
      this.error = 'Devi modificare almeno un campo'
    }else{
      this.localStorage.store('newUsers', this.newUser);
      this.error =''
      console.log(this.newUser)
    }

    //console.log(this.newUser)
    }

  /*edit(){   
    this.localStorage.store('films', this.films);
    this.selectedFilm = null;
  }*/
}
