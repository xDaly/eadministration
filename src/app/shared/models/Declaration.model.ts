import { Project } from "./project.model";

export enum DeclarationMode
{
    creation,
    extension,
    renewal
}

export enum DeliveryModeType {
    Site,
    PostalMail,
    Email
}

export class Declaration {
    id: number;
    status:string;
    currentStep: number;
    declarationMode: DeclarationMode;
    delivranceMode: DeliveryModeType;
    promotor: any;
    project:any;
    isValidate:boolean;
}