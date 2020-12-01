import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CrudService } from '../crud.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-fixture',
  templateUrl: './edit-fixture.component.html',
  styleUrls: ['./edit-fixture.component.css']
})
export class EditFixtureComponent implements OnInit {
user: firebase.User
  editForm: FormGroup; 
  constructor(private crudApi: CrudService,       
    private fb: FormBuilder,           
    private location: Location,        
    private actRoute: ActivatedRoute, 
    private router: Router,           
    private toastr: ToastrService,
  private auth: AuthService) { }

  ngOnInit(): void {
    this.updateFixtureData();   // Call updateStudentData() as soon as the component is ready 
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.crudApi.GetFixture(id).valueChanges().subscribe(data => {
      this.editForm.setValue(data)  // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form 
    });
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
    })
  }
   // Accessing form control using getters
  get fixtureTime() {
    return this.editForm.get('fixtureTime');
  }

  get fixtureDate() {
    return this.editForm.get('fixtureDate');
  }

  get fixtureLocation() {
    return this.editForm.get('fixtureLocation');
  }
  get courtFeesPaidBy() {
    return this.editForm.get('courtFeesPaidBy');
  }
    get amountPaid() {
    return this.editForm.get('amountPaid');
    }
  get createdBy() {
    return this.editForm.get('createdBy');
  }


  
  // Contains Reactive Form logic
  updateFixtureData() {
    this.editForm = this.fb.group({
      fixtureTime: [''],
      fixtureDate: [''],
      fixtureLocation: [''],
      courtFeesPaidBy: [''],
      amountPaid: [''],
      createdBy:['']
    })
  }

  // Go back to previous component
  goBack() {
    this.location.back();
  }

  // Below methods fire when somebody click on submit button
  updateForm(){
    this.crudApi.UpdateFixture(this.editForm.value);       // Update student data using CRUD API
    this.toastr.success(this.editForm.controls['fixtureLocation'].value + ' updated successfully');   // Show succes message when data is successfully submited
    this.router.navigate(['view-students']);               // Navigate to student's list page when student data is updated
  }


}
