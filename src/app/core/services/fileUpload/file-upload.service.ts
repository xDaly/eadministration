import { Injectable, Inject } from '@angular/core';
import { BaseService } from '@shared/services/base/base.service';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Document } from '@shared/models/document';

@Injectable()
export class FileUploadService {
  uploadUrl = 'http://localhost:2159/api/Upload/';
  constructor(private http: HttpClient) { }

  DeleteUploadDocument(file: string) {
    const headers = new HttpHeaders({
      'FileUrl': file
    });
   return this.http.delete(this.uploadUrl + 'DeleteUploadedDocument', {headers: headers});
  }
}
