import { Component, OnInit } from '@angular/core';
import { Actor } from '../models/Actor';
import { ActorService } from '../Services/actor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.css']
})
export class AddActorComponent implements OnInit {

  //newActor: Actor;
  actors: Actor;

  constructor(private router: Router, public actorService: ActorService) { }

  ngOnInit(): void {
    this.resetActor();
  }


  resetActor(): void {
    this.actors = {
      firstname: '',
      lastname: ''
    }
  }

  addActor() {

    this.actorService.addActor(this.actors).subscribe(response => {
      if (response.success) {
        this.router.navigate(['actors']);
      }
    })
  }

}
