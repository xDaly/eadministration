import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Setting } from '@shared/models/Setting.model';
import { BehaviorSubject } from 'rxjs';
import { BaseService } from '../base/base.service';

@Injectable()
export class SettingsService extends BaseService<Setting> {

  setting = new Setting();

  private settingSubject = new BehaviorSubject<Setting>(this.setting);

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super({ uri: 'settings' }, baseUrl, http);
  }

  get current(){
    return this.settingSubject.getValue();
  }

  set current(setting : Setting){
    this.setting = setting;
    this.settingSubject.next(this.setting);
  }


}
