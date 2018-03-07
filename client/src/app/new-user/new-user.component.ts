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

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  addUser(email: string, password: string, isTracker: boolean) {
    this.user.email = email;
    this.user.password = password;
    this.user.isTracker = isTracker;
    this.userService.newUser(this.user).subscribe(() => this.goBack());
  }

  goBack() {
    this.router.navigate(['/incidents']);
  }

}
