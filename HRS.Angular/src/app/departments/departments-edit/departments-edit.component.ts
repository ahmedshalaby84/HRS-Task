import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Department } from '../department';
import { Departmentservice } from '../department.service';

@Component({
  selector: 'app-departments-edit',
  templateUrl: './departments-edit.component.html',
  styleUrls: ['./departments-edit.component.css']
})
export class DepartmentsEditComponent implements OnInit {


  @ViewChild('f', { static: false }) deptForm: NgForm;
  disableDeleteButton = false;
  department: Department;
  departmentName: string;
  private sub: Subscription;
  AddText = 'Edit'
  pageTitle = 'Edit Department';
  errorMessage = '';
  constructor(private Deptservice: Departmentservice, private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getDepartment(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getDepartment(id: number): void {
    this.Deptservice.GetDepartment(id)
      .subscribe({
        next: (department: Department) => this.displayDepartment(department),
        error: err => this.errorMessage = err
      });
  }

  displayDepartment(department: Department): void {

    this.department = department;

    if (this.department.id === 0) {
      this.pageTitle = 'Add department';
      this.AddText = 'Add'
      this.disableDeleteButton = true;
    } else {
      this.pageTitle = `Edit department: ${this.department.departmentName}`;
      this.departmentName = this.department.departmentName;
      // this.nameInputRef.nativeElement.value = this.department.departmentName;
      this.disableDeleteButton = false;
    }
  }

  deleteDepartment(): void {
    if (this.department.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(` delete the department: ${this.department.departmentName}?`)) {
        this.Deptservice.deleteDepartment(this.department.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  onSubmit(): void {

    this.department.departmentName = this.departmentName;
    const d = this.department;
    // d.departmentName =this.nameInputRef.nativeElement.value;
    if (d.id === 0) {
      this.Deptservice.createDepartment(d)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
    } else {
      this.Deptservice.updateDepartment(d)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
    }

  }

  onSaveComplete(): void {
    this.deptForm.reset();
    this.router.navigate(['./department']);
  }

  clearDepartment(): void {
    this.deptForm.reset();
    this.router.navigate(['./department']);
  }


}
