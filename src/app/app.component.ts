import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import * as firbase from 'firebase/app';
import "firebase/auth"
import "firebase/firestore"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'challenge-sulaiman';
  user: firebase.User;
  public isAdmin = false;
  constructor(private auth: AuthService,
  private router: Router) { }
   ngOnInit(): void {
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
      })
     firbase.auth().onAuthStateChanged(user => {
       if (user) {
         firbase
           .firestore()
           .doc(`Users/${user.uid}`)
           .get()
           .then(userProfileSnapshot => {
             this.isAdmin = userProfileSnapshot.data().isAdmin;
         })
       }
     })
  }
}
