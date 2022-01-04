import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //User interface 
  user = <User>{};

  constructor(private userService: UserService,private snackBar : MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.user.username == null || this.user.username == '') {
      this.snackBar.open('Username is required!','',{
        duration:3000
      })
      // Swal.fire('Oops...', 'Something went wrong!', 'error')

      return;
    }
    this.userService.addUser(this.user).subscribe(
      (response: User) => {
        Swal.fire('Success','User is Registered Successfully!','success');
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

}
