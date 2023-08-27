import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  constructor(public auth: AuthServiceService) {}

  onlogin(form: NgForm) {
    if (form.invalid) {
      return; //stop the function if form is invalid
    }
    this.auth.login(form.value.email, form.value.password);
  }
}
