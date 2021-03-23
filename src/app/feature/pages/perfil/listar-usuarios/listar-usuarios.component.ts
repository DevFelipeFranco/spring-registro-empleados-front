import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoginResponse, Usuario } from '../../../../core/models/usuario.model';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  public usuarios: Usuario[];
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  constructor(private readonly authService: AuthService,
              private readonly router: Router) { }

  ngOnInit(): void {
    this.consultarUsuarios();
  }

  consultarUsuarios(): void {
    this.authService.consulatUsuarios().subscribe((usuarios: Usuario[]) => {
      console.log(usuarios);
      this.usuarios = usuarios;
    }, (error) => {
      console.log(error);
    });
  }

  editarUsuario(usuario: Usuario): void {
    console.log('Se envio el usuario del componente hijo al padre', usuario);
    this.navigationExtras.state.value = usuario;
    this.router.navigate(['/dashboard/perfil/editar-crear-usuario'], this.navigationExtras);
  }

}
