import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {BrowserModule } from '@angular/platform-browser';
 import{DepartmentsComponent} from './departments.component'
 import{DepartmentsListComponent} from './departments-list/departments-list.component'
 import { DepartmentsEditComponent } from './departments-edit/departments-edit.component';
import { Departmentservice } from './department.service';
 

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forChild([
      { path: 'department', component: DepartmentsComponent },
      { path: 'department/:id', component: DepartmentsEditComponent },
      {
        path: 'department/:id/edit',
         
        component: DepartmentsEditComponent
      }
    ])
  ],
  declarations: [
    DepartmentsComponent,
    DepartmentsListComponent,
    DepartmentsEditComponent
  ], 
  providers: [  Departmentservice],
})

export class DepartmentModule { }
