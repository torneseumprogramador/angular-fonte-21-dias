import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './views/clientes/lista/lista.component';
import { LoginComponent } from './views/login/login.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'clientes', component: ListaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
