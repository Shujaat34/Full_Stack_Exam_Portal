import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.localBaseUrl;

  constructor(private http: HttpClient) { }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/user`, user);
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user/all`);
  }

  public deleteUser(id: number): void {
    this.http.delete<void>(`${this.baseUrl}/user/all`);
  }
}
