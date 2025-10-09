import { Routes } from '@angular/router';
import { TableroComponent } from './componentes/tablero.component/tablero.component';
import { LoginComponent } from './componentes/login.component/login.component';
import { EditarClienteComponent } from './componentes/editar-cliente.component/editar-cliente.component';
import { NoEncontradoComponent } from './componentes/no-encontrado.component/no-encontrado.component';

export const routes: Routes = [
  { path: '', component: TableroComponent },          // localhost:4200
  { path: 'login', component: LoginComponent },
  { path: 'editar/:id', component: EditarClienteComponent }, // ruta simplificada
  { path: '**', component: NoEncontradoComponent }    // siempre al final
];
