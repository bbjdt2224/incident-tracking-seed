import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  // sends email and password for authentication and gets a user object back
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/login', {
      'email': email,
      'password': password
    }, httpOptions);
  }

  // gets an array of users who are trackers
  getTrackers(): Observable<User[]> {
    return this.http.get<User[]>('/api/trackers');
  }

  // gets the current user
  getUser(): Observable<User> {
    return this.http.get<User>('/api/user');
  }

  // calls the logout function in the backend
  logout(): Observable<any> {
    return this.http.post('/api/logout', {}, httpOptions);
  }

  // sends new informaiton about the current user to be updated
  update(user: User): Observable<any> {
    return this.http.put('/api/user/' + user.id, {
        'firstName': user.firstName,
        'lastName': user.lastName,
        'role': user.role
    }, httpOptions);
  }

  // sends information to create a new user
  newUser(user: User): Observable<any> {
    return this.http.post('/api/signup', {
      'email': user.email,
      'password': user.password,
      'isTracker': user.isTracker
    }, httpOptions );
  }

  // sends an email and gets a boolean back that determines if that email exists in the database already
  checkEmail(email: string): Observable<boolean> {
    return this.http.post<boolean>('/api/check', {
      'email': email
    }, httpOptions);
  }

  // gets a user by id
  getUserById(id: number): Observable<User> {
    return this.http.get<User>('/api/getUser/' + id);
  }
}
