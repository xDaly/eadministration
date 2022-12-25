import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentType } from '@shared/models/Enums/DocumentType';
@Component({
  selector: 'tia-invoice-upload',
  templateUrl: './invoice-upload.component.html',
  styleUrls: ['./invoice-upload.component.scss']
})
export class InvoiceUploadComponent implements OnInit {
  documentType: DocumentType;
  uploadConfig: any;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  save(value) {
      this.activeModal.close(value);
  }
}
