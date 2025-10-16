import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string | null = null;
  password: string | null = null;

  constructor(private router: Router) {}

  login() {
throw new Error('Method not implemented.');
}
}
