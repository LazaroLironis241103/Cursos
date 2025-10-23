import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Cliente } from '../modelo/cliente.modelo';
import {
  collection,
  collectionData,
  Firestore,
  addDoc,
  doc,
  docData,
  orderBy,
  query,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientesRef;
  clientes: Observable<Cliente[]>;

  constructor(private firestore: Firestore) {
    this.clientesRef = collection(this.firestore, 'clientes');
    const consulta = query(this.clientesRef, orderBy('nombre', 'asc'));
    this.clientes = collectionData(consulta, { idField: 'id' }).pipe(
      // Normalizar saldo a número en todos los documentos
      map((arr: any[]) => arr.map(item => ({ ...item, saldo: Number(item.saldo || 0) }))),
      tap(arr => console.debug('ClienteService: clientes loaded', arr.length))
    ) as Observable<Cliente[]>;
  }

  getClientes(): Observable<Cliente[]> {
    return this.clientes;
  }

  agregarCliente(cliente: Cliente) {
    const payload = { ...cliente, saldo: Number(cliente.saldo || 0) };
    console.debug('ClienteService: agregarCliente payload', payload);
    return addDoc(this.clientesRef, payload);
  }

  getCliente(id: string): Observable<Cliente | null> {
    if (!id) {
      throw new Error('getCliente: id requerido');
    }
    const clienteDocRef = doc(this.firestore, `clientes/${id}`);
    return docData(clienteDocRef, { idField: 'id' }).pipe(
      map((d: any) => d ? ({ ...d, saldo: Number(d.saldo || 0) }) : null),
      tap(d => console.debug('ClienteService: getCliente', id, d ? 'found' : 'not found'))
    ) as Observable<Cliente | null>;
  }

  actualizarCliente(id: string, cliente: Partial<Cliente>) {
    if (!id) return Promise.reject('Missing id');
    const clienteDocRef = doc(this.firestore, `clientes/${id}`);
    const { id: _, ...clienteData } = cliente as any;
    const payload = { ...clienteData, saldo: Number((clienteData as any).saldo || 0) };
    console.debug('ClienteService: actualizarCliente', id, payload);
    return updateDoc(clienteDocRef, payload);
  }

  modificarCliente(id: string, cliente: Cliente) {
    return this.actualizarCliente(id, cliente);
  }

  eliminarCliente(id: string) {
    if (!id) return Promise.reject('Missing id');
    const clienteDoc = doc(this.firestore, `clientes/${id}`);
    console.debug('ClienteService: eliminarCliente', id);
    return deleteDoc(clienteDoc);
  }
}
