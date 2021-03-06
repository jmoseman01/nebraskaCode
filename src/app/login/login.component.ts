import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.invalidLogin = false;
  }


  ngOnInit() {
  }

  login(formValues) {
    console.log('login.component login');

    this.authService.login(formValues.email, formValues.password)
      .subscribe(result => {
        if (!result) {
          console.log('login.component user not found');
          this.invalidLogin = true;
        } else {
          this.invalidLogin = false;
          console.log('login.component logged in. redirecting to home page');
          this.router.navigate(['/']);
        }
      });
  }

}
