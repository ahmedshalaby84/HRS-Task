import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Department } from 'src/app/departments/department';
import { Departmentservice } from 'src/app/departments/department.service';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  @ViewChild('f', { static: false }) empForm: NgForm;
  @ViewChild('hDate') hdate:ElementRef;
  disableDeleteButton = false;
  employee: Employee;
  firstName: string;
  lastName: string;
  selectDepartment :number;
  hireDate :Date;
   
  departments : Department[];
  private sub: Subscription;
  AddText = 'Edit'
  pageTitle = 'Edit Employee';
  errorMessage = '';
  constructor(
    private EmpService: EmployeeService,
    private departmentservice:Departmentservice,
    private route: ActivatedRoute,
    private router: Router,
    private   datepipe: DatePipe) { }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getEmployee(id);
      }
    );

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

  getEmployee(id: number): void {
    this.EmpService.GetEmployee(id)
      .subscribe({
        next: (employee: Employee) => this.displayEmployee(employee),
        error: err => this.errorMessage = err
      });
  }

  displayEmployee(employee: Employee): void {

    this.employee = employee;

    if (this.employee.id === 0) {
      this.pageTitle = 'Add Employee';
      this.AddText = 'Add'
      this.disableDeleteButton = true;
    } else {
      this.pageTitle = `Edit Employee: ${this.employee.firstName + ' ' + this.employee.lastName}`;
      this.firstName = this.employee.firstName;
      this.lastName = this.employee.lastName;
      //this.employee.hireDate=Date(this.hdate.nativeElement.value);
     // this.hdate.nativeElement.value = this.employee.hireDate;
      this.hireDate= this.employee.hireDate;//this.datepipe.transform(this.employee.hireDate,"MM/DD/YYYY") ;
      this.selectDepartment=this.employee.departmentId;
      // this.nameInputRef.nativeElement.value = this.department.departmentName;
      this.disableDeleteButton = false;
    }
  }

  deleteEmployee(): void {
    if (this.employee.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(` delete the employee: ${this.employee.firstName + ' ' + this.employee.lastName}?`)) {
        this.EmpService.deleteEmployee(this.employee.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  onSubmit(): void {

    this.employee.firstName = this.firstName;
    this.employee.lastName = this.lastName;
    this.employee.hireDate=this.hireDate;
    this.employee.departmentId = this.selectDepartment;
    const e = this.employee;

    if (e.id === 0) {
      this.EmpService.createEmployee(e)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
    } else {
      this.EmpService.updateEmployee(e)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
    }

  }

  onSaveComplete(): void {
    this.empForm.reset();
    this.router.navigate(['./employee']);
  }

  clearEmployee(): void {
    this.empForm.reset();
    this.router.navigate(['./employee']);
  }

  parseDate(dateString: string): Date {
    if (dateString) {
        return new Date(dateString);
    }
    return null;
}

   
}
