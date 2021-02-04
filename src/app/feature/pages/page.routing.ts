import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { PersonaComponent } from './persona/persona.component';
import { EditarPersonaComponent } from './persona/editar-persona/editar-persona.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'persona', component: PersonaComponent },
      { path: 'persona/editar-persona', component: EditarPersonaComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
