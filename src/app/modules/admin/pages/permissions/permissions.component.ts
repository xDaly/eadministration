import { Component, OnInit } from '@angular/core';
import { PermissionsService } from '@core/services/admin/permissions.service';
import { Item } from '@shared/models/Orientation';
import { Observable } from 'rxjs';

@Component({
  selector: 'tia-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

  constructor(private permissionsService: PermissionsService) { }

  roles: Observable<Array<Item>>

  ngOnInit() {
    this.roles = this.permissionsService.getAll();
  }

}
