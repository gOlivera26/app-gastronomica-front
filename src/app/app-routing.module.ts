import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeUsuariosComponent } from './home-usuarios/home-usuarios.component';
import { AuthGuard } from './auth.guard';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { EditarUsuarioModalComponent } from './editar-usuario-modal/editar-usuario-modal.component';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { HomePedidosComponent } from './home-pedidos/home-pedidos.component';
import { HomePedidosMenuComponent } from './home.pedidos-pantalla-principal/home.pedidos-menu.component';
import { HomePedidosMenuHamburguesasComponent } from './home-pedidos-menu-hamburguesas/home-pedidos-menu-hamburguesas.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'homeUser', component: HomeUsuariosComponent, canActivate: [AuthGuard] } ,
  {path: 'listar-usuarios', component: ListadoUsuariosComponent, canActivate: [AuthGuard]},
  {path: 'editar-usuarios-modal', component:EditarUsuarioModalComponent, canActivate: [AuthGuard]},
  {path: 'agregar-usuario' , component:AgregarUsuarioComponent, canActivate:[AuthGuard]},
  {path: 'homePedidos', component: HomePedidosComponent, canActivate:[AuthGuard], children:[
    {path: 'home-pedidos-menu', component: HomePedidosMenuComponent},
    {path: 'menu-hamburguesas', component: HomePedidosMenuHamburguesasComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }