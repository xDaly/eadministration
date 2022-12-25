import { Document } from './document';
import { Association } from './Association';

export class Authorization {
        id: number;
        authorizationTitle: string;
        association: Association;
        issueDate: Date;
        authorizationNumber: number;
        authorisationInvoiceId: number;
        declarationId: number;
        authorizationInvoice: Document;
        screenId: number;
}
