import { BaseModel } from '@shared/models/BaseModel';
import { InvestmentRegime } from './Enums/InvestmentRegime';

export class ProjectInformation {
  id: number;
  declarationId: number;
  activityFieldId: number;
  selectedSector: BaseModel;
  selectedActivity: BaseModel;
  investmentRegime: InvestmentRegime;
  isInEconomicBranch: boolean;
  countyId: number;
  delegationId: number;
  communeId: number;
  location: string;
  zipCode: number;
  homePort?: string;
  totalArea: number;
  exploitedArea?: number;
  coveredArea: number;
  firstOperationNatureId?: number;
  secondOperationNatureId?: number;
  screenId: number;
}
