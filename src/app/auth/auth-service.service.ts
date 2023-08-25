import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './sign-up/user.model';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  createUser(email:string,password:string){
    const authdata:AuthService={email:email,password:password}
    this.http.post("http://localhost:3000/api/user/signup",authdata).subscribe((response)=>{
      console.log(response)
    })
  }
  
}
