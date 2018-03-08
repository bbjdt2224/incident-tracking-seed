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

  updateUser() {
    this.userService.update(this.user).subscribe(result => this.goBack());
  }

  goBack() {
    this.router.navigate(['/incidents']);
  }

  redirect() {
    this.router.navigate(['/login']);
  }

}
