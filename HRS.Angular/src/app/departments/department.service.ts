import { Injectable } from "@angular/core";
import { Department } from "./department";
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { Observable,catchError, tap, throwError, map, of } from "rxjs";
 
@Injectable()
export class Departmentservice{

 private BaseURl = 'https://localhost:5050/Department';

 /**
  *
  */
 constructor(private http:HttpClient) {   
    
 }

 public GetDepartments() : Observable<Department[] >{
    return this.http.get<Department[]>(this.BaseURl).pipe(
        tap(data => console.log('All', JSON.stringify(data))),
        catchError(this.handleError)
      );
     }

     GetDepartment(id: number): Observable<Department> {
      if (id === 0) {
        return of(this.initializeDepartment());
      }
      const url = `${this.BaseURl}/${id}`;
      return this.http.get<Department>(url)
        .pipe(
          tap(data => console.log('getDepartment: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }
  
    createDepartment(department: Department): Observable<Department> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      department.id  = 0;
      return this.http.post<Department>(this.BaseURl, department, { headers })
        .pipe(
          tap(data => console.log('createDepartment: ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    }
  
    deleteDepartment(id: number): Observable<{}> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url = `${this.BaseURl}/${id}`;
      return this.http.delete<Department>(url, { headers })
        .pipe(
          tap(data => console.log('deleteDepartment: ' + id)),
          catchError(this.handleError)
        );
    }
  
    updateDepartment(Department: Department): Observable<Department> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const url =this.BaseURl; 
      return this.http.put<Department>(url, Department, { headers })
        .pipe(
          tap(() => console.log('updateDepartment: ' + Department.id)),
          // Return the Department on an update
          map(() => Department),
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

      private initializeDepartment(): Department {
        // Return an initialized object
        return {
          id: 0,
          departmentName:''
        };
      }

}