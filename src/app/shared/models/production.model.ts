export enum ProductionType {
    expected,
    lastYear
}

export enum ClientCategory {
    
}

export class Production {
    id: number = 0;
    projectId: number;
    type: ProductionType;
    designation: string;
    quantity: number;
    area: number;
    areaIrrigated: number;
    dryArea: number;
    exploitedArea: number;
    clientCategory: string;
    value: number;
    comment: string;
}

