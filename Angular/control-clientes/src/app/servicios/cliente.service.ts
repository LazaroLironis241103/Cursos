import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/cliente.modelo';
import { collection, collectionData, Firestore, addDoc, doc, docData, orderBy, query, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientesRef;
  clientes: Observable<Cliente[]>;

  constructor(private firestore: Firestore) {
    this.clientesRef = collection(this.firestore, 'clientes');
    const consulta = query(this.clientesRef, orderBy('nombre', 'asc'));
    this.clientes = collectionData(consulta, { idField: 'id' }) as Observable<Cliente[]>;
  }

  getClientes(): Observable<Cliente[]> {
    return this.clientes;
  }

  agregarCliente(cliente: Cliente) {
    return addDoc(this.clientesRef, cliente); // Promise<DocumentReference>
  }

  getCliente(id: string): Observable<Cliente | null> {
    const clienteDocRef = doc(this.firestore, `clientes/${id}`);
    return docData(clienteDocRef, { idField: 'id' }) as Observable<Cliente>;
  }

  actualizarCliente(id: string, cliente: Cliente) {
    const clienteDocRef = doc(this.firestore, `clientes/${id}`);
    const { id: _, ...clienteData } = cliente; // elimina id antes de actualizar
    return updateDoc(clienteDocRef, clienteData);
  }
}
