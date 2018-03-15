import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

    // current user
    user: User;

    constructor(
        private userService: UserService,
        private location: Location,
        private router: Router
    ) { }

    // gets the current user
    ngOnInit() {
        this.getUser();
    }

    // gets the current user and if there is no user then redirect to login
    getUser() {
        this.userService.getUser().subscribe(user => {
            if (!user) {
                this.redirect();
            }
            this.user = user;
        });
    }

    // calls the update function from the user service then redirects to the incidents page
    updateUser() {
        this.userService.update(this.user).subscribe(result => this.goBack());
    }

    // redirects to the incidents page
    goBack() {
        this.router.navigate(['/incidents']);
    }

    // reidrects to the login page
    redirect() {
        this.router.navigate(['/login']);
    }

}
