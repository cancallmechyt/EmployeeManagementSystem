import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { EmployeeService } from "./employee.service";
import { inject } from "@angular/core";
import { Observable, of } from "rxjs";
import { Employee } from "./employee.model";

export const EmployeeResolver: ResolveFn<Employee> = 
    (route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
        employeeService: EmployeeService = inject(EmployeeService)) : Observable<Employee> => {

            const employeeId = route.paramMap.get("employeeId");

            if(employeeId) {
                return employeeService.getSingleEmployee(Number(employeeId));
            } else {
                const employee: Employee = {
                    employeeId: 0,
                    employeeName: '',
                    employeeContactNumber: '',
                    employeeAddress: '',
                    employeeGender: '',
                    employeeDepartment: '',
                    employeeSkills: ''
                }

                return of(employee);
            }
        }