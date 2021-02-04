import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Mis Modulos
import { SharedModule } from '../../shared/shared.module';

// Modulos Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './page.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PersonaComponent } from './persona/persona.component';
import { ListaPersonaComponent } from './persona/lista-persona/lista-persona.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from 'src/app/core/interceptor/token-interceptor';
import { EditarPersonaComponent } from './persona/editar-persona/editar-persona.component';

@NgModule({
  declarations: [PagesComponent, DashboardComponent, PerfilComponent, PersonaComponent, ListaPersonaComponent, EditarPersonaComponent],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    MatSidenavModule,
    MatDividerModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class PagesModule { }
