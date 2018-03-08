import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  // the new user object to hold the new users information
  user = new User();
  // the error message if somthing goes wrong
  error = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // calls the check email function from the user service and if email exists then display error message
  // if not call the new user function from the user service then redirects to the incidents page
  addUser() {
    this.userService.checkEmail(this.user.email).subscribe(result => {
      if (!result) {
        this.userService.newUser(this.user).subscribe(() => this.goBack());
      } else {
        this.error = 'This email is already used';
      }
    });
  }

  // redirects to incidents
  goBack() {
    this.router.navigate(['/incidents']);
  }

}
