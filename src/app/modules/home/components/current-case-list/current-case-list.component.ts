import { Component, OnInit } from '@angular/core';
import { DeclarationService } from '@core/services/declaration/declaration.service';
import { Declaration, DeclarationMode } from '@shared/models/Declaration.model';

@Component({
  selector: 'tia-current-case-list',
  templateUrl: './current-case-list.component.html',
  styleUrls: ['./current-case-list.component.scss']
})
export class CurrentCaseListComponent implements OnInit {

  delarations: Array<Declaration>;
  type: typeof DeclarationMode = DeclarationMode;

  constructor(private declarationService: DeclarationService) { }

  ngOnInit() {
    this.declarationService.GetByCase("open")
      .subscribe((declarations:Array<Declaration>) => this.delarations = declarations);
  }

}
