import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../../modelo/cliente.modelo';
import { ClienteService } from '../../servicios/cliente.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  cliente: Cliente = { nombre: '', apellido: '', email: '', saldo: 0 };

  @ViewChild('botonCerrar') botonCerrar!: ElementRef;

  constructor(
    private clienteServicio: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clienteServicio.getClientes().subscribe(clientes => {
      this.clientes = clientes.filter(c => !!c.id);
    });
  }

  irAEditar(cliente: Cliente) {
    if (!cliente?.id) return;
    this.router.navigate(['/editar', cliente.id]);
  }

  getSaldoTotal(): number {
    return this.clientes.reduce((total, c) => total + (c.saldo ?? 0), 0);
  }

  agregar(clienteForm: NgForm) {
    const { value } = clienteForm;
    this.clienteServicio.agregarCliente(value).then(docRef => {
      value.id = docRef.id;
      this.clientes.push(value);
      clienteForm.resetForm();
      this.cerrarModal();
    });
  }

  private cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }

  trackByClienteId(index: number, cliente: Cliente): string {
    return cliente.id ?? index.toString();
  }
}
