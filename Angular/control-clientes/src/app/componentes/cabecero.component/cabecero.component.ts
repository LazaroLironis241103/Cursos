import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-cabecero',
  standalone: true,
  imports: [RouterModule, CommonModule], 
  templateUrl: './cabecero.component.html',
  styleUrl: './cabecero.component.css'
})
export class CabeceroComponent  implements OnInit{

  isLoggedIn: boolean = false;
  loggedInUser: string | null = null;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginService.getAuthState().subscribe(usuario => {
      if(usuario) {
        this.isLoggedIn = true;
      this.loggedInUser = usuario.email;
      } else {
        this.isLoggedIn = false; 
        this.loggedInUser = null;
      }
    });
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.loggedInUser = null;
    this.router.navigate(['/login']);
  }
}
