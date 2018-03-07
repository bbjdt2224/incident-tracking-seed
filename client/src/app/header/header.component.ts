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

  user: User;

  constructor(
    private userService: UserService,
    private incidentService: IncidentsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser();
  }

  logout() {
    this.userService.logout().subscribe();
    this.router.navigate(['/login']);
  }

  getUser(): void {
    this.userService.getUser().subscribe(user => {
      if (!user) {
        this.redirect();
      }
      this.user = user;
    });
  }

  redirect() {
    this.router.navigate(['/login']);
  }

  info() {
    this.router.navigate(['/userinfo']);
  }

}
