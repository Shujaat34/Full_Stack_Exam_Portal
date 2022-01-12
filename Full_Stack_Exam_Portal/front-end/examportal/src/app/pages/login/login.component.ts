import { Component, OnInit } from '@angular/core';
import { LoginData } from 'src/app/login-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = <LoginData>{};
  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}


  onLogin() {
    if (this.loginData.username == null || this.loginData.username == '') {
      this.snackBar.open('Username is required ', '', {
        duration: 3000,
      });
      return;
    }
    if (this.loginData.password == null || this.loginData.password == '') {
      this.snackBar.open('Password is required ', '', {
        duration: 3000,
      });
      return;
    }

    //If window is closes it will detect the Closing of Window or tab.
    window.onbeforeunload = ()=> {
      this.loginService.logout();
    }

    //Hit Service to Generate-Token
    this.loginService.generateToken(this.loginData).subscribe(
      (token: string) => {
        console.log('Login Successful');
        console.log('Token is ' + token);

        //Let the User Login and Redirect the User to Next Page
        this.loginService.loginUser(token);
        this.loginService.getCurrentUser().subscribe(
          (response: any) => {
            this.loginService.setUser(response);

            //Now Redirect to the Next Page
            //if role Admin redirect to Admin page
            //if role Normal redirect to user page

            if (this.loginService.getUserRole() == 'ADMIN') {
              //admin dashbaord
              // window.location.href='/admin-dashboard';
              this.router.navigate(['admin-dashboard']);
              this.loginService.loginStatus.next(true);
            } else if (this.loginService.getUserRole() == 'NORMAL') {
              //NORMAL login
              // window.location.href='/user-dashboard';
              this.router.navigate(['user-dashboard/0']);
              this.loginService.loginStatus.next(true);
            } else {
              this.loginService.logout();
            }

            console.log(response);

            console.log('success');
          },
          (error: HttpErrorResponse) => {
            this.snackBar.open('Invalid Details', '', {
              duration: 3000,
            });
          }
        );
      },
      (error) => {
        console.log(error);
        this.snackBar.open('Invalid Credentials', '', {
          duration: 3000,
        });
      }
    );
  }
}
