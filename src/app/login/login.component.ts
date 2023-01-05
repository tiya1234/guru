import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../jwtservice/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  show=false;
  form:FormGroup;
  formJSON:any={};
  constructor(private fb:FormBuilder,private authService: AuthenticationService,private router:Router) {

    this.form=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })

   }
  submit() {

    let username=this.form.get("username")?.value;
    let password=this.form.get("password")?.value;

    this.authService.authenticate(username,password).subscribe(
      data=>{
        if(this.authService.isUserLoggedIn()){
          this.router.navigate(['/home'])
        }
      },
      (error)=>{
        
        console.log(error.status);

        console.log(error.error.message);

        if(error.error.message == "Bad credentials" && error.status == 401){
          this.show=true;
            // alert("Login invalid")
        }
      }
      )
  }

  CloseAlert(){
    this.show=false;
  }
}
