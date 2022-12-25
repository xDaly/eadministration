import { Gender } from './Enums/Gender';
import { DeclarentQuality } from '@shared/models/Enums/DeclarentQuality';
import { Document } from './document';
import { DocumentType } from './Enums/DocumentType';
import { IdentityPieceType } from './Enums/IdentityDocumentType';

export class Declarant {
    id: number;
    declarationId: number;
    quality: DeclarentQuality;
    gender: Gender;
    name: string;
    firstName: string;
    nationalityId: string;
    birthDate: Date;
    birthPlace: string;
    studyLevel?: string;
    scientificDiploma?: string;
    idType: IdentityPieceType;
    identityDocumentId: string;
    issueDate: Date;
    issuePlace: string;
    city: String;
    location: string;
    zipCode: string;
    phoneNumber: string;
    faxNumber?: string;
    email: string;
    promotorIdentityDocument: Document;
    mandatorIdentityDocument?: Document;
    screenId: number;
}
