import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddFixtureComponent } from './crud/add-fixture/add-fixture.component';
import { EditFixtureComponent } from './crud/edit-fixture/edit-fixture.component';
import { FixtureListComponent } from './crud/fixture-list/fixture-list.component';

const routes: Routes = [
   {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'add-fixture',
    component: AddFixtureComponent
  },
  {
    path: 'fixture-list',
    component: FixtureListComponent
  },
  {
    path: 'edit-fixture/:id',
    component: EditFixtureComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
