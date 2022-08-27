import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Chart, { ChartData, ChartOptions, Color } from 'chart.js/auto';
import { Subscription } from 'rxjs';
import { Employee } from '../employees/employee';
import { EmployeeService } from '../employees/employee.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
   
  
  
  errorMessage: any;
  sub: Subscription;
  employees: Employee[];
  dates: string[] = [];
  counts: number[] = [];
  departments: string[] = [];
  hireDates: ChartData<'bar'>;
   
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Hire Count', },      
    },
    
  };

   lineChartLegend = true; 
  lineChartType = 'line';

  constructor(private employeeservice: EmployeeService, private datepipe: DatePipe) { }


  ngOnInit(): void {

    this.sub = this.employeeservice.GetEmployees().subscribe({
      next: employees => {
        this.employees = employees;
        this.groupBy(employees);
      },
      error: err => this.errorMessage = err
    });


  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  public groupBy(emps: Employee[]): void {

    const map = new Map();


    emps.forEach((item) => {
      const key = this.datepipe.transform(item.hireDate, "MMMM-YYYY");
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
        this.dates.push(key);
      } else {
        collection.push(item);
      }
    });



    this.dates.forEach(i => {
      this.counts.push(map.get(i).length)
    })
   

    this.hireDates = {
      labels: this.dates,
      datasets: [
        { label: 'Hire Count', 
        data: this.counts,
        backgroundColor:  ['DarkRed'] ,
        hoverBackgroundColor:['FireBrick']},
      ],
    };
  }

}


