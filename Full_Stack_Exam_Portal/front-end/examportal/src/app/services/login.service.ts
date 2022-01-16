import { HttpClient } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { HostListener, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginData } from '../login-data';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  @HostListener("window:onbeforeunload",["$event"])
  clearLocalStorage(event : any){
    this.logout();
  }

  public loginStatus = new Subject<boolean>();

  constructor(private http: HttpClient) { }
  private baseUrl = environment.localBaseUrl;
  //generate-token

  public generateToken(loginData: LoginData): Observable<string> {
    return this.http.post(`${this.baseUrl}/generate-token`, loginData, { responseType: 'text' });
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/current-user`);
  }

  //Login user : set the Token in Local Storage of Browser
  public loginUser(token: string) {
    localStorage.setItem("token", token);
    return true;
  }

  //If token is in local storage means the user has loged in
  public isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token == undefined || token == '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

  //if a user want to logout

  public logout() {
    //remove the token
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.clear();
    return true;
  }

  //to get token
  public getToken() {
    return localStorage.getItem('token');
  }

  //If data is sensitive we do not do this
  public setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //to get user
  public getUser() {
    let user = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    } else {
      this.logout();
      return null;
    }
  }

  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;

  }





}
