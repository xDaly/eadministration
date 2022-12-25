import { DocumentType } from './Enums/DocumentType';
import { EntityType } from './Enums/EntityType';

export class Document {
    id?: number;
    fileName: string;
    type: DocumentType;
    entityType: EntityType;
    entityId?: number;
    fileSize?: number;
    fileUrl?: string;
}
