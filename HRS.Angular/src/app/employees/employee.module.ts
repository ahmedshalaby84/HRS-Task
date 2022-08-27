import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {BrowserModule } from '@angular/platform-browser';
import { EmployeesComponent } from './employees.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeService } from './employee.service';
import { DatePipe } from '@angular/common';
 
 

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forChild([
      { path: 'employee', component: EmployeesComponent },
      { path: 'employee/:id', component: EmployeeEditComponent },
      {
        path: 'employee/:id/edit',
         
        component: EmployeeEditComponent
      }
    ])
  ],
  declarations: [
    EmployeeListComponent,
    EmployeeEditComponent,
    EmployeesComponent
  ], 
  providers: [  EmployeeService,DatePipe],
})

export class EmployeeModule { }
