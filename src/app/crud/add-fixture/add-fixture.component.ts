import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CrudService } from '../crud.service';
import * as firbase from 'firebase/app';
import "firebase/auth"
import "firebase/firestore"

@Component({
  selector: 'app-add-fixture',
  templateUrl: './add-fixture.component.html',
  styleUrls: ['./add-fixture.component.css']
})
export class AddFixtureComponent implements OnInit {
  user: firebase.User;
  date: any;
  public isAdmin = false;
   public fixtureForm: FormGroup;  
  constructor(public crudApi: CrudService,
    public fb: FormBuilder,  
    public auth: AuthService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.crudApi.GetFixturesList();  
    this.fixturForm();   
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
  submitBy() {
    
  }
   fixturForm() {
    this.fixtureForm = this.fb.group({
      fixtureTime: [''],
      fixtureDate: [''],
      fixtureLocation: [''],
      courtFeesPaidBy: [''],
      amountPaid: [''],
      courtNo: ['']

    })  
  }
  currentDate() {
  this.date = new Date();
}
  // Accessing form control using getters
  get fixtureTime() {
    return this.fixtureForm.get('fixtureTime');
  }

  get fixtureDate() {
    return this.fixtureForm.get('fixtureDate');
  }  

  get fixtureLocation() {
    return this.fixtureForm.get('fixtureLocation');
  }
   get courtNo() {
    return this.fixtureForm.get('courtNo');
  }
  


  
  ResetForm() {
    this.fixtureForm.reset();
  }  
 
  submitStudentData() {
    this.crudApi.AddFixture(this.fixtureForm.value); 
    this.toastr.success(this.fixtureForm.controls['fixtureLocation'].value + ' successfully added!'); 
    this.ResetForm(); 
   };


}


