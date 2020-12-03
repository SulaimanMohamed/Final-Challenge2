import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CrudService } from '../crud.service';
import * as firbase from 'firebase/app';
import "firebase/auth"
import "firebase/firestore"

interface Fixture {
    $key: string;
    fixtureTime: string;
    fixtureDate: string;
  fixtureLocation: string;
  courtFeesPaidBy: string;
  amountPaid: string;
  createdBy: string;
  courtNo: string;
 }
@Component({
  selector: 'app-fixture-list',
  templateUrl: './fixture-list.component.html',
  styleUrls: ['./fixture-list.component.css']
})
export class FixtureListComponent implements OnInit {
p: number = 1;
  user: firebase.User;    
  public isAdmin = false;
   public isTeamMember = false;
  Fixture: Fixture[];                 
  hideWhenNoFixture: boolean = false; 
  noData: boolean = false;            
  constructor(public crudApi: CrudService, 
    public toastr: ToastrService,
  private auth: AuthService,) { }

  
   
  ngOnInit(): void {
    this.dataState(); 
    let s = this.crudApi.GetFixturesList(); 
    s.snapshotChanges().subscribe(data => { 
      this.Fixture = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Fixture.push(a as Fixture);
      })
    })
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
    
  firbase.auth().onAuthStateChanged(user => {
       if (user) {
         firbase
           .firestore()
           .doc(`Users/${user.uid}`)
           .get()
           .then(userProfileSnapshot => {
             this.isTeamMember = userProfileSnapshot.data().isTeamMember;
             
         })
       }
     })
  }
  
  dataState() {     
    this.crudApi.GetFixturesList().valueChanges().subscribe(data => {
      
      if(data.length <= 0){
        this.hideWhenNoFixture = false;
        this.noData = true;
      } else {
        this.hideWhenNoFixture = true;
        this.noData = false;
      }
    })
  }

  
  deleteFixture(fixture) {
    if (window.confirm('Are sure you want to delete this Fixture?')) { 
      this.crudApi.DeleteFixture(fixture.$key) 
      this.toastr.success(fixture.fixtureLocation + ' successfully deleted!'); 
    }
  }

}
