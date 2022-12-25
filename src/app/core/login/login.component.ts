import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@shared/models/User.model';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'tia-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  signupForm: FormGroup;

  returnUrl: String;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

    localStorage.removeItem('access_token');

    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: ['']
    });

    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });

    this.returnUrl = this.route.snapshot.queryParams[''] || '/home';

  }

  logIn() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.userAuthenticate(this.loginForm.value)
      .subscribe(
        (user: User) => {
          if (user) {
            localStorage.setItem('access_token', user.token);
            this.router.navigate([this.returnUrl]);
          }
        }, err => console.log(err));
  }

  signup() {
    if (this.signupForm.invalid)
      return

    this.authService.userRegister(this.signupForm.value).subscribe(_ => this.router.navigate['profile'])
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login'])
  }

}
