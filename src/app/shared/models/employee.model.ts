export enum EmployeeCategory {
    Worker,
    Technician,
    Administratif,
    Foreing
}

export enum EmployeeType {
    Permanent,
    Seasonal
}

export class Employee {
    id: number = 0;
    projectId: number;
    expectedCount: number;
    hiredCount: number;
    category : EmployeeCategory;
    type: EmployeeType;
    diploma: string;
}