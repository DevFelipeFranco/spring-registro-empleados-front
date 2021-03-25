import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NotificationType } from 'src/app/core/enum/notification-type.enum';
import { Usuario } from 'src/app/core/models/usuario.model';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { NotificationService } from '../../../../shared/notification/services/notification.service';

@Component({
  selector: 'app-editar-crear-usuario',
  templateUrl: './editar-crear-usuario.component.html',
  styleUrls: ['./editar-crear-usuario.component.css']
})
export class EditarCrearUsuarioComponent implements OnInit, OnDestroy {

  public usuarioFormulario: FormGroup;
  public usuario: Usuario;
  public crear: boolean;
  public titulo: string;
  public subscription: Subscription;

  constructor(private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService) {
    const navigation = this.router.getCurrentNavigation();
    this.usuario = navigation?.extras?.state?.value;
    this.iniciarFormulario();
    this.funcion();
  }

  ngOnInit(): void {
    this.editarOCrearUsuario(this.usuario);
  }

  iniciarFormulario(): void {
    this.usuarioFormulario = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      cargo: [''],
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: [''],
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

  funcion() {
    this.subscription = this.router.events.pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe(event => {
        if ('/dashboard/perfil/editar-crear-usuario' === event.urlAfterRedirects) {
          console.log("Se recargo la pagina!!");
          const idUsuario = this.authService.getIdUsuario();
          this.authService.consultarUsuarioPorId(idUsuario)
            .subscribe((usuario: Usuario) => {
              this.usuario = usuario;
              this.usuarioFormulario.patchValue(usuario)
            })
        }
      })
  }

  onGuardarUsuario() {
    this.usuario = {
      idUsuario: this.usuario.idUsuario,
      usuario: this.usuario.usuario,
      nombres: this.usuarioFormulario.get('nombres').value,
      apellidos: this.usuarioFormulario.get('apellidos').value,
      email: this.usuarioFormulario.get('email').value,
      estado: this.usuario.estado,
      snNoBloqueado: this.usuario.snNoBloqueado,
      fechaCreacion: this.usuario.fechaCreacion,
      fechaUltimoIngreso: this.usuario.fechaUltimoIngreso,
      fechaUltimoIngresoVisualizacion: this.usuario.fechaUltimoIngresoVisualizacion,
      imagenPerfilUrl: this.usuario.imagenPerfilUrl,
      cargo: this.usuarioFormulario.get('cargo').value,
      celular: this.usuarioFormulario.get('celular').value,
      roles: this.usuario.roles
    };
    this.authService.actualizarInformacionUsuario(this.usuario).subscribe(usuarioActualizado => {
      console.log(usuarioActualizado);
      this.notificationService.notify(NotificationType.SUCCESS, 'Se actualizo la información con exito'.toUpperCase());
    }, error => {
      this.notificationService.notify(NotificationType.ERROR, error.error.message.toUpperCase());
      throwError(error);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
