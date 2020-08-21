import { Component, OnInit } from '@angular/core';
import { TruevaultService } from '../services/truevault.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private trueVault: TruevaultService, private router: Router) {}

  loginData: any = {};
  isLoggedIn = false;

  ngOnInit() {}

  login() {
    this.trueVault
      .getUserToken(this.loginData)
      .then((res) => {
        this.router.navigate(['dashboard']);
      })
      .catch((err) => {
        alert(err);
      });
  }
}
