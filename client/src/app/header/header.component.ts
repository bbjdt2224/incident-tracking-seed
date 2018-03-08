import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IncidentsService } from '../incidents.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // the current user used to display thier name
  user: User;

  constructor(
    private userService: UserService,
    private incidentService: IncidentsService,
    private router: Router
  ) { }

  // gets the current user from the database
  ngOnInit() {
    this.getUser();
  }

  // calls the logout function from the user service then redirects to login
  logout() {
    this.userService.logout().subscribe();
    this.router.navigate(['/login']);
  }

  // gets the current user and if there is no current user redirect to login
  getUser(): void {
    this.userService.getUser().subscribe(user => {
      if (!user) {
        this.redirect();
      }
      this.user = user;
    });
  }

  // redirect to login
  redirect() {
    this.router.navigate(['/login']);
  }

  // redirect to user information page
  info() {
    this.router.navigate(['/userinfo']);
  }

}
