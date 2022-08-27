import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscribable, Subscription } from 'rxjs';
import { Employee } from '../employee';
 
 
 

import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit,OnDestroy {
  sub :Subscription;
  employees : Employee[]; 
 
  errorMessage: any;
  constructor(private employeeservice : EmployeeService,private   datepipe: DatePipe) {

   }
  

  ngOnInit() {
     

    this.sub = this.employeeservice.GetEmployees().subscribe({
      next: employees => {
        this.employees = employees;
         
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
 

}
