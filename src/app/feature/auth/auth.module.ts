import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth.routing';

import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { LoginComponent } from './login/login.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';

@NgModule({
  declarations: [LoginComponent, RegistroUsuarioComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class AuthModule { }