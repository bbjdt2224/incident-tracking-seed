import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  login(email: string, password: string) {
    this.userService.login(email, password).subscribe(user => this.user = user);
    this.goBack();
  }

  goBack() {
    this.location.back();
  }

}
