import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = new User();
  constructor(private loginService: LoginService) { }

  adminFlag = false;

  ngOnInit(): void {
    // this.user = this.loginService.getUser();
    this.loginService.getCurrentUser().subscribe(
      (resp: User) => {
        this.user = resp;
        if(this.user.authorities[0].authority=='ADMIN'){
          this.adminFlag = true;
        }
      },
      (error: HttpErrorResponse) => {
        console.log('something went wrong ' + error.message);
      }
    );
  }

}
