import { BaseModel } from '@shared/models/BaseModel';
export class ForeignParticipation {
  id: number;
  participantName: string;
  nationality: BaseModel;
  participationAmount: number;
  participationRate: number;
  companyId: number;
  declarationId: number;
}
