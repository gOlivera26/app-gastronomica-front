import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeUsuariosComponent } from './home-usuarios/home-usuarios.component';
import { AuthGuard } from './auth.guard';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'homeUser', component: HomeUsuariosComponent, canActivate: [AuthGuard] } ,
  {path: 'listar-usuarios', component: ListadoUsuariosComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }