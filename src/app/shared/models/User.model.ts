import { IdentityPieceType } from "./Enums/IdentityDocumentType";

export class User {
    email: string = '';
    userName: string = '';
    firstName: string = '';
    lastName: string = '';
    identityPiece: IdentityPieceType = IdentityPieceType.CIN;
    identityPieceNumber: number = 0;
    birthPlace: string = '';
    birthDate: string = '';
    nationality: string = '';
    commune: string = '';
    address: string = '';
    isAboard: boolean = false;
    quality: number = 0;
    socialReason: string = '';
    diploma: string = '';
    phoneNumber: string = ' ';
    faxNumber: string = '';
    jobTitle: string = '';
    instructionLevel: string = '';
    webSite: string = '';
    passWord: string;
    rememberMe: boolean;
    picture: string;
    token: string;
}