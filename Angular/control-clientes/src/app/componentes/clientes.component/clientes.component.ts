import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
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

  constructor(private clienteServicio: ClienteService) {}

  ngOnInit(): void {
    this.clienteServicio.getClientes().subscribe(clientes => {
      // Asegurarse que todos los clientes tengan id
      this.clientes = clientes.map(c => ({
        ...c,
        id: c.id ?? ''  // Si algún cliente no tiene id, le ponemos string vacío
      }));
    });
  }

  getSaldoTotal(): number {
    return this.clientes.reduce((total, c) => total + (c.saldo ?? 0), 0);
  }

  agregar(clienteForm: NgForm) {
    const { value } = clienteForm;
    this.clienteServicio.agregarCliente(value).then(docRef => {
      value.id = docRef.id; // asignamos id de Firebase
      this.clientes.push(value); // agregamos a la lista local
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
