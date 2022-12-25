import { ProjectType } from "./Enums/ProjectType";
import { PromotorType } from "./Enums/PromotorType";

export class ProjectScheme {
    activityField: number;
    projectType: ProjectType;
    promotorType: PromotorType;
    capital: number;
    investmentFinance: InvestmentFinance;
}

export class InvestmentFinance {
    id: number = 0;
    projectId: number = 0;
    terrain: number = 0;
    constractions: number = 0;
    planning: number = 0;
    incorporateCost: number = 0;
    importedEquipment: number = 0;
    localEquipment: number = 0;
    plantation: number = 0;
    cattle: number = 0;
    workingCapital: number = 0;
    meansOfTransport: number = 0;
    studyCost: number = 0;
    otherExpenses: number = 0;
    longTermCredit: number = 0;
    mediumTermCredit: number = 0;
    shortTermCredit: number = 0;
    leasing: number = 0;
    supplierCredit: number = 0;
    landCredit: number = 0;
    foreingCredit: number = 0;
    otherResources: number = 0;

}

