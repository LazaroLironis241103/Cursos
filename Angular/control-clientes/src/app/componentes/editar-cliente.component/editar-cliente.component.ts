import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Cliente } from '../../modelo/cliente.modelo';
import { ClienteService } from '../../servicios/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,   // ⚠ importante si es standalone
  imports: [
    CommonModule,    // para *ngIf y *ngFor
    FormsModule,     // para ngForm y [(ngModel)]
    RouterModule     // para [routerLink]
  ],
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  cliente: Cliente = { nombre: '', apellido: '', email: '', saldo: 0 };
  id: string | null = null;

  cargando = true;  // si estás usando *ngIf="!cargando"

  constructor(
    private clienteServicio: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) {
      this.router.navigate(['/no-encontrado']);
      return;
    }

    this.clienteServicio.getCliente(this.id).subscribe(cliente => {
      if (cliente) {
        this.cliente = cliente;
        this.cargando = false; // listo para mostrar el formulario
      } else {
        this.router.navigate(['/no-encontrado']);
      }
    });
  }

  guardar(clienteForm: NgForm) {
    if (!this.id) return;
    this.clienteServicio.actualizarCliente(this.id, this.cliente).then(() => {
      this.router.navigate(['/']); // vuelve al listado
    });
  }

  // ⚠ Si quieres el botón eliminar, definilo aquí:
  eliminar() {
    console.log('Eliminar cliente no implementado aún');
  }
}
