import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoginResponse, Usuario } from '../../../../core/models/usuario.model';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  public usuarios: Usuario[];

  constructor(private readonly authService: AuthService) { }

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

}
