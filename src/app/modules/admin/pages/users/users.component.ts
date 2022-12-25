import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '@core/services/admin/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '@shared/models/User.model';
import { Observable } from 'rxjs';
import { PermissionsService } from '@core/services/admin/permissions.service';
import { Item } from '@shared/models/Orientation';

@Component({
  selector: 'tia-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  RolesSettings = {
    add: {
      confirmCreate: true,
    },
    delete: {
      confirmDelete: true,
    },
    actions: {
      position: 'right'
    },
    columns: {
      id: {
        title: '#',
        addable: false,
      },
      label:{
        title: 'Name'
      }
    }
  }

  UsersSettings = {
    actions: {
      position: 'right',
      add: false,
      edit: false,
      custom: [
        { name: 'setting', title: '<a class="btn btn-sm btn-light"><i class="fas fa-cog"></i></a>' }
      ]
    },
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<a class="btn btn-sm btn-light"><i class="fas fa-trash"></i></a>'
    },
    columns: {
      id: {
        title: '#',
        filter: false,
        addable: false
      },
      picture: {
        filter: false,
        addable: false,
        type: 'html',
        valuePrepareFunction: (picture: string) => { return `<img width="50px" src="${picture}" />`; },
      },
      userName: {
        title: 'User Name'
      },
      email: {
        title: 'Email',
      },
      emailConfirmed: {
        title: 'Email Status',
        type: 'html',
        valuePrepareFunction: (Status: boolean) => { return status ? '<span class="badge badge-success">activated</span> ' : '<span class="badge badge-danger">not yet</span>'; },
      }
    }
  }

  @ViewChild('usersTable') smartTable;

  users$: Observable<Array<User>>;
  roles$: Observable<Array<Item>>;

  user: User;

  constructor(private usersService: UsersService, private permissionsService: PermissionsService, private modalService: NgbModal) { }

  ngOnInit() {
    this.users$ = this.usersService.getAll()
    this.roles$ = this.permissionsService.getAll();
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      this.usersService.delete(event.data.id).subscribe(console.log);
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm(`Are you sure you want to Update ${event.data.userName} User`)) {
      event.confirm.resolve();
      this.usersService.update(event.newData, event.data.id).subscribe(console.log);
    } else {
      event.confirm.reject();
    }
  }

  onCreateRoleConfirm(event) {
    if (window.confirm(`Are you sure you want to Add New Role`)) {
      event.newData.id = 0;
      console.log(event.newData)
      this.permissionsService.insert(event.newData).subscribe(console.log)
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveRoleConfirm(event) {
    if (window.confirm(`Are you sure you want to Update ${event.data.label} Role`)) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onDeleteRoleConfirm(event){
    if (window.confirm(`Are you sure you want to Delete ${event.data.label} Role`)) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCustom(event, content) {
    this.modalService.open(content, { centered: true, size: 'lg' })
    this.user = event.data;
  }

  addRecord() {
    this.smartTable.grid.createFormShown = true;
    this.smartTable.grid.getNewRow();
  }
}
