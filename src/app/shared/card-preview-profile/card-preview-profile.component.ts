import { Usuario } from './../../core/models/usuario.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailInformationProfileComponent } from '../detail-information-profile/detail-information-profile.component';
import { AuthService } from '../../core/services/auth/auth.service';
import { NotificationService } from '../notification/services/notification.service';
import { NotificationType } from 'src/app/core/enum/notification-type.enum';
import { throwError } from 'rxjs';
import { DialogWarningComponent } from '../../feature/pages/perfil/dialog-warning/dialog-warning.component';

@Component({
  selector: 'app-card-preview-profile',
  templateUrl: './card-preview-profile.component.html',
  styleUrls: ['./card-preview-profile.component.css']
})
export class CardPreviewProfileComponent implements OnInit {

  @Input() public usuario: Usuario;
  @Output() editarUsuario = new EventEmitter<Usuario>();


  constructor(public dialog: MatDialog,
              public readonly authService: AuthService,
              private readonly notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  openModal(): void {
    const dialogRef = this.dialog.open(DetailInformationProfileComponent, {
      width: '100%',
      data: this.usuario
    });
  }

  onEditarUsuario(usuario: Usuario): void {
    console.log(usuario);
    this.editarUsuario.emit(usuario);
  }

  onDeleteUsuario(usuario: Usuario): void {
    if (usuario.usuario === this.authService.getJwtUsername()) {
      this.notificationService.notify(NotificationType.WARNING, 'No puedes eliminar tu propio usuario');
      return;
    }

    this.authService.elimiarUsuarioPorId(usuario.idUsuario).subscribe((mensaje: string) => {
      this.notificationService.notify(NotificationType.SUCCESS, 'Se elimino con exito el usuario: ' + usuario.usuario);
    },
      error => {
        const data = {
          usuarioActual: usuario,
          error
        };

        const dialogReg = this.dialog.open(DialogWarningComponent, {
          width: '50%',
          data
        });

        dialogReg.afterClosed().subscribe((usuarioEliminar: string) => {
          console.log('Usuairo a eliminar: ', usuarioEliminar);
          this.authService.eliminarYTransferirUsuario(usuario.idUsuario, usuarioEliminar).subscribe((mensaje: string) => {
            this.notificationService.notify(NotificationType.SUCCESS, 'Se elimino con exito el usuario: ' + usuario.usuario);
          }, error2 => {
            this.notificationService.notify(NotificationType.ERROR, error2.error.message);
          });
        });


        this.notificationService.notify(NotificationType.ERROR, error.error.message);
        throwError(error);
      }
    );
  }
}
