import { Component, OnInit } from '@angular/core';
import { DeclarationService } from '@core/services/declaration/declaration.service';

@Component({
  selector: 'tia-application-history-list',
  templateUrl: './application-history-list.component.html',
  styleUrls: ['./application-history-list.component.scss']
})
export class ApplicationHistoryListComponent implements OnInit {

  constructor(private declarationService: DeclarationService) { }

  ngOnInit() {
    this.declarationService.GetByCase("close")
      .subscribe(console.log);
  }

}
