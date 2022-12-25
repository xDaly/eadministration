import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@core/services/authentication/authentication.service';
import { LocationsService } from '@shared/services/common/Locations.service';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { User } from '@shared/models/User.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tia-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  nationality: string;
  searching = false;
  searchFailed = false;
  profileGroup: FormGroup;
  profile = {};

  constructor(
    private route: ActivatedRoute,
    private locationsService: LocationsService,
    private authService: AuthenticationService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.profile = profile;
      this.profileGroup = this.fb.group({
        firstName: [profile.firstName, Validators.required],
        lastName: [profile.lastName, Validators.required],
        email: [profile.email, [Validators.required, Validators.email]],
        identityPiece: [],
        identityPieceNumber: [],
        birthPlace: [],
        birthDate: [],
        nationality: [],
        address: [],
        zipCode: [],
        isAboard: [],
        quality: [],
        socialReason: [],
        diploma: [],
        phoneNumber: [],
        faxNumber: [],
        jobTitle: [],
        instructionLevel: [],
        webSite: [],
        picture:[]
      })
    });
  }



  updateProfile() {
    this.authService.updateProfile(this.profileGroup.value).subscribe(profile => this.profileGroup.setValue(profile));
  }

  confirmEmail() {
    this.authService.sendConfirmationEmail().subscribe(console.log);
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.locationsService.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

}
