import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Mis Modulos
import { SharedModule } from '../../shared/shared.module';

// Modulos Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';


import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './page.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PersonaComponent } from './persona/persona.component';
import { ListaPersonaComponent } from './persona/lista-persona/lista-persona.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from 'src/app/core/interceptor/token-interceptor';
import { EditarCrearPersonaComponent } from './persona/editar-crear-persona/editar-crear-persona.component';
import { InformacionContratoComponent } from './informacion-contrato/informacion-contrato.component';
import { ListarInformacionContratoComponent } from './informacion-contrato/listar-informacion-contrato/listar-informacion-contrato.component';
import { EditarCrearInformacionContratoComponent } from './informacion-contrato/editar-crear-informacion-contrato/editar-crear-informacion-contrato.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ListarClientesComponent } from './clientes/listar-clientes/listar-clientes.component';
import { ListarUsuariosComponent } from './perfil/listar-usuarios/listar-usuarios.component';
import { EditarCrearUsuarioComponent } from './perfil/editar-crear-usuario/editar-crear-usuario.component';
import { EditarCrearClienteComponent } from './clientes/editar-crear-cliente/editar-crear-cliente.component';
import { DialogWarningComponent } from './perfil/dialog-warning/dialog-warning.component';
import { ReportComponent } from './report/report.component';
import { DeletePersonaDialogComponent } from './persona/delete-persona-dialog/delete-persona-dialog.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    PerfilComponent,
    PersonaComponent,
    ListaPersonaComponent,
    EditarCrearPersonaComponent,
    InformacionContratoComponent,
    ListarInformacionContratoComponent,
    EditarCrearInformacionContratoComponent,
    ClientesComponent,
    ListarClientesComponent,
    ListarUsuariosComponent,
    EditarCrearUsuarioComponent,
    EditarCrearClienteComponent,
    DialogWarningComponent,
    ReportComponent,
    DeletePersonaDialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    MatSidenavModule,
    MatDividerModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSortModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatDialogModule
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
