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
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  cliente: Cliente = { nombre: '', apellido: '', email: '', saldo: 0 };
  id: string | null = null;
  cargando = true;

  constructor(
    private clienteServicio: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(pm => {
      this.id = pm.get('id');
      console.log('EditarClienteComponent param id:', this.id);

      if (!this.id) {
        // Volver al listado en lugar de navegar a una ruta inexistente
        this.router.navigate(['/']);
        return;
      }

      this.cargando = true;
      this.clienteServicio.getCliente(this.id).subscribe(cliente => {
        if (cliente) {
          this.cliente = cliente;
          this.cargando = false;
        } else {
          // Cliente no encontrado: volver al listado
          this.router.navigate(['/']);
        }
      }, err => {
        console.error('Error obteniendo cliente:', err);
        this.router.navigate(['/']);
      });
    });
  }

  guardar(clienteForm: NgForm) {
    if (!this.id) return;
    this.clienteServicio.actualizarCliente(this.id, this.cliente).then(() => {
      this.router.navigate(['/']);
    }).catch(err => {
      console.error('Error guardando cliente:', err);
    });
  }

  eliminar() {
    if (confirm('¿Seguro que deseas eliminar el cliente?')) {
      this.clienteServicio.eliminarCliente(this.id!)
        .then(() => {
          this.router.navigate(['/']); // solo navega cuando se confirma que se eliminó
        })
        .catch(err => {
          console.error('Error al eliminar cliente:', err);
          alert('Ocurrió un error al eliminar el cliente.');
        });
    }
  }
}
