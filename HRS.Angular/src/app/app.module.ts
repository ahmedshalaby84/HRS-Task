import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfigComponent } from  './config/config.component'
 
import { RouterModule } from '@angular/router';
import { DepartmentModule } from './departments/department.module'; 
import { HomeComponent } from './home/home.component';
import { EmployeeModule } from './employees/employee.module';
import { ChartComponent } from './chart/chart.component';
import { NgChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    AppComponent,    
    HeaderComponent,
    ConfigComponent, 
  
    HomeComponent, ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule,
    RouterModule.forRoot([
      { path: 'chart',component: ChartComponent },
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
      
     
    ]),
    EmployeeModule,
    DepartmentModule,
    
   
  ],  
  
   
  bootstrap: [AppComponent]
})
export class AppModule { }
