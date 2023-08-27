import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {
  authlistnersub:Subscription;
  userisAuthenticated = false;
  constructor(private auth:AuthServiceService){ }

  ngOnInit() {
    this.userisAuthenticated = this.auth.userisAuthenticated();
    this.authlistnersub=this.auth.getauthStatusListner()
    .subscribe(isAuthenticated=>{
    this.userisAuthenticated=isAuthenticated;
    })
  }
  onLogout(){
    this.auth.logout();
  }
}
