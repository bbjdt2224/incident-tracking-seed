import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import {UserService } from '../user.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe(user => {
      if (!user) {
        this.redirect();
      }
      this.user = user;
    });
  }

  updateUser(first: string, last: string, role: string) {
    this.user.firstName = first;
    this.user.lastName = last;
    this.user.role = role;
    this.userService.update(this.user).subscribe(result => this.goBack());
  }

  goBack() {
    this.location.back();
  }

  redirect() {
    this.router.navigate(['/login']);
  }

}
