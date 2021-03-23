import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/usuario.model';

@Component({
  selector: 'app-editar-crear-usuario',
  templateUrl: './editar-crear-usuario.component.html',
  styleUrls: ['./editar-crear-usuario.component.css']
})
export class EditarCrearUsuarioComponent implements OnInit {

  public usuarioFormulario: FormGroup;
  public usuario: Usuario;
  public crear: boolean;
  public titulo: string;

  constructor(private readonly router: Router,
              private readonly fb: FormBuilder) {
    const navigation = this.router.getCurrentNavigation();
    this.usuario = navigation?.extras?.state?.value;
    this.iniciarFormulario();
  }

  ngOnInit(): void {
    this.editarOCrearUsuario(this.usuario);
  }

  iniciarFormulario(): void {
    this.usuarioFormulario = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      cargo: ['', Validators.required],
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
    });
  }

  editarOCrearUsuario(usuario: Usuario): void {
    if (usuario) {
      console.log('Se va a editar la informacion del usuario');
      this.crear = false;
      this.titulo = 'Editar Persona';
      this.usuarioFormulario.patchValue(this.usuario);
    } else {
      console.log('Se creara una nueva persona');
      this.crear = true;
      this.titulo = 'Crear Persona';

    }
  }
}
