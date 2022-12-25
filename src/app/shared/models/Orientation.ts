export class Orientation {
     id: number = 0;
     promotor?: Promotor;
     project?: Project;
     activity: Item;
     sector: Item;
     activityField: Item;
     subActivity: Item;
     secondaryActivity: Item;
     declarationId: number;
     screenId: number;

}

export class Item{
     id:number = 0;
     label:string;
}

export class Promotor{
     id: number = 0;
     type : number;
}

export class Project{
     id : number = 0;
     type : number;
     investmentCost: number;
     initialProjectReference?: number;
     registrationNumber?: number;
     taxCustomsId?: number;
     cnssNumber?: number;
}
