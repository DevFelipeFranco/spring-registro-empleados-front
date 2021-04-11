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
      usuario: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(60)])],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
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

  impedirIngresoCaracteresEspeciales(event): boolean {
     let k: any;
     k = event.charCode;  //         k = event.keyCode;  (Both can be used)
     return((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32 || (k >= 48 && k <= 57));
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.registroUsuarioForm.controls[controlName].hasError(errorName);
  }
}
