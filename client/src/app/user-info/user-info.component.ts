import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {UserService } from '../user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  updateUser(first: string, last: string, role: string) {
    this.user.firstName = first;
    this.user.lastName = last;
    this.user.role = role;
    this.userService.update(this.user).subscribe();
    this.goBack();
  }

  goBack() {
    this.location.back();
  }

}
