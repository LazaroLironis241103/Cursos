import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Cliente } from '../../modelo/cliente.modelo';
import { ClienteService } from '../../servicios/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  eliminando = false;

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
        this.router.navigate(['/']);
        return;
      }

      this.cargando = true;
      this.clienteServicio.getCliente(this.id).subscribe(cliente => {
        if (cliente) {
          // Asegurar que saldo sea número
          const saldoNum = Number((cliente as any).saldo || 0);
          this.cliente = { ...cliente, saldo: isNaN(saldoNum) ? 0 : saldoNum };
          this.cargando = false;
        } else {
          this.router.navigate(['/']);
        }
      }, err => {
        console.error('Error obteniendo cliente:', err);
        this.router.navigate(['/']);
      });
    });
  }

  guardar(clienteForm: NgForm) {
    if (!this.id) {
      console.error('Guardar: id ausente');
      alert('No se pudo guardar: id inválido.');
      return;
    }

    // Forzar parseo del saldo a número
    const payload = { ...this.cliente, saldo: Number(this.cliente.saldo || 0) };

    this.clienteServicio.actualizarCliente(this.id, payload)
      .then(() => {
        console.log('Cliente guardado:', this.id);
        this.router.navigate(['/']);
      })
      .catch(err => {
        console.error('Error guardando cliente:', err);
        alert('Ocurrió un error al guardar el cliente.');
      });
  }

  eliminar() {
    if (!this.id) {
      console.error('Eliminar: id ausente');
      alert('No se pudo eliminar: id inválido.');
      return;
    }

    if (!confirm('¿Seguro que deseas eliminar el cliente?')) return;

    console.log('Intentando eliminar cliente id:', this.id);
    this.eliminando = true;

    this.clienteServicio.eliminarCliente(this.id)
      .then(() => {
        console.log('Cliente eliminado correctamente:', this.id);
        this.eliminando = false;
        this.router.navigate(['/']);
      })
      .catch(err => {
        console.error('Error al eliminar cliente', this.id, err);
        this.eliminando = false;
        alert('Ocurrió un error al eliminar el cliente. Revisa la consola.');
      });
  }
}
