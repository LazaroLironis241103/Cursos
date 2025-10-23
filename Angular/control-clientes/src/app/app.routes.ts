import { Routes } from '@angular/router';
import { TableroComponent } from './componentes/tablero.component/tablero.component';
import { LoginComponent } from './componentes/login.component/login.component';
import { EditarClienteComponent } from './componentes/editar-cliente.component/editar-cliente.component';
import { NoEncontradoComponent } from './componentes/no-encontrado.component/no-encontrado.component';
import { LoginGuardianService } from './servicios/login-guardian.service';

export const routes: Routes = [
  { path: '', component: TableroComponent, canActivate: [LoginGuardianService] },
  { path: 'login', component: LoginComponent },
  { path: 'editar/:id', component: EditarClienteComponent, canActivate: [LoginGuardianService] },
  { path: '**', component: NoEncontradoComponent }
];
