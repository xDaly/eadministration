import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication/authentication.service';

@Component({
    selector: 'tia-front-office-layout',
    templateUrl: './front-office-layout.component.html',
    styleUrls: ['./front-office-layout.component.scss']
})
export class FrontOfficeLayoutComponent implements OnInit {
    language = 'English'

    user = {};
    constructor(private authService: AuthenticationService) { }

    ngOnInit(): void {
        this.authService.getProfile().subscribe(user => this.user = user);
    }

    selectedLanguage(value){
        this.language = value;
    }
}
