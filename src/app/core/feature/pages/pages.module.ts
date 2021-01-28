import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Mis Modulos
import { SharedModule } from '../../../shared/shared.module';

// Modulos Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './page.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';



@NgModule({
  declarations: [PagesComponent, DashboardComponent, PerfilComponent],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    MatSidenavModule,
    MatDividerModule
  ]
})
export class PagesModule { }
