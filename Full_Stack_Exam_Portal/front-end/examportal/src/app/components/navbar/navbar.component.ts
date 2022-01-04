import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userLoggedIn = false;
  user = <User>{};

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
    this.userLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();
    this.loginService.loginStatus.asObservable().subscribe(data => {
      this.userLoggedIn = this.loginService.isLoggedIn();
      this.user = this.loginService.getUser();
    });
  }

  public logout() {
    this.loginService.logout();
    window.location.reload();
  }
}
