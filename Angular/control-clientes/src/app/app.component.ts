import { Component, OnInit } from '@angular/core';
import { Router, Event } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CabeceroComponent } from "./componentes/cabecero.component/cabecero.component";
import { PiePaginaComponent } from "./componentes/pie-pagina.component/pie-pagina.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CabeceroComponent, PiePaginaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  titulo = 'Control de Clientes';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((e: Event) => console.log('ROUTER EVENT', e));
  }
}
