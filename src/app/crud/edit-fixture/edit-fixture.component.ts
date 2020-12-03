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
    this.updateFixtureData();   
    const id = this.actRoute.snapshot.paramMap.get('id');  
    this.crudApi.GetFixture(id).valueChanges().subscribe(data => {
      this.editForm.setValue(data)  
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
   get courtNo() {
    return this.editForm.get('courtNo');
    }


  
  // Contains Reactive Form logic
  updateFixtureData() {
    this.editForm = this.fb.group({
      fixtureTime: [''],
      fixtureDate: [''],
      fixtureLocation: [''],
      courtFeesPaidBy: [''],
      amountPaid: [''],
      courtNo: ['']
    })
  }

  // Go back to previous component
  goBack() {
    this.location.back();
  }

  // Below methods fire when somebody click on submit button
  updateForm(){
    this.crudApi.UpdateFixture(this.editForm.value);       
    this.toastr.success(this.editForm.controls['fixtureLocation'].value + ' updated successfully');  
    this.router.navigate(['fixture-list']);               
  }


}
