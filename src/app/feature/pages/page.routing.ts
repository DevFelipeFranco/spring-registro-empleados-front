import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { PersonaComponent } from './persona/persona.component';
import { EditarCrearPersonaComponent } from './persona/editar-crear-persona/editar-crear-persona.component';
import { InformacionContratoComponent } from './informacion-contrato/informacion-contrato.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EditarCrearUsuarioComponent } from './perfil/editar-crear-usuario/editar-crear-usuario.component';
import { AuthenticationGuard } from 'src/app/core/guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'perfil/editar-crear-usuario', component: EditarCrearUsuarioComponent },
      { path: 'persona', component: PersonaComponent },
      { path: 'persona/editar-crear-persona', component: EditarCrearPersonaComponent },
      { path: 'cliente', component: ClientesComponent },
      { path: 'info-contrato', component: InformacionContratoComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
