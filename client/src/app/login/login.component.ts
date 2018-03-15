import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    // a new user object to hold the users information
    user: User = new User();

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    // calls the login function from the user service then redirects to the incidents screen
    login() {
        this.userService.login(this.user.email, this.user.password).subscribe(user => {
            if (user) {
                this.next();
            }
        });
    }

    // redirect to login screen
    next() {
        this.router.navigate(['/incidents']);
    }

}
