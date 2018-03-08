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

  user = new User();
  error = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  addUser() {
    this.userService.checkEmail(this.user.email).subscribe(result => {
      if (!result) {
        this.userService.newUser(this.user).subscribe(() => this.goBack());
      } else {
        this.error = 'This email is already used';
      }
    });
  }

  goBack() {
    this.router.navigate(['/incidents']);
  }

}
