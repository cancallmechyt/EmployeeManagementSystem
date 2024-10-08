import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../employee.model';
import { Router } from '@angular/router'; // Corrected from Route to Router

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  dataSource: Employee[] = [];
  displayedColumns: string[] = ['employeeId', 'employeeName', 'employeeContactNumber', 'employeeAddress', 'employeeDepartment', 'employeeGender', 'employeeSkills', 'edit', 'delete'];

  constructor(private employeeService: EmployeeService, private router: Router) {
    this.getEmployeeList();
  } 

  ngOnInit(): void {
    this.getEmployeeList();
  }

  updateEmployee(employeeId: number): void {
    this.router.navigate(['employee', { employeeId }]); 
  }

  deleteEmployee(employeeId: number): void {
    console.log(employeeId);
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: (res) => {
        console.log(res);
        this.getEmployeeList();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err); 
      }
    });
  }

  getEmployeeList(): void {
    this.employeeService.getEmployee().subscribe({
      next: (res: Employee[]) => {
        this.dataSource = res;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
      }
    });
  }
}
