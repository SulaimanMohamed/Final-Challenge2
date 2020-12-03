import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fixture } from './fixture';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
fixturesRef: AngularFireList<any>;    
  fixtureRef: AngularFireObject<any>;   
  newUser: any;
  
  constructor(private db: AngularFireDatabase,
    private dbs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
  public fb: FormBuilder,
    public toastr: ToastrService,) { }

 
  AddFixture(fixture: Fixture) {
    this.fixturesRef.push({
      fixtureTime: fixture.fixtureTime,
      fixtureDate: fixture.fixtureDate,
      fixtureLocation: fixture.fixtureLocation,
      courtFeesPaidBy: fixture.courtFeesPaidBy,
      amountPaid: fixture.amountPaid,
      courtNo: fixture.courtNo

    })
  }
  
  
  GetFixture(id: string) {
    this.fixtureRef = this.db.object('fixtures-list/' + id);
    return this.fixtureRef;
  }

  GetFixturesList() {
    this.fixturesRef = this.db.list('fixtures-list');
    return this.fixturesRef;
  }  

  
  UpdateFixture(fixture: Fixture) {
    this.fixtureRef.update({
      fixtureTime: fixture.fixtureTime,
      fixtureDate: fixture.fixtureDate,
      fixtureLocation: fixture.fixtureLocation,
      courtFeesPaidBy: fixture.courtFeesPaidBy,
      amountPaid: fixture.amountPaid,
      courtNo: fixture.courtNo
    
    })
  }  

  
  DeleteFixture(id: string) { 
    this.fixtureRef = this.db.object('fixtures-list/'+id);
    this.fixtureRef.remove();
  }
  
}
