import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CrudService } from '../crud.service';
interface Fixture {
    $key: string;
    fixtureTime: string;
    fixtureDate: string;
  fixtureLocation: string;
  courtFeesPaidBy: string;
  amountPaid: string;
  createdBy: string;
 }
@Component({
  selector: 'app-fixture-list',
  templateUrl: './fixture-list.component.html',
  styleUrls: ['./fixture-list.component.css']
})
export class FixtureListComponent implements OnInit {
p: number = 1;
  user: firebase.User;                 // Settup up pagination variable
  Fixture: Fixture[];                 // Save students data in Student's array.
  hideWhenNoFixture: boolean = false; // Hide students data table when no student.
  noData: boolean = false;            // Showing No Student Message, when no student in database.
  constructor(public crudApi: CrudService, // Inject student CRUD services in constructor.
    public toastr: ToastrService,
  private auth: AuthService,) { }

  
   
  ngOnInit(): void {
    this.dataState(); // Initialize student's list, when component is ready
    let s = this.crudApi.GetFixturesList(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
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
  }
  // Using valueChanges() method to fetch simple list of students data. It updates the state of hideWhenNoStudent, noData variables when any changes occurs in student data list in real-time.
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

  // Method to delete student object
  deleteFixture(fixture) {
    if (window.confirm('Are sure you want to delete this Fixture ?')) { // Asking from user before Deleting student data.
      this.crudApi.DeleteFixture(fixture.$key) // Using Delete student API to delete student.
      this.toastr.success(fixture.fixtureLocation + ' successfully deleted!'); // Alert message will show up when student successfully deleted.
    }
  }

}
