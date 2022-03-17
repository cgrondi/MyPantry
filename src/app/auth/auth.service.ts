import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthData } from "./auth-data.model";

const URL = environment.apiUrl + '/users/';

@Injectable({providedIn: 'root'})
export class AuthService{

  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated: boolean = false;
  private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router){}

  getToken(){
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getIsAuthenticated(){
    return this.isAuthenticated;
  }

  createNewUser(email: string, password: string){
    const authData: AuthData = { email: email, password: password };
    this.http.post(URL + 'signup', authData)
      .subscribe( result => {
        // console.log(result);
        this.router.navigate(['/auth/login']);
      }, error => {
        this.authStatusListener.next(false);
        // console.log(error);
      });
  }

  login(email: string, password: string){
    const authData: AuthData = { email: email, password: password };
    this.http.post<{ token: string, expiresIn: number }>(URL + 'login', authData)
      .subscribe( response => {
        if(response.token){
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.token = response.token;
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const tokenExpirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(this.token, tokenExpirationDate);
          this.router.navigate(['/']);
        }
      }, err => {
        this.authStatusListener.next(false);
      });
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, tokenExpirationDate: Date){
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpirationDate", tokenExpirationDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpirationDate");
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const tokenExpirationDate = localStorage.getItem("tokenExpirationDate");
    if(!token || !tokenExpirationDate){
      return;
    }
    return { token: token, tokenExpirationDate: new Date(tokenExpirationDate) };
  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.tokenExpirationDate.getTime() - now.getTime();  //is milliseconds
    if(expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.setAuthTimer(expiresIn/1000);  //takes a value in seconds, thus divide by 1000
    }
  }

  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout( () => {
      this.logout();
    }, duration * 1000);
  }
}
