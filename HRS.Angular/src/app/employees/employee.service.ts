


import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { Observable,catchError, tap, throwError, map, of } from "rxjs";
import { Employee } from "./employee";
 
@Injectable()
export class   EmployeeService
{



 private BaseURl = 'https://localhost:5050/Employee';

 /**
  *
  */
 constructor(private http:HttpClient) {   
    
 }

 public GetEmployees() : Observable<Employee[] >{
    return this.http.get<Employee[]>(this.BaseURl).pipe(
        tap(data => console.log('All', JSON.stringify(data))),
        catchError(this.handleError)
      );
     }

     GetEmployee(id: number): Observable<Employee> {
      if (id === 0) {
        return of(this.initializeEmployee());
      }
      const url = `${this.BaseURl}/${id}`;
      return this.http.get<Employee>(url)
        .pipe(
          tap(data => console.log('getEmployee: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }
  
    createEmployee(employee: Employee): Observable<Employee> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      employee.id  = 0;
      return this.http.post<Employee>(this.BaseURl, employee, { headers })
        .pipe(
          tap(data => console.log('createEmployee: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }
  
    deleteEmployee(id: number): Observable<{}> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = `${this.BaseURl}/${id}`;
      return this.http.delete<Employee>(url, { headers })
        .pipe(
          tap(data => console.log('deleteDepartment: ' + id)),
          catchError(this.handleError)
        );
    }
  
    updateEmployee(Employee: Employee): Observable<Employee> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url =this.BaseURl; 
      return this.http.put<Employee>(url, Employee, { headers })
        .pipe(
          tap(() => console.log('updateEmployee: ' + Employee.id)),
          // Return the Department on an update
          map(() => Employee),
          catchError(this.handleError)
        );
    }


     
     private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(() => errorMessage);
      }

      private initializeEmployee(): Employee {
        // Return an initialized object
        return {
          id: 0,
          firstName:'',
          lastName:'',
          hireDate:null,
          departmentId:0,
          departmentName:''
        };
      }

}