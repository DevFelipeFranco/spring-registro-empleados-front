import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { NotificationType } from 'src/app/core/enum/notification-type.enum';
import { NotificationService } from 'src/app/shared/notification/services/notification.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private readonly authService: AuthService,
              private readonly notificationService: NotificationService,
              private readonly router: Router) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  iniciarFormulario(): void {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required],
    });
  }

  login(): void {
    console.log(this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe(data => {
      this.router.navigateByUrl('/dashboard');
    }, error => {
      this.notificationService.notify(NotificationType.ERROR, error.error.message.toUpperCase());
      console.log(error);
      throwError(error);
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }
}
