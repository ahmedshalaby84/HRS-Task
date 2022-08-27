import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscribable, Subscription } from 'rxjs';
import { Department } from '../department';

import { Departmentservice } from '../department.service';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsListComponent implements OnInit,OnDestroy {
  sub :Subscription;
  departments : Department[]; 
  // = [new Department("Ahmed") , new Department("Ali")];
  errorMessage: any;
  constructor(private departmentservice : Departmentservice) {

   }
  

  ngOnInit() {
     

    this.sub = this.departmentservice.GetDepartments().subscribe({
      next: departments => {
        this.departments = departments;
         
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
 

}
