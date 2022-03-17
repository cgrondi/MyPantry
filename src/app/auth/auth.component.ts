import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "./auth.service";

@Component({
  templateUrl: ('./auth.component.html'),
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy{
  signupMode: boolean;
  isLoading= false;
  authFailed = false;

  private authStatusSub: Subscription;

  constructor(private route: ActivatedRoute, private authService: AuthService){}

  ngOnInit(): void {
      //  //  Subscribe to paramMap to tell whether we are in signup mode or not
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        this.authFailed = false;
        if(paramMap.has('authMode')) {
          if(paramMap.get('authMode') === 'signup'){
            this.signupMode = true;
          }
          else{
            this.signupMode = false;
          }
        }
      })

      //  //  subscribe to authStatusListener to set isLoading to false if we fail to sign up or login
      this.authStatusSub = this.authService.getAuthStatusListener().subscribe( isAuthenticated => {
        this.isLoading = isAuthenticated;
        if(!isAuthenticated){
          this.authFailed = true;
        }
      })
  }


  onSubmit(form:NgForm){
    console.log("OnSubmit called")
    if(form.invalid){
      console.log("Form invalid. returning")
      return;
    }
    this.isLoading = true;
    if(this.signupMode){
      this.authService.createNewUser(form.value.email, form.value.password);
    }
    else{
      this.authService.login(form.value.email, form.value.password);
    }
    form.resetForm();
  }

  ngOnDestroy(): void {
      this.authStatusSub.unsubscribe();
  }
}
