import { HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NotificationType } from 'src/app/core/enum/notification-type.enum';
import { FileUploadStatus } from 'src/app/core/models/file-upload-status.model';
import { Rol } from 'src/app/core/models/rol.model';
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
  public roles: Rol[];
  public rolSeleccionado: Rol[];
  public profileImage: File;
  public updateProfileImage: FormData;
  public fileStatus = new FileUploadStatus();

  constructor(private readonly router: Router,
              private readonly fb: FormBuilder,
              private readonly notificationService: NotificationService,
              private readonly authService: AuthService) {
    const navigation = this.router.getCurrentNavigation();
    this.usuario = navigation?.extras?.state?.value;
    this.iniciarFormulario();
    this.validarRecargarPagina();
  }

  ngOnInit(): void {
    this.editarOCrearUsuario(this.usuario);
    this.consularRoles();
  }

  iniciarFormulario(): void {
    this.usuarioFormulario = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      cargo: [''],
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: [''],
      roles: [''],
      estado: [''],
      snNoBloqueado: ['']
    });
  }

  editarOCrearUsuario(usuario: Usuario): void {
    if (usuario) {
      console.log('Se va a editar la informacion del usuario', usuario);
      this.crear = false;
      this.titulo = 'Editar Persona';
      this.usuarioFormulario.patchValue(this.usuario);
    } else {
      console.log('Se creara una nueva persona');
      this.crear = true;
      this.titulo = 'Crear Persona';

    }
  }

  validarRecargarPagina(): void {
    this.subscription = this.router.events.pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe(event => {
        if ('/dashboard/perfil/editar-crear-usuario' === event.urlAfterRedirects) {
          console.log('Se recargo la pagina!!');
          const idUsuario = this.authService.getIdUsuario();
          this.authService.consultarUsuarioPorId(idUsuario)
            .subscribe((usuario: Usuario) => {
              this.usuario = usuario;
              this.editarOCrearUsuario(usuario);
            });
        }
      });
  }

  onGuardarUsuario(): void {
    // this.rolSeleccionado = this.usuarioFormulario.get('roles').value;
    this.usuario = {
      idUsuario: this.usuario.idUsuario,
      usuario: this.usuarioFormulario.get('usuario').value,
      nombres: this.usuarioFormulario.get('nombres').value,
      apellidos: this.usuarioFormulario.get('apellidos').value,
      email: this.usuarioFormulario.get('email').value,
      estado: this.usuarioFormulario.get('estado').value,
      snNoBloqueado: this.usuarioFormulario.get('snNoBloqueado').value,
      fechaCreacion: this.usuario.fechaCreacion,
      fechaUltimoIngreso: this.usuario.fechaUltimoIngreso,
      fechaUltimoIngresoVisualizacion: this.usuario.fechaUltimoIngresoVisualizacion,
      imagenPerfilUrl: this.usuario.imagenPerfilUrl,
      cargo: this.usuarioFormulario.get('cargo').value,
      celular: this.usuarioFormulario.get('celular').value,
      roles: this.rolSeleccionado ? this.rolSeleccionado : this.usuarioFormulario.get('roles').value
    };
    this.authService.actualizarInformacionUsuario(this.usuario).subscribe(usuarioActualizado => {
      console.log(usuarioActualizado);
      this.notificationService.notify(NotificationType.SUCCESS, 'Se actualizo la información con exito'.toUpperCase());
    }, error => {
      this.notificationService.notify(NotificationType.ERROR, error.error.message.toUpperCase());
      throwError(error);
    });
  }

  consularRoles(): void {
    this.authService.consularRoles().subscribe((roles: Rol[]) => {
      console.log(roles);
      this.roles = roles;
    });
  }

  compararRol(rol1: Rol, rol2: Rol[]): boolean {
    return rol1 && rol2[0] ? rol1.idRol === rol2[0].idRol : rol1 === rol2[0];
  }

  uploadFile(profileImage: File): void {
    this.profileImage = profileImage;
    console.log('POR QUE ESTA VACIO: ', this.profileImage);
    this.authService.uploadProfileImage(profileImage, this.usuario.idUsuario)
      .subscribe((event: HttpEvent<any>) => {
        this.reportUploadProgress(event);
      }, (error: HttpErrorResponse) => {
        this.notificationService.notify(NotificationType.ERROR, error.error.message);
        this.fileStatus.status = 'done';
      });
  }

  private reportUploadProgress(event: HttpEvent<any>): void {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        this.fileStatus.percentage = Math.round(100 * event.loaded / event.total);
        this.fileStatus.status = 'progress';
        break;
      case HttpEventType.Response:
        if (event.status === 200) {
          this.usuario.imagenPerfilUrl = `${event.body.imagenPerfilUrl}?time=${new Date().getTime()}`;
          this.notificationService.notify(NotificationType.SUCCESS, 'Se actualizo la imagen de perfil con exito');
          this.fileStatus.status = 'done';
          break;
        } else {
          this.notificationService.notify(NotificationType.ERROR, 'Ocurrio un error descargando la imagen, por favor intentalo de nuevo');
          break;
        }
      default: 'Finished all processes';
    }
  }

  rolSelect(rol: Rol): void {
    console.log(rol);
    this.rolSeleccionado = [];
    this.rolSeleccionado.push(rol);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
