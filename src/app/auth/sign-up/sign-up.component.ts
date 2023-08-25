import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  constructor(public auth: AuthServiceService) {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.auth.createUser(form.value.email, form.value.password);
  }
}
