import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ApplicationHistoryListComponent } from './components/application-history-list/application-history-list.component';
import { CurrentCaseListComponent } from './components/current-case-list/current-case-list.component';
import { DraftListComponent } from './components/draft-list/draft-list.component';
import { CenterComponent } from './container/center/center.component';
import { HomeRoutingModule } from './home-routing.module';
@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ],
  declarations:
    [
      CenterComponent,
      DraftListComponent,
      CurrentCaseListComponent,
      ApplicationHistoryListComponent
    ],
  entryComponents: [
    DraftListComponent,
    CurrentCaseListComponent,
    ApplicationHistoryListComponent
  ], bootstrap:[CenterComponent]
})
export class HomeModule { }
