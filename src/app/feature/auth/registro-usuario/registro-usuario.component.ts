import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { NotificationType } from 'src/app/core/enum/notification-type.enum';
import { NotificationService } from 'src/app/shared/notification/services/notification.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {


  registroUsuarioForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private readonly authService: AuthService,
              private readonly notificationService: NotificationService) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  private iniciarFormulario(): void {
    this.registroUsuarioForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
    });
  }

  registrarUsuario(): void {
    console.log('Saved:', this.registroUsuarioForm.value);

    this.authService.registrarUsuario(this.registroUsuarioForm.value).subscribe(data => {
      console.log(data);
      this.notificationService.notify(NotificationType.SUCCESS, 'Se registro correctamente, por favor revice su correo para activar tu cuenta'.toUpperCase());
    }, error => {
      this.notificationService.notify(NotificationType.ERROR, error.error.message.toUpperCase());
      throwError(error);
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.registroUsuarioForm.controls[controlName].hasError(errorName);
  }
}
