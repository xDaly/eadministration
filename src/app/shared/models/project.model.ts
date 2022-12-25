import { Benefit } from './benefit.model';
import { InvestmentFinance } from './ProjectScheme.model';

export class Project {
    id: number;
    totalInvestment: number;
    shareCapital: number;
    foreingPartEquity: number;
    expectedCreationYear: number;
    equipementRequestOrderDate: number;
    exploitationActivityDate: number;
    InvestmentFinancing: InvestmentFinance;
    benefits: Array<Benefit>;
    declarationId: number;
    screenId: number;
}
