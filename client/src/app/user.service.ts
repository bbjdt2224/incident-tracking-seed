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

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/login', {
      'email': email,
      'password': password
    }, httpOptions);
  }

  getTrackers(): Observable<User[]> {
    return this.http.get<User[]>('/api/trackers');
  }
}
