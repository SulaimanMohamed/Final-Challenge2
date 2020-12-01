import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-add-fixture',
  templateUrl: './add-fixture.component.html',
  styleUrls: ['./add-fixture.component.css']
})
export class AddFixtureComponent implements OnInit {
  user: firebase.User;
date: any;
   public fixtureForm: FormGroup;  // Define FormGroup to student's form
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
      createdBy: ['']
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
  


  // Reset student form's values
  ResetForm() {
    this.fixtureForm.reset();
  }  
 
  submitStudentData() {
    this.crudApi.AddFixture(this.fixtureForm.value); // Submit student data using CRUD API
    this.toastr.success(this.fixtureForm.controls['fixtureLocation'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
   };


}


